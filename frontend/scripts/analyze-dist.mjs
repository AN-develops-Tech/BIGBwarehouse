import fs from 'fs';
import path from 'path';

function getAllFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, allFiles);
    } else {
      allFiles.push(fullPath);
    }
  }
  return allFiles;
}

const distDir = path.resolve('frontend/dist');
const files = getAllFiles(distDir);

const byExt = {};
let totalSize = 0;
const fileDetails = [];

for (const f of files) {
  const stat = fs.statSync(f);
  const ext = path.extname(f).toLowerCase() || '(no ext)';
  if (!byExt[ext]) {
    byExt[ext] = { count: 0, size: 0 };
  }
  byExt[ext].count++;
  byExt[ext].size += stat.size;
  totalSize += stat.size;
  fileDetails.push({ path: path.relative(distDir, f).replace(/\\/g, '/'), size: stat.size });
}

console.log('=== DIST SIZE BY FILE TYPE ===');
for (const [ext, data] of Object.entries(byExt)) {
  console.log(`${ext.padEnd(10)}: ${(data.size / 1024).toFixed(2).padStart(8)} KB (${data.count} files)`);
}
console.log(`TOTAL     : ${(totalSize / 1024).toFixed(2).padStart(8)} KB (${files.length} files)`);

console.log('\n=== 10 LARGEST FILES IN DIST ===');
fileDetails.sort((a, b) => b.size - a.size);
fileDetails.slice(0, 10).forEach((f, i) => {
  console.log(`${(i + 1 + '.').padEnd(4)} ${(f.size / 1024).toFixed(2).padStart(8)} KB - ${f.path}`);
});

