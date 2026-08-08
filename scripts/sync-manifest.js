#!/usr/bin/env node
/**
 * sync-manifest.js
 * Regenerates docs/manifest.json from the actual files in docs/funny/
 * Usage: node scripts/sync-manifest.js
 * No deps — uses fs + path only.
 */
const fs = require('fs');
const path = require('path');

const FUNNY_DIR = path.join(__dirname, '..', 'docs', 'funny');
const MANIFEST = path.join(__dirname, '..', 'docs', 'manifest.json');

const ALLOWED = new Set(['.jpg','.jpeg','.png','.webp','.gif','.avif']);

function main(){
  if (!fs.existsSync(FUNNY_DIR)){
    console.error(`Missing ${FUNNY_DIR}`);
    process.exit(1);
  }
  const files = fs.readdirSync(FUNNY_DIR)
    .filter(f => ALLOWED.has(path.extname(f).toLowerCase()))
    .filter(f => !f.startsWith('.') && f !== 'README.md')
    .sort((a,b)=> a.localeCompare(b));

  const images = files.map(f => `funny/${f}`);
  const manifest = { images };

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Wrote ${images.length} images to ${path.relative(process.cwd(), MANIFEST)}`);
  images.forEach(i=> console.log(' -', i));
}

main();
