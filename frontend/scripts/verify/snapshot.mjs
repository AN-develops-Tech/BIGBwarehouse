import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve frontend root and dist folder
export function resolvePaths() {
  const possibleDistDirs = [
    path.resolve(__dirname, '../../dist'),
    path.resolve(process.cwd(), 'dist'),
    path.resolve(process.cwd(), 'frontend/dist')
  ];

  let distDir = possibleDistDirs.find((d) => fs.existsSync(d) && fs.statSync(d).isDirectory());
  if (!distDir) {
    throw new Error('Could not find dist directory. Did you run npm run build?');
  }

  const frontendRoot = path.resolve(distDir, '..');
  const refactorDir = path.join(frontendRoot, '.refactor');
  return { distDir, frontendRoot, refactorDir };
}

export function normalizeViteAssetHash(assetPath) {
  if (!assetPath) return assetPath;
  // Matches /assets/<name>-<8-char-hash>.<ext>
  return assetPath.replace(/\/assets\/(.+?)-[A-Za-z0-9_-]{8}\.([a-zA-Z0-9]+)/g, '/assets/$1.$2');
}

export function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

export function extractVisibleText(html) {
  // Extract body content if present
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  let content = bodyMatch ? bodyMatch[1] : html;

  // Remove scripts, styles, noscripts, svgs
  content = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ');
  content = content.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  content = content.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ');
  content = content.replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ');
  content = content.replace(/<!--[\s\S]*?-->/g, ' ');

  // Add line breaks for block boundaries
  content = content.replace(/<\/(?:div|p|h[1-6]|li|section|article|header|footer|nav|tr|td|th)>/gi, '\n');
  content = content.replace(/<br\s*\/?>/gi, '\n');

  // Strip all other HTML tags
  content = content.replace(/<[^>]+>/g, ' ');

  // Decode entities
  content = decodeHtmlEntities(content);

  // Normalize whitespace
  return content
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

export function extractMetaTag(html, nameOrProperty) {
  const regex = new RegExp(
    `<meta\\s+[^>]*(?:name|property)=["']${nameOrProperty}["'][^>]*content=["']([^"']*)["']|<meta\\s+[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${nameOrProperty}["']`,
    'i'
  );
  const match = html.match(regex);
  return match ? decodeHtmlEntities(match[1] || match[2] || '') : null;
}

export function extractAllOgTwitter(html) {
  const metaRegex = /<meta\s+[^>]*>/gi;
  const tags = {};
  let match;
  while ((match = metaRegex.exec(html)) !== null) {
    const tag = match[0];
    const keyMatch = tag.match(/(?:name|property)=["']((?:og|twitter):[^"']+)["']/i);
    const valMatch = tag.match(/content=["']([^"']*)["']/i);
    if (keyMatch && valMatch) {
      const key = keyMatch[1].toLowerCase();
      tags[key] = decodeHtmlEntities(valMatch[1]);
    }
  }
  return Object.keys(tags).sort().reduce((acc, k) => {
    acc[k] = tags[k];
    return acc;
  }, {});
}

export function extractJsonLd(html) {
  const scriptRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const results = [];
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      results.push(parsed);
    } catch {
      results.push(match[1].trim());
    }
  }
  return results;
}

export function extractImages(html) {
  const images = new Set();

  // img src
  const imgSrcRegex = /<img\s+[^>]*src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgSrcRegex.exec(html)) !== null) {
    images.add(normalizeViteAssetHash(match[1]));
  }

  // srcset
  const srcsetRegex = /(?:srcSet|srcset)=["']([^"']+)["']/gi;
  while ((match = srcsetRegex.exec(html)) !== null) {
    const entries = match[1].split(',');
    for (const entry of entries) {
      const parts = entry.trim().split(/\s+/);
      if (parts[0]) {
        images.add(normalizeViteAssetHash(parts[0]));
      }
    }
  }

  // preload images
  const preloadRegex = /<link\s+[^>]*rel=["']preload["'][^>]*as=["']image["'][^>]*href=["']([^"']+)["']/gi;
  while ((match = preloadRegex.exec(html)) !== null) {
    images.add(normalizeViteAssetHash(match[1]));
  }

  return Array.from(images).sort();
}

