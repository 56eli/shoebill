# funny — the wall (now the only wall)

This folder **is** the website — pure mosaic, only pictures.

- `docs/funny/` is the only image folder served from `main /docs`. Every image here is shown as one infinite mosaic in `docs/index.html` (via `docs/manifest.json`).
- All 30 current images are confirmed funny; all new batches default here.
- Hover pops (`scale 1.02`), click lightbox. No header/footer, just mosaic `gap:2px`.

## workflow (updated 2026-08-08)

- All new images default here — `placeholder/` deleted, do not use.
- If user says an image is not funny, move it to `unfunny/` (repo root, outside `docs`) — it disappears from mosaic after `node scripts/sync-manifest.js`.
- Keep filenames kebab-case: `shoebill-doing-X.jpg`
- Root `funny/` (at repo root) is a mirror alias — canonical is **this** folder. Keep synced (`cp docs/funny/*.jpg funny/`).

`unfunny/` never shown; `placeholder` deleted. Folders are repo-only.

See `agent.md` at repo root.
