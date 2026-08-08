# funny (root alias) — the wall

> Canonical location is `docs/funny/` — that is what Pages serves from `main /docs` (pure mosaic, only pictures).

This folder mirrors `docs/funny/` and **is shown** as the wall mosaic. It exists for the spec’s top-level `funny/` requirement. `placeholder/` deleted 2026-08-08 — all new images default to `funny/`; `unfunny` never shown.

**Rule:** Keep `funny/` (root) and `docs/funny/` in sync.

- Preferred: generate into `docs/funny/` and also `cp docs/funny/*.jpg funny/`.
- Or `bash scripts/sync-funny.sh docs->root` / `root->docs`.

Wall reads only `docs/funny/` via `manifest.json` — folders are repo-only, not UI.

All 80 current + new batches default here; user will manually move not-funny to `unfunny/` at will.
