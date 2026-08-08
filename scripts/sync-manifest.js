#!/usr/bin/env node
/**
 * sync-manifest.js
 * Regenerates docs/manifest.json from docs/funny/ + docs/placeholder/
 * - docs/funny/ -> shown (promoted funny)
 * - docs/placeholder/ -> shown (funny enough for now, will be discarded later)
 * - unfunny/ (root, outside docs) -> NOT shown, NOT deployed
 * Usage: node scripts/sync-manifest.js
 * No deps.
 */
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const FUNNY_DIR = path.join(DOCS_DIR, 'funny');
const PLACEHOLDER_DIR = path.join(DOCS_DIR, 'placeholder');
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
  const placeholder = listImages(PLACEHOLDER_DIR, 'placeholder');
  // order: funny first (sorted), then placeholder (sorted) — wall shows both as one mosaic
  const images = [...funny, ...placeholder];
  const manifest = { images };

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Wrote ${images.length} images to ${path.relative(process.cwd(), MANIFEST)}`);
  console.log(` - funny: ${funny.length}`);
  console.log(` - placeholder: ${placeholder.length}`);
  console.log(` - unfunny: (not in manifest, repo root only)`);
  images.forEach(i=> console.log(' -', i));
  if (images.length===0) console.warn('WARNING: no images found — wall will be empty');
}

main();
