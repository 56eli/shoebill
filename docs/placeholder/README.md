# placeholder — the wall (part 2)

This folder **is also the website** (alongside `funny/`).

- `docs/placeholder/` is shown on the wall just like `docs/funny/` — both are listed in `docs/manifest.json` and rendered as one infinite mosaic in `docs/index.html`.
- Use: newly generated or borderline-funny shoebills live here — *funny enough for now, but will be discarded later* if the user says so.
- User later promotes → move to `docs/funny/` or demotes → move to `unfunny/` (repo root, not deployed).

**Infinite mosaic:** `docs/index.html` is pure pictures — no header/footer/chrome, just a dense grid (`gap: 2px`) with hover pop (`scale 1.02`) and click lightbox. Scroll infinitely.

Sync: `node scripts/sync-manifest.js` regenerates manifest from both `docs/funny/` + `docs/placeholder/` (sorted).

Root `placeholder/` (at repo root) is a mirror alias — keep in sync via `cp docs/placeholder/* placeholder/` or `scripts/sync-funny.sh`.
