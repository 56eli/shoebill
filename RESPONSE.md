# shoebill — update: pure mosaic + placeholder also shown + 10 more

**One-sentence summary:** Rebuilt wall as pure infinite mosaic (only pictures, gap 2px, no chrome) that shows both `funny` + `placeholder` (20 images now), kept `unfunny` repo-only, and generated 10 more funny shoebills into `docs/placeholder/` after your answer — docs updated and synced.

---

## changes per your feedback

### 1. 10 pics are funny — confirmed
- Initial 10 in `docs/funny/` (and `funny/` mirror) remain — user confirmed funny.
- Kept in manifest, still shown.

### 2. Only funny + placeholder on wall, unfunny not
- `docs/funny/` (10) **+** `docs/placeholder/` (10) → **20 total** in `docs/manifest.json`, rendered as one dense mosaic.
- `unfunny/` stays at repo root, outside `docs`, never listed in manifest, never deployed, never visible.
- Folders are **repo-only, not seen on website** — site shows only pictures, no folder labels/UI.

### 3. Website purely pictures, mosaic, infinitely scrollable
- `docs/index.html` stripped to just `<div id="grid">` + lightbox — no header/footer/count.
- `docs/style.css` → `gap:2px`, `grid-auto-flow:dense`, `grid-auto-rows: 180-300px`, mosaic span variants (`nth-child(7n+2)` rowspan2, `nth-child(7n+5)` colspan2), hover pop `scale 1.02`, fills viewport, infinite scroll = normal page scroll.
- `docs/script.js` updated to load `funny/*` + `placeholder/*` fallback, no caption/count needed.

### 4. After every ask_user answer also generate 10 more — done + documented
- Generated 10 new into `docs/placeholder/` + mirrored to `placeholder/` root:
  - `shoebill-dj-rave-laser.jpg` — headphones, turntable, neon rave
  - `shoebill-graduation-cap-toss.jpg` — cap, diploma in beak
  - `shoebill-spa-cucumber-mask.jpg` — robe, cucumber on beak, foot bath
  - `shoebill-construction-hardhat.jpg` — hard hat, blueprint upside down
  - `shoebill-wedding-suit-flower.jpg` — tux, bouquet, flamingo bride
  - `shoebill-astronaut-moon.jpg` — spacesuit, beak through visor, floating fish
  - `shoebill-boxing-gloves-ring.jpg` — red gloves on wings, sparrow opponent
  - `shoebill-bbq-grill-apron.jpg` — KISS THE COOK, burger on fire
  - `shoebill-magician-hat-rabbit.jpg` — top hat, rabbit, wand
  - `shoebill-shopping-cart-supermarket.jpg` — cart overflowing, cans falling
- `scripts/sync-manifest.js` now reads **both** `docs/funny/` + `docs/placeholder/` (sorted), writes combined manifest.
- `scripts/sync-funny.sh` now syncs **both** pairs (`funny` and `placeholder`).

### 5. Documentation updated (put info into docs)
- `agent.md` (+ `AGENT.md`/`AGENTS.md`/`CLAUDE.md`) — notes pure mosaic, both folders shown, unfunny never, after-every-answer 10, infinite scroll.
- `README.md` — pure mosaic quickstart, shown/hidden folders, after-answer rule.
- `CONTRIBUTING.md` — workflow with both folders shown.
- `docs/README.md` — pure mosaic description, shown = funny+placeholder, unfunny root only.
- `docs/funny/README.md` + `docs/placeholder/README.md` + `funny/README.md` + `placeholder/README.md` + `unfunny/README.md` — all updated with new rules.
- `.github/PULL_REQUEST_TEMPLATE.md` — checklist checks both folders.

### structure now

```
docs/
  index.html      # pure mosaic, no chrome
  style.css       # gap 2px dense mosaic
  script.js       # loads funny+placeholder
  manifest.json   # 20 images (10 funny + 10 placeholder sorted)
  funny/          # 10 ✅ shown
  placeholder/    # 10 ✅ shown (new batch)
  .nojekyll
unfunny/          # 0, never shown, outside docs
funny/            # mirror of docs/funny (10)
placeholder/      # mirror of docs/placeholder (10)
```

### verification

```bash
ls docs/funny/*.jpg | wc -l       # 10
ls docs/placeholder/*.jpg | wc -l # 10
node scripts/sync-manifest.js     # writes 20
python -m http.server 8000 --directory docs  # pure mosaic
```

Pushed to `arena/019fe2c4-shoebill` — ready for next review.

---

### what next? (ask_user)

Per your new rule, I’ll generate **10 more** after you answer. Options:

- Keep mosaic as is, review 20 (which to demote to `unfunny`?)
- Theme for next 10: shoebill Olympics / horror / office / kids?
- Approve PR to `main` → live at `https://56eli.github.io/shoebill/`
- No change — just generate another 10 placeholder batch
