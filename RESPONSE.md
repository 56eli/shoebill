# shoebill — initial setup complete

**One-sentence summary:** Built the GitHub Pages wall (`docs/` → `main /docs`) with hover-pop + lightbox and generated 10 funny shoebill images into `docs/funny/` (mirrored to `funny/`) — ready to deploy.

---

## what was built

### site (`docs/`)
- `index.html` — responsive wall grid (auto-fill minmax 220–260px, masonry feel), header with count, footer meta
- `style.css` — hover: `translateY(-6px) scale(1.025)` + `box-shadow: 0 16px 40px`, card aspect `1/1`, overlay caption, lightbox full-screen with ESC/ click-outside close
- `script.js` — loads `manifest.json` (fallback hard-coded list), renders cards with lazy loading, hides 404s, accessible keyboard (Enter/Space)
- `manifest.json` — source of truth for wall (10 images, auto-synced)
- `.nojekyll` — disables Jekyll
- `funny/` — 10 JPGs (see below) + README

### folders (spec compliance)
- `docs/funny/` — **canonical funny wall** (deployed, exclusively funny)
- `funny/` (root) — alias/mirror of `docs/funny/` (kept in sync via `scripts/sync-funny.sh`)
- `unfunny/` (root) — not funny archive (with README, outside `docs`)
- `placeholder/` (root) — funny-enough-for-now staging (with README)

### 10 initial shoebills (all photorealistic, detailed)
1. `shoebill-manager-flamingo-review.jpg` — tiny suit, clipboard, reviewing flamingo in office
2. `shoebill-sushi-chef-chaos.jpg` — bandana, beak balancing nigiri, chaotic kitchen
3. `shoebill-tiny-bicycle-wobble.jpg` — child bike, helmet too small, suburb
4. `shoebill-bathtub-rubber-ducks.jpg` — shower cap, bubble bath, rubber ducks
5. `shoebill-detective-noir-frog.jpg` — trench coat, magnifying glass, frog suspect
6. `shoebill-yoga-lily-pad.jpg` — tree pose on lily pad, confused ducks
7. `shoebill-barista-espresso-fail.jpg` — apron, glasses, spraying espresso
8. `shoebill-beach-float-sunscreen.jpg` — flamingo float, sunglasses, sunscreen stripe
9. `shoebill-librarian-shush.jpg` — glasses, cardigan, shushing, books tumbling
10. `shoebill-selfie-duckface.jpg` — wing selfie, duck-face, swamp

All 10 are in `docs/funny/` + mirrored to `funny/` + listed in `docs/manifest.json`.

### documentation (agent compliance)
- `agent.md` (+ `AGENT.md`, `AGENTS.md`, `CLAUDE.md` aliases) — **complete agent bible**: 10-images-always, only-user-decides-funny, folder contract, creativity guide, question-tool usage, push-every-15-min, no-workflow-without-manual-drop-in, session-expires-on-PR-merge, etc.
- `README.md` — human quickstart + folder map + agent TL;DR
- `CONTRIBUTING.md` — curation workflow
- `docs/README.md` — Pages deployment + local preview + sync instructions
- `scripts/sync-manifest.js` — regenerates manifest from `docs/funny/`
- `scripts/sync-funny.sh` — keeps `funny/` ↔ `docs/funny/` in sync (rsync or cp fallback)
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist

## GitHub Pages deploy

- Go to **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `docs` → Save**
- Push this branch to `main` via PR — wall appears at `https://56eli.github.io/shoebill/` in ~1 min
- No workflow file needed (avoids manual install); all static

## verification

```bash
ls -lh docs/funny/*.jpg  # 10 files ~200-300KB each
node scripts/sync-manifest.js  # rewrites manifest
python -m http.server 8000 --directory docs  # preview wall
```

## pushes

- Will be pushed to `arena/019fe2c4-shoebill` now (safeguard).
- Next pushes every 15 min + on sub-task completion.

---

### what next? (for you, via question tool)

Read this file, then I’ll ask via the question feature — but here are suggestions:

- **Pick a theme for next 10?** e.g., “shoebill olympics”, “shoebill wedding”, “shoebill space”
- **Review the 10:** tell me which to keep in `funny`, move to `placeholder`, or banish to `unfunny` — I’ll move + re-sync
- **Tweak wall:** denser masonry, captions, shuffle, dark mode?
- **Approve PR to `main`** to go live?
