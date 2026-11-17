import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const distServerDir = path.resolve(rootDir, 'dist-server');
const publicDir = path.resolve(rootDir, 'public');

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function ensureOgImage() {
    const heroPath = path.resolve(rootDir, 'assets-original/bigb_warehouse.png');
    const logoPath = path.resolve(rootDir, 'assets-original/logo_light.png');
    const outputDist = path.resolve(distDir, 'og-image.jpg');

    await fs.mkdir(distDir, { recursive: true });

    let needsGeneration = false;
    try {
        await fs.access(outputDist);
    } catch {
        needsGeneration = true;
    }

    if (needsGeneration) {
        const outputPublic = path.resolve(publicDir, 'og-image.jpg');
        try {
            await fs.access(outputPublic);
            await fs.copyFile(outputPublic, outputDist);
        } catch {
            console.log('Generating og-image.jpg at 1200x630...');
            const heroBuffer = await sharp(heroPath)
                .resize(1200, 630, { fit: 'cover', position: 'center' })
                .toBuffer();

            const overlaySvg = Buffer.from(`
                <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
                    <rect width="1200" height="630" fill="#071526" fill-opacity="0.65" />
                </svg>
            `);

            const logoBuffer = await sharp(logoPath)
                .resize(460, null, { fit: 'inside' })
                .toBuffer();

            const logoMeta = await sharp(logoBuffer).metadata();
            const logoLeft = Math.round((1200 - logoMeta.width) / 2);
            const logoTop = Math.round((630 - logoMeta.height) / 2);

            await sharp(heroBuffer)
                .composite([
                    { input: overlaySvg, top: 0, left: 0 },
                    { input: logoBuffer, top: logoTop, left: logoLeft }
                ])
                .jpeg({ quality: 85, progressive: true })
                .toFile(outputDist);
        }
    }
}

