import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

async function generateOgImage() {
    const rootDir = process.cwd();
    const heroPath = path.resolve(rootDir, 'assets-original/bigb_warehouse.png');
    const logoPath = path.resolve(rootDir, 'assets-original/logo_light.png');
    const outputPath = path.resolve(rootDir, 'public/og-image.jpg');

    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // 1. Resize and crop hero image to 1200x630
    const heroBuffer = await sharp(heroPath)
        .resize(1200, 630, { fit: 'cover', position: 'center' })
        .toBuffer();

    // 2. Prepare semi-transparent brand dark overlay
    const overlaySvg = Buffer.from(`
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="630" fill="#071526" fill-opacity="0.65" />
        </svg>
    `);

    // 3. Prepare resized logo (max width ~460px, maintaining aspect ratio)
    const logoBuffer = await sharp(logoPath)
        .resize(460, null, { fit: 'inside' })
        .toBuffer();

    const logoMeta = await sharp(logoBuffer).metadata();
    const logoLeft = Math.round((1200 - logoMeta.width) / 2);
    const logoTop = Math.round((630 - logoMeta.height) / 2);

    // 4. Composite hero + overlay + centered logo -> JPEG
    await sharp(heroBuffer)
        .composite([
            { input: overlaySvg, top: 0, left: 0 },
            { input: logoBuffer, top: logoTop, left: logoLeft }
        ])
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath);

    const stats = await fs.stat(outputPath);
    console.log(`Generated og-image.jpg: ${(stats.size / 1024).toFixed(1)} KB (budget: <= 300 KB)`);
}

generateOgImage().catch(err => {
    console.error('Failed to generate OG image:', err);
    process.exit(1);
});

