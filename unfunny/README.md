# unfunny — never on the wall

Images that are **not funny** live here — **never shown** on the pure mosaic wall.

- **NOT shown** on website: mosaic only reads `docs/funny/` via `manifest.json`. This `unfunny/` is at repo root **outside `docs`** so it’s not deployed.
- **NOT deployed** — purely repo archive.
- **Workflow now:** all new images default to `docs/funny/` (shown). User will **manually review later and mark not-funny at will** by moving `docs/funny/xxx.jpg` → `unfunny/xxx.jpg` (or `funny/xxx.jpg` → `unfunny/`) + re-sync + push. Never delete.
- `placeholder/` deleted 2026-08-08 — no longer used.

Folders are repo-only, not UI on site — the wall is only pictures.

See `agent.md`. All current 30 in `docs/funny/` are confirmed funny.
