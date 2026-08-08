# placeholder — also on the wall

**This folder is shown on the wall** (via `docs/placeholder/`). The wall is a pure mosaic of **both** `funny` + `placeholder` — `unfunny` is never shown.

- `docs/placeholder/` is deployed (checked in). This `placeholder/` at repo root is a **mirror alias** for the spec’s top-level folder requirement — keep them in sync (`cp docs/placeholder/*.jpg placeholder/` or `bash scripts/sync-funny.sh` variant).
- Use: staging / limbo — *funny enough for now, but will be discarded later*. Newly generated batches go here first if provisional.
- User is king: moves `placeholder/xxx.jpg` → `docs/funny/xxx.jpg` (promote, stays on wall) or → `unfunny/xxx.jpg` (demote, disappears from wall).
- Both `docs/funny/` + `docs/placeholder/` are listed in `docs/manifest.json` → one infinite mosaic, purely pictures, no chrome.

Workflow:
1. Agent generates 10 images → `docs/placeholder/` (+ mirror to `placeholder/`).
2. User reviews → promote to `docs/funny/` or demote to `unfunny/`.
3. `node scripts/sync-manifest.js` → wall updates. Folders themselves are repo-only, never seen as UI on the site.

See `agent.md`.
