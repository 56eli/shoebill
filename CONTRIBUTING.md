# CONTRIBUTING — shoebill curation

## who decides funny?

**Only the owner (`@56eli`) decides what is funny.** AI agents and contributors never overrule.

## workflow

1. **Agent generates 10 images per prompt** (always, without asking).
   - Provisional location: `placeholder/` (or `docs/funny/` if owner wants immediate wall).
   - Filenames: `shoebill-<kebab-case>.jpg`, descriptive.

2. **Owner reviews:**
   - Funny → move to `docs/funny/` (appears on wall after manifest sync)
   - Not funny → move to `unfunny/` (archived, not deleted)
   - Funny enough for now → keep in `placeholder/` (limbo)

3. **Sync:**
   ```bash
   node scripts/sync-manifest.js
   # verify docs/manifest.json lists docs/funny/* correctly
   ```

4. **Commit & push:**
   ```bash
   git add docs/funny docs/manifest.json placeholder unfunny
   git commit -m "feat: promote 3 shoebills to wall, demote 2"
   git push origin arena/019fe2c4-shoebill
   ```

## image guidelines

- Keep shoebill anatomy (giant beak, deadpan stare) — humor is context, not distortion.
- Be absurdly detailed: job, costume, lighting, camera, mood.
- Square-ish 1024×1024 preferred (wall crops to square, lightbox keeps aspect).
- Keep `docs/` exclusively funny — don't put `unfunny`/`placeholder` inside `docs/` unless you hide them from `manifest.json`.

## site

- Wall: `docs/index.html` grid, hover `translateY(-6px) scale(1.025)`, click lightbox.
- Manifest: `docs/manifest.json` — source of truth.
- No build step; Pages serves `main` / `docs` directly.

## communication (for agents)

- Use `ask_user` question tool for “What next?” — not plain chat.
- One-sentence summary on task completion.
- For long explanations, create `RESPONSE.md` and point the user there.
- Push every 15 min and on sub-task completion.

## workflow changes

All `/.github/workflows/**` changes must be manually applied by owner via GitHub web editor with **full file drop-in replacement**. Agents: provide entire file content + exact path + instructions, and try to avoid needing workflows at all.