async function prerender() {
    console.log('Starting pre-rendering build process...');

    // 1. SITE_URL validation & configuration
    let siteUrl = process.env.SITE_URL;
    if (!siteUrl) {
        if (process.env.CF_PAGES || process.env.CI || process.env.VERCEL) {
            throw new Error('SITE_URL environment variable is required in production/CI deployments (CF_PAGES, CI, VERCEL).');
        }
        siteUrl = 'https://bigbwarehouse.in';
    }

    if (!siteUrl.startsWith('https://')) {
        throw new Error(`SITE_URL must start with https://, received: "${siteUrl}"`);
    }

    siteUrl = siteUrl.replace(/\/+$/, '');
    const ogImageUrl = `${siteUrl}/og-image.jpg`;

    await ensureOgImage();

    // 2. Load template from dist/index.html
    const templatePath = path.resolve(distDir, 'index.html');
    let templateHtml;
    try {
        templateHtml = await fs.readFile(templatePath, 'utf-8');
    } catch (err) {
        throw new Error(`Cannot find dist/index.html. Run "vite build" first. Details: ${err.message}`);
    }

    // Clean placeholder tags from template
    const cleanedTemplate = templateHtml
        .replace(/<title>[\s\S]*?<\/title>/gi, '')
        .replace(/<meta\s+name="description"[\s\S]*?>/gi, '')
        .replace(/<meta\s+name="robots"[\s\S]*?>/gi, '')
        .replace(/<link\s+rel="canonical"[\s\S]*?>/gi, '')
        .replace(/<meta\s+property="og:[^"]*"[\s\S]*?>/gi, '')
        .replace(/<meta\s+name="twitter:[^"]*"[\s\S]*?>/gi, '')
        .replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');

    // 5. Before the route loop, throw if the template lacks '<div id="root"></div>' or '</head>'
    if (!cleanedTemplate.includes('<div id="root"></div>')) {
        throw new Error('Template HTML lacks required "<div id="root"></div>" anchor element.');
    }
    if (!cleanedTemplate.includes('</head>')) {
        throw new Error('Template HTML lacks required "</head>" closing tag.');
    }

    // 2. Find built SSR artifact in dist-server
    let serverFiles;
    try {
        serverFiles = await fs.readdir(distServerDir);
    } catch (err) {
        throw new Error(`Cannot read dist-server directory at ${distServerDir}. Ensure "vite build --ssr src/entry-server.jsx --outDir dist-server" ran first. Error: ${err.message}`);
    }

    const entryServerFileName = serverFiles.find(f => f.startsWith('entry-server') && (f.endsWith('.js') || f.endsWith('.mjs')));
    if (!entryServerFileName) {
        throw new Error(`Could not find an entry-server (.js or .mjs) build artifact in ${distServerDir}`);
    }

    const entryServerPath = path.resolve(distServerDir, entryServerFileName);
    const entryServerUrl = pathToFileURL(entryServerPath).href;
    const { render, seoData, companyData } = await import(entryServerUrl);

    // JSON-LD structured data with escape of '<'
    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': companyData.name,
        'url': siteUrl,
        'telephone': companyData.phone,
        'email': companyData.email,
        'image': ogImageUrl,
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Ezhippuram, ESI Back Road',
            'addressLocality': 'Parippally, Kollam',
            'addressRegion': 'Kerala',
            'postalCode': '691574',
            'addressCountry': 'IN'
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 8.804608,
            'longitude': 76.747598
        },
        'openingHoursSpecification': [
            {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ],
                'opens': '08:00',
                'closes': '20:00'
            }
        ]
    };

    // 4. For JSON-LD: JSON.stringify, then replace every '<' with '\u003c'
    const jsonLdSafe = JSON.stringify(localBusinessSchema).replace(/</g, () => '\\u003c');
    const jsonLdScript = `<script type="application/ld+json">${jsonLdSafe}</script>`;

    const routes = [
        { url: '/', outPath: 'index.html', key: '/' },
        { url: '/about', outPath: 'about/index.html', key: '/about' },
        { url: '/facilities', outPath: 'facilities/index.html', key: '/facilities' },
        { url: '/gallery', outPath: 'gallery/index.html', key: '/gallery' },
        { url: '/contact', outPath: 'contact/index.html', key: '/contact' },
        { url: '/location', outPath: 'location/index.html', key: '/location' },
        { url: '/404', outPath: '404.html', key: '404' }
    ];

    for (const route of routes) {
        const pageUrl = `${siteUrl}${route.url === '/' ? '' : route.url}`;
        const { html: renderedHtml } = render(route.url);

        // Separate any hoisted head elements from the main DOM tree
        const rootIndex = renderedHtml.search(/<(div|nav|header|main)[\s>]/i);
        const bodyHtml = rootIndex >= 0 ? renderedHtml.slice(rootIndex) : renderedHtml;

        let headTags;

        // 6. For the 404 route ignore seoData: title 'Page not found | BIGB Warehouse Park', noindex, no canonical, no sitemap entry
        if (route.url === '/404') {
            const notFoundTitle = 'Page not found | BIGB Warehouse Park';
            const notFoundDesc = 'The requested page could not be found. Return to our homepage or contact our logistics facility team in Parippally, Kerala.';
            headTags = [
                `<title>${escapeHtml(notFoundTitle)}</title>`,
                `<meta name="description" content="${escapeHtml(notFoundDesc)}" />`,
                `<meta name="robots" content="noindex" />`,
                `<meta property="og:title" content="${escapeHtml(notFoundTitle)}" />`,
                `<meta property="og:description" content="${escapeHtml(notFoundDesc)}" />`,
                `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
                `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />`,
                `<meta property="og:type" content="website" />`,
                `<meta name="twitter:card" content="summary_large_image" />`,
                `<meta name="twitter:title" content="${escapeHtml(notFoundTitle)}" />`,
                `<meta name="twitter:description" content="${escapeHtml(notFoundDesc)}" />`,
                `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />`,
                jsonLdScript
            ].filter(Boolean).join('\n    ');
        } else {
            const seo = seoData[route.key] || seoData['/'];
            const canonicalPath = seo.canonical || (seo.path || route.url);
            const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '' : canonicalPath}`;

            headTags = [
                `<title>${escapeHtml(seo.title)}</title>`,
                `<meta name="description" content="${escapeHtml(seo.description)}" />`,
                `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
                seo.noindex ? `<meta name="robots" content="noindex" />` : '',
                `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
                `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
                `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
                `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />`,
                `<meta property="og:type" content="website" />`,
                `<meta name="twitter:card" content="summary_large_image" />`,
                `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
                `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
                `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />`,
                jsonLdScript
            ].filter(Boolean).join('\n    ');
        }

        // 3. Use function replacers for every String.replace that inserts HTML
        const finalHtml = cleanedTemplate
            .replace('</head>', () => `    ${headTags}\n  </head>`)
            .replace('<div id="root"></div>', () => `<div id="root">${bodyHtml}</div>`);

        const destFile = path.resolve(distDir, route.outPath);
        await fs.mkdir(path.dirname(destFile), { recursive: true });
        await fs.writeFile(destFile, finalHtml, 'utf-8');
        console.log(`✔ Pre-rendered ${route.url} -> dist/${route.outPath}`);
    }

    // 8. Write robots.txt to dist only, not public/
    const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
    await fs.writeFile(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf-8');
    console.log('✔ Generated dist/robots.txt');

    // 7. Sitemap: include only entries with a string path, no noindex, and no canonical or canonical equal to its own path. Add <lastmod> with the build date (YYYY-MM-DD). Never print 'undefined'.
    const buildDate = new Date().toISOString().split('T')[0];

    const sitemapEntries = Object.values(seoData)
        .filter(item => {
            if (!item || typeof item.path !== 'string') return false;
            if (item.noindex) return false;
            if (item.canonical && item.canonical !== item.path) return false;
            return true;
        })
        .map(item => {
            const priority = item.path === '/' ? '1.0' : (item.path === '/facilities' ? '0.9' : '0.8');
            const changefreq = item.path === '/' ? 'weekly' : 'monthly';
            const loc = escapeHtml(`${siteUrl}${item.path === '/' ? '/' : item.path}`);
            return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${buildDate}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        })
        .join('\n');

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;

    if (sitemapXml.includes('undefined')) {
        throw new Error('Generated sitemap.xml contains forbidden string "undefined"!');
    }

    // 8. Write sitemap.xml to dist only, not public/
    await fs.writeFile(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
    console.log('✔ Generated dist/sitemap.xml');

    // 2. Delete dist-server at the end of the script
    try {
        await fs.rm(distServerDir, { recursive: true, force: true });
        console.log('✔ Cleaned up dist-server temporary directory');
    } catch (err) {
        console.warn('Could not clean up dist-server directory:', err.message);
    }

    // 2. After writing all HTML, read every output file and throw if any contains '/src/'
    for (const route of routes) {
        const destFile = path.resolve(distDir, route.outPath);
        const content = await fs.readFile(destFile, 'utf-8');
        if (content.includes('/src/')) {
            throw new Error(`Pre-rendered HTML file "${route.outPath}" contains forbidden "/src/" path!`);
        }
    }
    console.log('✔ Verified all output HTML files contain zero "/src/" references.');
    console.log('✔ Pre-rendering completed successfully!');
}

prerender().catch(err => {
    console.error('Pre-rendering failed:', err);
    process.exit(1);
});
