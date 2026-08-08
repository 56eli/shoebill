# funny (root alias) — also on the wall

> Canonical location is `docs/funny/` — that is what GitHub Pages serves from `main /docs` (pure mosaic, only pictures).

This folder exists so the repo has a top-level `funny/` as described — it mirrors `docs/funny/` and **is shown** on the wall alongside `placeholder` as one infinite mosaic. `unfunny` is never shown.

**Rule:** Keep `funny/` (root) and `docs/funny/` in sync.

- Preferred: put promoted funny images directly into `docs/funny/` and also `cp docs/funny/*.jpg funny/` to keep alias.
- Or `bash scripts/sync-funny.sh docs->root` / `root->docs` (handles both funny + placeholder).

Wall reads `docs/funny/` + `docs/placeholder/` via `manifest.json` — folders are repo-only, not UI on site.

ONLY THE USER decides what is funny. Initial 10 here are confirmed funny.
