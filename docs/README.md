# docs — GitHub Pages

This folder is deployed via **GitHub Pages → Source: `main` / `docs`**.

## what lives here

- `index.html` — wall of shoebills (grid + lightbox)
- `style.css` — hover pop (`transform: translateY(-6px) scale(1.025)` + shadow)
- `script.js` — loads `manifest.json` and renders grid; click → full
- `funny/` — the **only** image folder shown on the site (exclusively funny shoebills)
- `manifest.json` — list of images shown on wall (keep in sync!)
- `.nojekyll` — disables Jekyll so `funny/` is served as-is

`unfunny/` and `placeholder/` live at **repo root** (outside `docs`) so `docs/` stays exclusively funny.

## local preview

```bash
# from repo root
python -m http.server 8000 --directory docs
# open http://localhost:8000
```

or

```bash
npx serve docs
```

Ensure your dev server binds to `0.0.0.0` and allows the preview host if testing in Arena sandbox.

## adding images

1. Drop `shoebill-*.jpg` into `docs/funny/`
2. Run `node scripts/sync-manifest.js` or edit `docs/manifest.json` manually
3. Push to `main` (via PR) — Pages redeploys automatically in ~1 min

## Pages setup (one-time manual)

If the site 404s: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `docs` → Save**
No workflow file needed — Pages handles it natively.

## image guidance

- Prefer ~1024×1024 JPGs (wall crops to square, lightbox preserves aspect)
- Kebab-case names, human-readable
- No need to edit `index.html` when adding — just update the manifest
