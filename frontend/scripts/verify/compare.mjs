import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolvePaths, generateSnapshot } from './snapshot.mjs';

const __filename = fileURLToPath(import.meta.url);

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object' || a === null || b === null) return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a).sort();
  const keysB = Object.keys(b).sort();
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (keysA[i] !== keysB[i]) return false;
    if (!deepEqual(a[keysA[i]], b[keysA[i]])) return false;
  }
  return true;
}

function formatDiff(expected, actual) {
  return `\n  - Baseline: ${JSON.stringify(expected, null, 2).split('\n').join('\n  - ')}\n  + Current:  ${JSON.stringify(actual, null, 2).split('\n').join('\n  + ')}`;
}

export function runComparison(baselineFile) {
  const { distDir, refactorDir } = resolvePaths();
  const baselinePath = baselineFile || path.join(refactorDir, 'baseline.json');

  if (!fs.existsSync(baselinePath)) {
    console.error(`[compare] ERROR: Baseline file not found at ${baselinePath}`);
    console.error('Run "node scripts/verify/snapshot.mjs" first to create the baseline.');
    process.exit(1);
  }

  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  const current = generateSnapshot(distDir);

  const errors = [];

  // 1. Compare pages present
  const baselinePages = Object.keys(baseline.pages).sort();
  const currentPages = Object.keys(current.pages).sort();

  for (const page of baselinePages) {
    if (!current.pages[page]) {
      errors.push(`Page missing in current build: ${page}`);
    }
  }
  for (const page of currentPages) {
    if (!baseline.pages[page]) {
      errors.push(`Unexpected extra page in current build: ${page}`);
    }
  }

  // 2. Compare page contents
  const fields = [
    'title',
    'metaDescription',
    'canonical',
    'ogTwitterTags',
    'jsonLd',
    'images',
    'internalLinks',
    'visibleText'
  ];

  for (const page of baselinePages) {
    if (!current.pages[page]) continue;
    const basePage = baseline.pages[page];
    const currPage = current.pages[page];

    for (const field of fields) {
      if (!deepEqual(basePage[field], currPage[field])) {
        errors.push(
          `Diff in "${page}" [${field}]:${formatDiff(basePage[field], currPage[field])}`
        );
      }
    }
  }

  // 3. Compare bundle gzip sizes
  const baseJsGzip = baseline.bundles.js.gzipBytes;
  const currJsGzip = current.bundles.js.gzipBytes;
  const jsDiffBytes = currJsGzip - baseJsGzip;
  const jsPct = baseJsGzip > 0 ? (jsDiffBytes / baseJsGzip) * 100 : 0;

  const baseCssGzip = baseline.bundles.css.gzipBytes;
  const currCssGzip = current.bundles.css.gzipBytes;
  const cssDiffBytes = currCssGzip - baseCssGzip;
  const cssPct = baseCssGzip > 0 ? (cssDiffBytes / baseCssGzip) * 100 : 0;

  console.log('--------------------------------------------------');
  console.log('REFACTOR VERIFICATION COMPARISON REPORT');
  console.log('--------------------------------------------------');
  console.log(`Pages checked: ${baselinePages.length}`);
  console.log(
    `JS bundle gzip:  ${(currJsGzip / 1024).toFixed(2)} kB (baseline: ${(baseJsGzip / 1024).toFixed(2)} kB, diff: ${jsPct >= 0 ? '+' : ''}${jsPct.toFixed(2)}%)`
  );
  console.log(
    `CSS bundle gzip: ${(currCssGzip / 1024).toFixed(2)} kB (baseline: ${(baseCssGzip / 1024).toFixed(2)} kB, diff: ${cssPct >= 0 ? '+' : ''}${cssPct.toFixed(2)}%)`
  );

  // JS growth threshold: max 3%
  if (jsPct > 3.0) {
    errors.push(
      `JS gzip size grew by ${jsPct.toFixed(2)}%, exceeding the allowed 3.0% threshold.`
    );
  }

  if (errors.length > 0) {
    console.error('--------------------------------------------------');
    console.error(`VERIFICATION FAILED with ${errors.length} issue(s):`);
    console.error('--------------------------------------------------');
    for (const err of errors) {
      console.error(`\n[FAIL] ${err}`);
    }
    process.exit(1);
  }

  console.log('--------------------------------------------------');
  console.log('PASSED: Current build matches baseline with 0 differences.');
  console.log('--------------------------------------------------');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runComparison();
}
