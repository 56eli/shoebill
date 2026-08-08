# funny — the wall

This folder **is** the website.

- `docs/funny/` is the canonical **funny** folder that GitHub Pages serves from `main /docs`.
- Every image here is shown on the wall (`docs/index.html` → `manifest.json` → grid).
- Hover pops, click opens full.

## workflow

- Promoted images live here. User is the sole judge of funny.
- Agents: after adding/removing images, run `node scripts/sync-manifest.js` (or update `docs/manifest.json` manually) so the wall stays in sync.
- Keep filenames kebab-case, descriptive: `shoebill-doing-X.jpg`
- Root `funny/` (at repo root) is a mirror/alias with a pointer back here — canonical is **this** folder to satisfy Pages.

See `agent.md` at repo root.
