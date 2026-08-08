# shoebill.

A wall of funny shoebill stork images — [live wall](https://56eli.github.io/shoebill/) (deployed from `main` / `docs`).

Pure mosaic, infinitely scrollable — hover to pop, click to view full. Only `funny/` is shown; `placeholder` deleted.

![wall preview](docs/funny/shoebill-manager-flamingo-review.jpg)

## quickstart

- **Site:** `docs/index.html` + `docs/style.css` + `docs/script.js` → GitHub Pages serves `main` / `docs` — **purely pictures, no chrome, mosaic infinitely scrollable**
- **Shown on wall:** `docs/funny/` (all images default funny) — listed in `docs/manifest.json` → one mosaic
- **Not shown:** `unfunny/` (repo root, archived) — never deployed; move here to hide: `docs/funny/xxx.jpg` → `unfunny/xxx.jpg`
- **Placeholder deleted 2026-08-08** — all new batches default to `funny/`; user will manually mark not-funny at will.
- Folders are **repo-only, not seen on the website** — site is only the mosaic.

Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `docs` → Save.

Local preview:

```bash
python -m http.server 8000 --directory docs
# open http://localhost:8000 — pure mosaic, gap 2px, no header/footer
# bind to 0.0.0.0 for Arena preview proxy
```

Adding images (now default to funny):

```bash
# new batch → docs/funny (shown) — always 10 per prompt + 10 after every ask_user answer
node scripts/sync-manifest.js  # reads docs/funny only, sorted
cp docs/funny/*.jpg funny/  # mirror root alias
git add docs/funny docs/manifest.json funny unfunny
git commit -m "feat: add 10 shoebills"
git push origin arena/019fe2c4-shoebill
```

## folders (current)

```
docs/
  index.html        # pure mosaic wall (no chrome) + lightbox
  style.css         # mosaic grid, hover pop (scale 1.02)
  script.js         # loads manifest.json (funny only)
  manifest.json     # list of ALL wall images (funny sorted)
  funny/            # ✅ shown (all batches default here, 80 currently)
  .nojekyll
unfunny/            # ❌ never shown, not deployed (repo root only)
funny/              # alias/mirror of docs/funny at repo root
# placeholder/ deleted 2026-08-08
scripts/
  sync-manifest.js  # regenerate manifest from docs/funny
  sync-funny.sh     # keep root funny ↔ docs/funny in sync
```

## for AI agents

Read `agent.md` first. TL;DR:

- **ALWAYS generate 10 images per prompt AND after every `ask_user` answer** without being asked, very creative & detailed, **default every picture to `funny/`**
- **ONLY THE USER decides what’s funny** — you never delete; user manually moves `docs/funny/xxx.jpg` → `unfunny/xxx.jpg` at will
- **Mosaic is purely pictures**, infinitely scrollable, `gap:2px`; `placeholder` deleted; `unfunny` never shown
- Use the **question tool** to ask “What next?” and provide a **one-sentence summary** on completion
- If explanation > few words, write a **temporary response file** (e.g., `RESPONSE.md`)
- **Push every 15 minutes** and on sub-task completion to `arena/…` branch
- Workflow changes require **manual GitHub web editor** full-file drop-in — avoid if possible

See `agent.md`, `AGENT.md`, `AGENTS.md`, `CONTRIBUTING.md`, `docs/README.md`.

## curation (now)

- All 80 in `docs/funny/` are **confirmed funny** (including initial, migrated, and new batches).
- New batch (10) → `docs/funny/` (shown) → user later manually demotes to `unfunny/` if needed (disappears after sync)
- After any move, `node scripts/sync-manifest.js` + push
- Placeholder deleted — no longer used.

## license

MIT — shoebills are prehistoric and public domain in spirit.
