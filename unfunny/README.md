# unfunny — never on the wall

Images that are **not funny** live here — **never shown** on the pure mosaic wall.

- **NOT shown** on website: `docs/index.html` mosaic only reads `docs/funny/` + `docs/placeholder/` via `manifest.json`. This `unfunny/` is at repo root **outside `docs`** so it’s not deployed to Pages.
- **NOT deployed** — purely repo archive.
- Agents: if the user flags an image as not funny, move it here immediately (`docs/funny/*.jpg` or `docs/placeholder/*.jpg` → `unfunny/`), re-sync manifest, push. Never delete — user may reconsider.
- Keep original filename. Folders are repo-only, not visible as UI on the site — the wall is only pictures.

See `agent.md`. Initial 10 in `docs/funny/` are confirmed funny per user.
