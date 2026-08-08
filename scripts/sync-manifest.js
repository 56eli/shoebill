#!/usr/bin/env node
/**
 * sync-manifest.js
 * Regenerates docs/manifest.json from docs/funny/
 * - Images sorted oldest-first by file mtime (ascending), alphabetical tiebreaker
 * - Each entry carries its mtime so the client can also sort oldest-first
 * - Also updates the hard-coded fallback array in docs/script.js so the two never drift
 * - docs/funny/ -> shown as pure mosaic (all funny by default)
 * - unfunny/ (root, outside docs) -> NOT shown, NOT deployed, archived
 * - placeholder/ deleted — all new batches now go to docs/funny/ per user instruction (2026-08-08)
 * Usage: node scripts/sync-manifest.js
 */
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const FUNNY_DIR = path.join(DOCS_DIR, 'funny');
const MANIFEST = path.join(DOCS_DIR, 'manifest.json');
const SCRIPT_JS = path.join(DOCS_DIR, 'script.js');

const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

function listImages(dir, prefix) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => ALLOWED.has(path.extname(f).toLowerCase()))
    .filter(f => !f.startsWith('.') && f !== 'README.md')
    .map(f => ({
      name: f,
      rel: `${prefix}/${f}`,
      abs: path.join(dir, f)
    }));
}

function mtimeMs(absPath) {
  try {
    const stat = fs.statSync(absPath);
    return stat.mtimeMs;
  } catch {
    return Infinity; // unreadable files sort last
  }
}

function writeFallbackInScript(imageSrcs) {
  if (!fs.existsSync(SCRIPT_JS)) {
    console.warn(`WARNING: ${SCRIPT_JS} not found — skipping fallback update`);
    return;
  }

  let js = fs.readFileSync(SCRIPT_JS, 'utf8');

  // Build the new fallback array block
  const lines = imageSrcs.map(src => `    "${src}",`);
  const newBlock = `  return [\n${lines.join('\n')}\n  ];`;

  // Replace existing fallback: find "  return [" ... "  ];"
  const returnStart = js.indexOf('  return [');
  const returnEnd = js.indexOf('  ];', returnStart);

  if (returnStart === -1 || returnEnd === -1) {
    console.warn('WARNING: could not find fallback array in script.js — skipping');
    return;
  }

  js = js.slice(0, returnStart) + newBlock + js.slice(returnEnd + '  ];'.length);
  fs.writeFileSync(SCRIPT_JS, js);
  console.log(`Updated fallback array in ${path.relative(process.cwd(), SCRIPT_JS)} (${imageSrcs.length} images)`);
}

function main() {
  const files = listImages(FUNNY_DIR, 'funny');

  // Sort: oldest mtime first; alphabetical name as tiebreaker when mtimes match
  files.sort((a, b) => {
    const ma = mtimeMs(a.abs);
    const mb = mtimeMs(b.abs);
    if (ma !== mb) return ma - mb; // ascending: oldest first
    return a.name.localeCompare(b.name);
  });

  const images = files.map(f => ({
    src: f.rel,
    mtime: mtimeMs(f.abs)
  }));

  const manifest = { images };
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

  console.log(`Wrote ${images.length} images to ${path.relative(process.cwd(), MANIFEST)}`);
  console.log(`Sort order: oldest mtime first (ascending), alphabetical tiebreaker`);
  console.log(` - funny: ${images.length} (shown)`);
  console.log(` - unfunny: (root only, not in manifest)`);
  console.log(` - placeholder: deleted`);

  // Also sync the hard-coded fallback in script.js so they never drift apart
  writeFallbackInScript(images.map(i => i.src));
}

main();
