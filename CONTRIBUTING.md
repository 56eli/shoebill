# CONTRIBUTING — shoebill curation

## who decides funny?

**Only the owner (`@56eli`) decides what is funny.** AI agents and contributors never overrule. Initial 10 in `docs/funny/` are confirmed funny.

## workflow

1. **Agent generates 10 images per prompt AND after every `ask_user` answer** (always, without asking).
   - Provisional location: `docs/placeholder/` (+ mirror `placeholder/` root) — **still shown** as part of pure mosaic.
   - Or `docs/funny/` if owner explicitly wants immediate promoted.
   - Filenames: `shoebill-<kebab-case>.jpg`, descriptive, detailed.

2. **Owner reviews (folders are repo-only, not UI on site):**
   - Still funny → keep in `docs/funny/` or promote `docs/placeholder/xxx.jpg` → `docs/funny/xxx.jpg` (stays on wall, now confirmed)
   - Funny enough for now → keep in `docs/placeholder/` (still on wall, staged for later discard)
   - Not funny → move to `unfunny/` (repo root, **never shown**, not deployed, never in manifest) — disappears from mosaic
   - Both `funny` + `placeholder` are shown as one infinite pure mosaic; `unfunny` is the only way to hide.

3. **Sync:**
   ```bash
   node scripts/sync-manifest.js
   # reads docs/funny + docs/placeholder, sorted, writes docs/manifest.json
   # verify both lists appear
   ```

4. **Commit & push:**
   ```bash
   git add docs/funny docs/placeholder docs/manifest.json placeholder funny unfunny
   git commit -m "feat: promote 3 shoebills to funny, demote 2 to unfunny"
   git push origin arena/019fe2c4-shoebill
   ```

## image guidelines

- Keep shoebill anatomy (giant beak, deadpan stare) — humor is context, not distortion.
- Be absurdly detailed: job, costume, lighting, camera, mood.
- ~1024×1024 preferred (grid auto-rows 220-300px, `object-fit: cover`; lightbox preserves aspect).
- Wall is **pure mosaic, infinitely scrollable, gap 2px, no chrome** — purely pictures.

## site

- Wall: `docs/index.html` pure mosaic (no header/footer), dense grid, hover `scale 1.02` + shadow, click lightbox (ESC to close).
- Manifest: `docs/manifest.json` — source of truth (funny + placeholder).
- Shown: `docs/funny/` + `docs/placeholder/` → one mosaic.
- Not shown: `unfunny/` (root, outside docs).
- No build step; Pages serves `main` / `docs` directly.

## communication (for agents)

- Use `ask_user` question tool for “What next?” — not plain chat.
- One-sentence summary on task completion.
- For long explanations, create `RESPONSE.md` and point the user there.
- Push every 15 min and on sub-task completion.
- After every `ask_user` answer, generate 10 more funny shoebill images before asking again.

## workflow changes

All `/.github/workflows/**` changes must be manually applied by owner via GitHub web editor with **full file drop-in replacement**. Agents: provide entire file content + exact path + instructions, and try to avoid needing workflows at all.
