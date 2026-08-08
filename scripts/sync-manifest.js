#!/usr/bin/env node
/**
 * sync-manifest.js
 * Regenerates docs/manifest.json from docs/funny/
 * - Images are sorted by filename for deterministic, checkout-stable ordering
 * - Writes a compact JSON array of relative paths
 * - Updates the hard-coded fallback array in docs/script.js between marker comments
 * - docs/funny/ -> shown as pure mosaic (all funny by default)
 * - unfunny/ (root, outside docs) -> NOT shown, NOT deployed, archived
 * - placeholder/ deleted — all new images now go to docs/funny/ per user instruction (2026-08-08)
 * Usage: node scripts/sync-manifest.js
 */
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const FUNNY_DIR = path.join(DOCS_DIR, 'funny');
const MANIFEST = path.join(DOCS_DIR, 'manifest.json');
const SCRIPT_JS = path.join(DOCS_DIR, 'script.js');

const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
const FALLBACK_START = '  // FALLBACK_IMAGES_START';
const FALLBACK_END = '  // FALLBACK_IMAGES_END';

function listImages(dir, prefix) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => ALLOWED.has(path.extname(f).toLowerCase()))
    .filter(f => !f.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, 'en'))
    .map(f => `${prefix}/${f}`);
}

function writeFallbackInScript(imageSrcs) {
  if (!fs.existsSync(SCRIPT_JS)) {
    console.warn(`WARNING: ${SCRIPT_JS} not found — skipping fallback update`);
    return;
  }

  const js = fs.readFileSync(SCRIPT_JS, 'utf8');
  const start = js.indexOf(FALLBACK_START);
  const end = js.indexOf(FALLBACK_END);

  if (start === -1 || end === -1 || end < start) {
    console.warn(`WARNING: could not find fallback markers in script.js — skipping`);
    return;
  }

  const lines = imageSrcs.map(src => `    ${JSON.stringify(src)},`).join('\n');
  const nextBlock = `${FALLBACK_START}\n${lines}\n${FALLBACK_END}`;
  const next = `${js.slice(0, start)}${nextBlock}${js.slice(end + FALLBACK_END.length)}`;

  fs.writeFileSync(SCRIPT_JS, next);
  console.log(`Updated fallback array in ${path.relative(process.cwd(), SCRIPT_JS)} (${imageSrcs.length} images)`);
}

function main() {
  const images = listImages(FUNNY_DIR, 'funny');

  fs.writeFileSync(MANIFEST, JSON.stringify(images, null, 2) + '\n');

  console.log(`Wrote ${images.length} images to ${path.relative(process.cwd(), MANIFEST)}`);
  console.log(`Sort order: filename ascending (stable across checkouts)`);
  console.log(` - funny: ${images.length} (shown)`);
  console.log(` - unfunny: (root only, not in manifest)`);
  console.log(` - placeholder: deleted`);

  writeFallbackInScript(images);
}

main();
