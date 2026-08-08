# docs — GitHub Pages

This folder is deployed via **GitHub Pages → Source: `main` / `docs`**.

## what lives here — pure mosaic, no chrome (updated 2026-08-08)

- `index.html` — **pure mosaic wall**: no header/footer, just `div.grid` infinite scroll, hover pop (`scale 1.02` + shadow), click → lightbox full. Purely pictures.
- `style.css` — mosaic grid: `gap: 2px`, `grid-auto-flow: dense`, span variants for rhythm, fills viewport.
- `script.js` — loads `manifest.json` (lists `funny/` only) and renders cards lazily; click or Enter to open lightbox (ESC to close).
- `funny/` — **all funny shoebills (default)** — **shown** as one infinite mosaic. All images are confirmed funny; new batches go here by default.
- `manifest.json` — list of all wall images (`funny/*` sorted **oldest-first by file mtime**, alphabetical tiebreaker) — keep in sync! (`node scripts/sync-manifest.js`)
- `.nojekyll` — disables Jekyll

`unfunny/` lives at **repo root** (outside `docs`) so it is never deployed/shown. `placeholder/` was **deleted 2026-08-08** — all future images default to `funny/`; user will manually move not-funny to `unfunny/` at will. Folders are repo-only — site shows only pictures.

## wall rules (current)

- **Shown:** `docs/funny/` → pure mosaic (default, all new batches).
- **Not shown:** `unfunny/` (root) — archived, never deployed. Move here to hide: `docs/funny/xxx.jpg` → `unfunny/xxx.jpg` + re-sync.
- `placeholder/` deleted — no longer used.

## local preview

```bash
python -m http.server 8000 --directory docs
# open http://localhost:8000 — pure gap-2px mosaic, no chrome
```

Ensure `0.0.0.0` bind for Arena preview proxy.

## image sort order — oldest first (updated 2026-08-08)

Images on the wall are now sorted **oldest-first by file modification time (mtime)**. This means:

- The oldest images appear first in the mosaic grid.
- Newly added images appear at the **end** of the grid (newest).
- When two files have the same mtime (e.g. batch-uploaded together), they fall back to **alphabetical order** by filename as a stable tiebreaker.

This is implemented in two places:

1. **`scripts/sync-manifest.js`** — reads each file's `mtimeMs` via `fs.statSync`, sorts ascending (oldest first), writes `{src, mtime}` objects into `manifest.json`.
2. **`docs/script.js`** — on load, reads `manifest.json`; if entries carry an `mtime` field, sorts the list oldest-first client-side before rendering. The hard-coded fallback array is also kept in mtime-sorted order.

To regenerate the manifest after adding/removing images:

```bash
node scripts/sync-manifest.js
# also mirror to root alias:
bash scripts/sync-funny.sh
```

## adding images (now: default to funny)

1. Drop `shoebill-*.jpg` into `docs/funny/` (all shown).
2. Run `node scripts/sync-manifest.js` — re-sorts all images oldest-first by mtime and writes `manifest.json`.
3. Also mirror to root alias: `bash scripts/sync-funny.sh`
4. Push to `main` via PR — Pages redeploys in ~1 min.

No need to edit `index.html` when adding — just update manifest.

## Pages setup (one-time manual)

Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `docs` → Save

## image guidance

- ~1024×1024 JPGs preferred (grid auto-rows 220-300px, `object-fit: cover`; lightbox preserves aspect)
- Kebab-case names: `shoebill-firefighter-hero.jpg`
- After every `ask_user` answer, agents also generate **10 more funny shoebill images** into `docs/funny/` (updated default).

## current image count

- **90 images** total in `docs/funny/` (80 original + 10 new batch added 2026-08-08).
- New batch: `shoebill-chess-grandmaster`, `shoebill-bullfighter-cape`, `shoebill-sheriff-badge`, `shoebill-ultimate-frisbee`, `shoebill-lighthouse-keeper`, `shoebill-maya-temple`, `shoebill-astronomy-telescope`, `shoebill-windsurfer`, `shoebill-motorcycle-helmet`, `shoebill-circus-ape`.
