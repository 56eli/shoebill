# CONTRIBUTING — shoebill curation

## who decides funny?

**Only the owner (`@56eli`) decides what is funny.** AI agents and contributors never overrule. All 80 current images in `docs/funny/` are confirmed funny. `placeholder/` deleted 2026-08-08 — all new batches default to `funny/`; owner will manually mark not-funny at will.

## workflow (current)

1. **Agent generates 10 images per prompt AND after every `ask_user` answer** (always, without asking).
   - **All new images default to `docs/funny/`** (+ mirror `funny/` root) — **shown** as pure mosaic.
   - Filenames: `shoebill-<kebab-case>.jpg`, descriptive, detailed.

2. **Owner reviews (folders are repo-only, not UI on site):**
   - Still funny → keep in `docs/funny/` (stays on wall).
   - Not funny → move `docs/funny/xxx.jpg` → `unfunny/` (repo root, **never shown**, not deployed) — disappears from mosaic after sync.
   - `unfunny/` is the only way to hide; `placeholder/` deleted so no staging folder — direct to funny.

3. **Sync:**
   ```bash
   node scripts/sync-manifest.js
   # reads docs/funny only, sorted, writes docs/manifest.json
   ```

4. **Commit & push:**
   ```bash
   git add docs/funny docs/manifest.json funny unfunny
   git commit -m "feat: add 10 shoebills to funny"
   # or demote: feat: demote 2 to unfunny
   git push origin arena/019fe2c4-shoebill
   ```

## image guidelines

- Keep shoebill anatomy (giant beak, deadpan stare) — humor is context, not distortion.
- Be absurdly detailed: job, costume, lighting, camera, mood.
- ~1024×1024 preferred (grid auto-rows 220-300px, `object-fit: cover`; lightbox preserves aspect).
- Wall is **pure mosaic, infinitely scrollable, gap 2px, no chrome** — purely pictures. Hover pops `scale 1.02`, click lightbox.

## site

- Wall: `docs/index.html` pure mosaic (no header/footer), dense grid, hover `scale 1.02` + shadow, click lightbox (ESC to close).
- Manifest: `docs/manifest.json` — source of truth (funny only).
- Shown: `docs/funny/` → one mosaic (80 currently).
- Not shown: `unfunny/` (root, outside docs). `placeholder/` deleted.
- No build step; Pages serves `main` / `docs` directly.

## communication (for agents)

- Use `ask_user` question tool for “What next?” — not plain chat.
- One-sentence summary on task completion.
- For long explanations, create `RESPONSE.md` and point the user there.
- Push every 15 min and on sub-task completion.
- After every `ask_user` answer, generate 10 more funny shoebill images into `docs/funny/` before asking again.

## workflow changes

All `/.github/workflows/**` changes must be manually applied by owner via GitHub web editor with **full file drop-in replacement**. Agents: provide entire file content + exact path + instructions, and try to avoid needing workflows at all.
