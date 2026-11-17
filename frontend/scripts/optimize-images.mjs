import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine frontend directory whether run from repo root or frontend/
const frontendDir = fs.existsSync(path.join(__dirname, '..', 'assets-original'))
  ? path.join(__dirname, '..')
  : path.join(process.cwd(), 'frontend');

const inputDir = path.join(frontendDir, 'assets-original');
const outputDir = path.join(frontendDir, 'src', 'assets', 'images');

if (!fs.existsSync(inputDir)) {
  console.error(`Input directory does not exist: ${inputDir}`);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Active assets to optimize into src/assets/images
const ACTIVE_IMAGES = [
  'bigb_warehouse.png',
  'footer_map_bg.jpg',
  'hydra_crane.png',
  'interior.png',
  'labor_ops.png',
  'loading_docks.png',
  'parking_yard.png',
  'weighbridge.png'
];

const LOGO_IMAGES = [
  'logo_dark.png',
  'logo_light.png'
];

const WIDTHS = [640, 1024, 1600];
const QUALITY = 76;

async function optimize() {
  console.log('--- Starting Image Optimization (WebP, q=76) ---');
  const results = [];

  // 1. Process Logos: keep transparency, resize to at most 2x display height (64px * 2 = 128px)
  for (const file of LOGO_IMAGES) {
    const inputPath = path.join(inputDir, file);
    if (!fs.existsSync(inputPath)) continue;

    const baseName = path.parse(file).name;
    const outputPath = path.join(outputDir, `${baseName}.webp`);
    const origStat = fs.statSync(inputPath);

    await sharp(inputPath)
      .resize({ height: 128, withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 100, effort: 6 })
      .toFile(outputPath);

    const newStat = fs.statSync(outputPath);
    results.push({
      file: `${baseName}.webp`,
      origSize: origStat.size,
      newSize: newStat.size,
      width: 'max 128h'
    });
    console.log(`[Logo] ${file} -> ${baseName}.webp: ${(origStat.size / 1024).toFixed(1)} KB -> ${(newStat.size / 1024).toFixed(1)} KB`);
  }

  // 2. Process General Rasters (640, 1024, 1600 without upscaling)
  for (const file of ACTIVE_IMAGES) {
    const inputPath = path.join(inputDir, file);
    if (!fs.existsSync(inputPath)) continue;

    const baseName = path.parse(file).name;
    const origStat = fs.statSync(inputPath);

    for (const w of WIDTHS) {
      const outName = `${baseName}-${w}.webp`;
      const outputPath = path.join(outputDir, outName);

      // Never upscale: if target width > original, cap at original width without enlargement
      await sharp(inputPath)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(outputPath);

      const newStat = fs.statSync(outputPath);
      results.push({
        file: outName,
        origSize: origStat.size,
        newSize: newStat.size,
        width: `${w}w`
      });
      console.log(`[Raster] ${file} (${w}w) -> ${outName}: ${(origStat.size / 1024).toFixed(1)} KB -> ${(newStat.size / 1024).toFixed(1)} KB`);
    }

    // Also output base file for backward compatibility (defaults to 1024w)
    const defaultOut = path.join(outputDir, `${baseName}.webp`);
    await sharp(inputPath)
      .resize({ width: 1024, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(defaultOut);
  }

  console.log('--- Optimization Complete ---');
  return results;
}

optimize().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});
