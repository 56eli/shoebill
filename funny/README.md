# funny (root alias)

> Canonical location is `docs/funny/` — that is what GitHub Pages serves from `main /docs`.

This folder exists so the repo has a top-level `funny/` as described in the project brief.

**Rule:** Keep `funny/` (root) and `docs/funny/` in sync.

- Preferred: put promoted funny images directly into `docs/funny/` and optionally copy to `funny/` if you need a root alias.
- Or use `scripts/sync-funny.sh` if present: `bash scripts/sync-funny.sh` (root → docs)

The wall only reads from `docs/funny/` + `docs/manifest.json`.

ONLY THE USER decides what is funny. Agents must not delete without user approval — move to `unfunny/` or `placeholder/`.
