#!/usr/bin/env node
/**
 * sync-manifest.js
 * Regenerates docs/manifest.json from docs/funny/
 * - docs/funny/ -> shown as pure mosaic (all funny by default)
 * - unfunny/ (root, outside docs) -> NOT shown, NOT deployed, archived
 * - placeholder/ deleted — all new batches now go directly to docs/funny/ per user instruction (2026-08-08)
 * Usage: node scripts/sync-manifest.js
 */
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const FUNNY_DIR = path.join(DOCS_DIR, 'funny');
const MANIFEST = path.join(DOCS_DIR, 'manifest.json');

const ALLOWED = new Set(['.jpg','.jpeg','.png','.webp','.gif','.avif']);

function listImages(dir, prefix){
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => ALLOWED.has(path.extname(f).toLowerCase()))
    .filter(f => !f.startsWith('.') && f !== 'README.md')
    .sort((a,b)=> a.localeCompare(b))
    .map(f => `${prefix}/${f}`);
}

function main(){
  const funny = listImages(FUNNY_DIR, 'funny');
  const images = [...funny];
  const manifest = { images };
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Wrote ${images.length} images to ${path.relative(process.cwd(), MANIFEST)}`);
  console.log(` - funny: ${funny.length} (shown)`);
  console.log(` - unfunny: (root only, not in manifest)`);
  console.log(` - placeholder: deleted`);
  images.forEach(i=> console.log(' -', i));
  if (images.length===0) console.warn('WARNING: no images — wall empty');
}

main();
