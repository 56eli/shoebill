# shoebill.

A wall of funny shoebill stork images — [live wall](https://56eli.github.io/shoebill/) (deployed from `main` / `docs`).

Hover to pop, click to view full. Only funny shoebills live on the wall.

![wall preview](docs/funny/shoebill-manager-flamingo-review.jpg)

## quickstart

- **Site:** `docs/index.html` + `docs/style.css` + `docs/script.js` → GitHub Pages serves `main` / `docs`
- **Funny wall:** `docs/funny/` (canonical, deployed) — see `docs/manifest.json`
- **Not funny:** `unfunny/` (repo root, archived)
- **Staging:** `placeholder/` (repo root, funny enough for now, pending review)

Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `docs` → Save.

Local preview:

```bash
python -m http.server 8000 --directory docs
# or
npx serve docs
# bind to 0.0.0.0 for Arena preview proxy
```

Adding images:

```bash
# drop 10 new shoebills into docs/funny or placeholder
# then sync manifest
node scripts/sync-manifest.js
git add docs/funny docs/manifest.json placeholder unfunny
git commit -m "feat: add 10 shoebills"
git push origin arena/019fe2c4-shoebill
```

## folders

```
docs/
  index.html        # wall grid + lightbox
  style.css         # hover pop
  script.js         # loads manifest.json
  manifest.json     # list of funny images
  funny/            # ✅ shown on wall (exclusively funny)
  .nojekyll
unfunny/            # ❌ not funny (archived)
placeholder/        # ⏳ funny enough for now, will be discarded later
funny/              # alias/mirror of docs/funny at repo root
scripts/
  sync-manifest.js  # regenerate manifest from docs/funny
  sync-funny.sh     # keep root funny ↔ docs/funny in sync
```

## for AI agents

Read `agent.md` first. TL;DR:

- **ALWAYS generate 10 images per prompt** without being asked, very creative & detailed
- **ONLY THE USER decides what’s funny** — you move files between folders on command, never delete
- Use the **question tool** to ask “What next?” and provide a **one-sentence summary** on completion
- If explanation > few words, write a **temporary response file** (e.g., `RESPONSE.md`)
- **Push every 15 minutes** and on sub-task completion to `arena/…` branch
- Workflow changes require **manual GitHub web editor** full-file drop-in — avoid if possible; provide complete file content

See `agent.md`, `AGENT.md`, `AGENTS.md`, `CONTRIBUTING.md`, `docs/README.md`.

## curation

- New batch (10) → `placeholder/` (provisional) → user reviews → promote to `docs/funny/` or demote to `unfunny/`
- After any move, `node scripts/sync-manifest.js`

## license

MIT — shoebills are prehistoric and public domain in spirit.