export function extractInternalLinks(html) {
  const links = new Set();
  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["']/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1].trim();
    if (
      href.startsWith('/') ||
      href.startsWith('./') ||
      href.startsWith('../') ||
      href.startsWith('https://bigbwarehouse.in')
    ) {
      // Normalize url to pathname
      let normalized = href.replace(/^https:\/\/bigbwarehouse\.in/, '');
      if (normalized === '') normalized = '/';
      // Ignore in-page anchors if only anchor
      if (normalized.startsWith('#')) continue;
      links.add(normalized);
    }
  }
  return Array.from(links).sort();
}

export function collectHtmlFiles(dir, baseDir = dir) {
  let files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(collectHtmlFiles(fullPath, baseDir));
    } else if (item.isFile() && item.name.endsWith('.html')) {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      files.push({ relPath, fullPath });
    }
  }
  return files;
}

export function measureAssetBundles(distDir) {
  const assetsDir = path.join(distDir, 'assets');
  const metrics = {
    js: { files: [], rawBytes: 0, gzipBytes: 0 },
    css: { files: [], rawBytes: 0, gzipBytes: 0 }
  };

  if (!fs.existsSync(assetsDir)) return metrics;

  for (const file of fs.readdirSync(assetsDir)) {
    const filePath = path.join(assetsDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    if (file.endsWith('.js')) {
      const buf = fs.readFileSync(filePath);
      const gz = zlib.gzipSync(buf);
      metrics.js.files.push(file);
      metrics.js.rawBytes += stat.size;
      metrics.js.gzipBytes += gz.length;
    } else if (file.endsWith('.css')) {
      const buf = fs.readFileSync(filePath);
      const gz = zlib.gzipSync(buf);
      metrics.css.files.push(file);
      metrics.css.rawBytes += stat.size;
      metrics.css.gzipBytes += gz.length;
    }
  }

  return metrics;
}

export function generateSnapshot(distDir) {
  const htmlFiles = collectHtmlFiles(distDir);
  const pages = {};

  for (const { relPath, fullPath } of htmlFiles) {
    const content = fs.readFileSync(fullPath, 'utf8');

    // Title
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : null;

    // Meta description
    const metaDescription = extractMetaTag(content, 'description');

    // Canonical
    const canonicalMatch = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']|<link\s+[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
    const canonical = canonicalMatch ? (canonicalMatch[1] || canonicalMatch[2] || '').trim() : null;

    // OG & Twitter tags
    const ogTwitterTags = extractAllOgTwitter(content);

    // JSON-LD
    const jsonLd = extractJsonLd(content);

    // Images
    const images = extractImages(content);

    // Internal links
    const internalLinks = extractInternalLinks(content);

    // Visible text
    const visibleText = extractVisibleText(content);

    pages[relPath] = {
      title,
      metaDescription,
      canonical,
      ogTwitterTags,
      jsonLd,
      images,
      internalLinks,
      visibleText
    };
  }

  const bundles = measureAssetBundles(distDir);

  return {
    timestamp: new Date().toISOString(),
    pages,
    bundles
  };
}

export function writeSnapshotToFile(outputPath) {
  const { distDir, refactorDir } = resolvePaths();
  const target = outputPath || path.join(refactorDir, 'baseline.json');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const snapshot = generateSnapshot(distDir);
  fs.writeFileSync(target, JSON.stringify(snapshot, null, 2), 'utf8');
  console.log(`[snapshot] Baseline snapshot written to: ${target}`);
  console.log(`[snapshot] Recorded ${Object.keys(snapshot.pages).length} HTML pages:`);
  for (const page of Object.keys(snapshot.pages)) {
    console.log(`  - ${page}`);
  }
  console.log(`[snapshot] JS bundle gzip: ${(snapshot.bundles.js.gzipBytes / 1024).toFixed(2)} kB`);
  console.log(`[snapshot] CSS bundle gzip: ${(snapshot.bundles.css.gzipBytes / 1024).toFixed(2)} kB`);
  return target;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeSnapshotToFile();
}
