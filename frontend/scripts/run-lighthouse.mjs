import { preview } from 'vite';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const routes = [
  { name: 'Home (/)', path: '/' },
  { name: 'About (/about)', path: '/about' },
  { name: 'Facilities (/facilities)', path: '/facilities' },
  { name: 'Gallery (/gallery)', path: '/gallery' },
  { name: 'Contact (/contact)', path: '/contact' }
];

async function main() {
  const rootDir = path.resolve('frontend');
  console.log('Starting Vite preview server on port 4173...');
  const server = await preview({
    root: rootDir,
    preview: {
      port: 4173,
      host: 'localhost'
    }
  });

  const urlBase = 'http://localhost:4173';
  const outDir = path.resolve('frontend/.lighthouse-reports');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = [];

  for (const route of routes) {
    const targetUrl = `${urlBase}${route.path}`;
    const reportPath = path.join(outDir, `${route.name.replace(/[^a-z0-9]/gi, '_')}.json`);
    console.log(`\nAuditing ${route.name} at ${targetUrl}...`);

    const cmd = `npx lighthouse "${targetUrl}" --output=json --output-path="${reportPath}" --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --chrome-flags="--headless=new --no-sandbox --disable-gpu" --quiet`;

    try {
      execSync(cmd, { stdio: 'inherit', env: { ...process.env, CHROME_PATH: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' } });
      const raw = fs.readFileSync(reportPath, 'utf-8');
      const data = JSON.parse(raw);

      const perf = Math.round((data.categories.performance?.score || 0) * 100);
      const a11y = Math.round((data.categories.accessibility?.score || 0) * 100);
      const bp = Math.round((data.categories['best-practices']?.score || 0) * 100);
      const seo = Math.round((data.categories.seo?.score || 0) * 100);

      const lcp = data.audits['largest-contentful-paint']?.displayValue || `${((data.audits['largest-contentful-paint']?.numericValue || 0) / 1000).toFixed(2)} s`;
      const cls = (data.audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3);
      const tbt = data.audits['total-blocking-time']?.displayValue || `${Math.round(data.audits['total-blocking-time']?.numericValue || 0)} ms`;

      results.push({
        route: route.name,
        perf,
        a11y,
        bp,
        seo,
        lcp,
        cls,
        tbt,
        rawAudits: data.audits
      });
    } catch (err) {
      console.error(`Error auditing ${route.name}:`, err.message);
    }
  }

  server.httpServer.close();
  console.log('\nPreview server closed.');

  console.log('\n========================================================================================');
  console.log('LIGHTHOUSE MOBILE AUDIT SUMMARY:');
  console.log('========================================================================================');
  console.log('Route                  | Perf | A11y | BestPr |  SEO |   LCP   |  CLS  |   TBT');
  console.log('----------------------------------------------------------------------------------------');
  for (const r of results) {
    console.log(
      `${r.route.padEnd(22)} | ${String(r.perf).padStart(4)} | ${String(r.a11y).padStart(4)} | ${String(r.bp).padStart(6)} | ${String(r.seo).padStart(4)} | ${r.lcp.padStart(7)} | ${String(r.cls).padStart(5)} | ${r.tbt.padStart(7)}`
    );
  }
  console.log('========================================================================================\n');

  // Check targets
  for (const r of results) {
    const issues = [];
    if (r.perf < 90) issues.push(`Performance: ${r.perf} < 90`);
    if (r.a11y < 95) issues.push(`Accessibility: ${r.a11y} < 95`);
    if (r.bp < 95) issues.push(`Best Practices: ${r.bp} < 95`);
    if (r.seo < 95) issues.push(`SEO: ${r.seo} < 95`);
    if (parseFloat(r.cls) > 0.1) issues.push(`CLS: ${r.cls} > 0.1`);

    if (issues.length > 0) {
      console.log(`\nIssues on ${r.route}:`, issues.join(', '));
      // Top 3 failed audits
      const failed = Object.entries(r.rawAudits)
        .filter(([, a]) => a.score !== null && a.score < 1 && a.title)
        .sort((a, b) => (a[1].score || 0) - (b[1].score || 0))
        .slice(0, 5);
      console.log('Top audit misses:');
      for (const [key, a] of failed) {
        console.log(` - [${key}] ${a.title} (score: ${a.score}, displayValue: ${a.displayValue || 'N/A'})`);
      }
    }
  }
}

main().catch(console.error);

