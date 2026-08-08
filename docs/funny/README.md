# funny — the wall (part 1)

This folder **is** the website — together with `docs/placeholder/`.

- `docs/funny/` is the promoted funny folder served from `main /docs`.
- Every image here is shown on the wall alongside `docs/placeholder/` — both are listed in `docs/manifest.json` and rendered as one pure mosaic in `docs/index.html` (no chrome, infinite scroll).
- Hover pops a little (`scale 1.02`), click opens full lightbox.

## workflow

- Promoted images live here. User is the sole judge of funny — all 10 initial pics are confirmed funny.
- Agents: after adding/removing images, run `node scripts/sync-manifest.js` (reads `docs/funny/` + `docs/placeholder/`) so wall stays in sync.
- Keep filenames kebab-case: `shoebill-doing-X.jpg`
- Root `funny/` (at repo root) is a mirror/alias — canonical for deployment is **this** folder. Keep synced (`cp docs/funny/*.jpg funny/`).

Wall shows `funny` + `placeholder`; `unfunny/` (repo root, outside `docs`) is never shown. Folders are repo-only, not visible as UI on the site.

See `agent.md` at repo root.
