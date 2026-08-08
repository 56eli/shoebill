# docs — GitHub Pages

This folder is deployed via **GitHub Pages → Source: `main` / `docs`**.

## what lives here — pure mosaic, no chrome

- `index.html` — **pure mosaic wall**: no header/footer, just `div.grid` infinite scroll, hover pop (`scale 1.02` + shadow), click → lightbox full. Purely pictures.
- `style.css` — mosaic grid: `gap: 2px`, `grid-auto-flow: dense`, span variants for rhythm, fills viewport.
- `script.js` — loads `manifest.json` (lists `funny/` + `placeholder/`) and renders cards lazily; click or Enter to open lightbox (ESC to close).
- `funny/` — **promoted funny** shoebills (shown)
- `placeholder/` — **funny enough for now** (also shown) — staged before discard/promote
- `manifest.json` — list of all wall images (`funny/*` then `placeholder/*` sorted) — keep in sync!
- `.nojekyll` — disables Jekyll

`unfunny/` lives at **repo root** (outside `docs`) so it is never deployed/shown. Folders themselves are repo-only — the website shows only pictures as a mosaic, not folder UI.

## wall rules (updated)

- **Shown:** `docs/funny/` + `docs/placeholder/` → one infinite mosaic.
- **Not shown:** `unfunny/` (root) — archived, not deployed.
- User confirmed initial 10 in `funny/` are funny. Agents generate new batches into `docs/placeholder/` (also shown).

## local preview

```bash
python -m http.server 8000 --directory docs
# open http://localhost:8000 — you should see only a gap-2px mosaic, no chrome
```

Ensure `0.0.0.0` bind for Arena preview proxy.

## adding images

1. Drop `shoebill-*.jpg` into `docs/funny/` (promoted) or `docs/placeholder/` (staging) — both appear.
2. Run `node scripts/sync-manifest.js` (reads both folders, sorted, writes manifest).
3. Also mirror to root alias if you use it: `cp docs/funny/*.jpg funny/; cp docs/placeholder/*.jpg placeholder/`
4. Push to `main` via PR — Pages redeploys in ~1 min.

No need to edit `index.html` when adding — just update manifest.

## Pages setup (one-time manual)

Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `docs` → Save

## image guidance

- ~1024×1024 JPGs preferred (grid auto-rows ~220-300px, `object-fit: cover`; lightbox preserves aspect)
- Kebab-case names: `shoebill-dj-rave-laser.jpg`
- After every `ask_user` answer, agents also generate **10 more funny shoebill images** into `docs/placeholder/` (per updated user instruction).
