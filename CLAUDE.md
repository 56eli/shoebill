# agent.md — instructions for all AI agents (Arena sandbox)

> **If you are an AI agent working on `56eli/shoebill`, read this ENTIRE file first. You must obey it every prompt. The human (owner) is the only judge of funny.**

## 0) One-sentence summary

GitHub Pages wall (`main`/`docs`) is a **pure mosaic, infinitely scrollable, only pictures** — it shows **only `funny/`** (`placeholder` deleted 2026-08-08, `unfunny` never shown); you must generate **exactly 10** creative shoebill images **per prompt AND after every `ask_user` answer**, defaulting every new picture to `docs/funny/` (user will manually move not-funny to `unfunny/`), keep `docs/funny` + `docs/manifest.json` in sync, push, then ask “What next?” via the *question* tool.

---

## 1) Project idea

- **GitHub Pages** is deployed from `main` → `/docs` (Settings → Pages → Source: Deploy from a branch → `main` / `docs`). No Actions required.
- `/docs` **is** the wall — it contains **only** `index.html`, `style.css`, `script.js`, `manifest.json`, and `funny/` (shown). `unfunny/` lives at repo root outside `docs` so it’s never deployed. `placeholder/` was **deleted 2026-08-08** per owner — do not recreate.
- The wall is **purely pictures, nothing else**: no header/footer/chrome — just a gap-`2px` dense mosaic grid (`grid-auto-flow: dense`, `gap:2px`) that is **infinitely scrollable** (normal page scroll, no pagination). Hover pops a little (`scale 1.02` + shadow), click opens full lightbox (ESC / click outside to close). Folders are repo-only — the site never shows folder UI, only the mosaic.
- All site files are vanilla HTML/CSS/JS so Pages works with no build step.

## 2) Golden rules (from the owner — never break)

1. **ALWAYS generate 10 images per prompt AND after every `ask_user` answer.** The tool allows up to 10 per turn — you ALWAYS create 10 funny shoebill images, even if the user didn’t ask, and also after the user answers any `ask_user` question. No exceptions. Be *very* creative and *very* detailed (scenario + mood + lighting + camera + shoebill expression). All 30 current images are confirmed funny — future batches also default to funny.
2. **ONLY THE USER decides what is funny.** You default every new picture to `funny/`; the user will **manually review later and mark not-funny at will** by moving `docs/funny/xxx.jpg` → `unfunny/xxx.jpg`. Never argue, never keep an image in `funny` after the user says it’s not funny — move it immediately to `unfunny/` + re-sync.
3. **Folder contract (UPDATED 2026-08-08 — placeholder deleted):**
   - `docs/funny/` — **canonical funny wall, default for all new batches**. Every image here appears on the mosaic via `docs/manifest.json`. This *is* the `funny` folder for Pages. Keep `funny/` (root alias) in sync if you use it (`cp docs/funny/*.jpg funny/`).
   - `unfunny/` (repo root, **outside `docs`**) — images judged *not funny*. **Never shown**, never deployed, never in manifest. Never delete — archive. This is the **only** way to hide — move here to remove from wall. Folders are repo-only, not seen on website.
   - `placeholder/` — **DELETED 2026-08-08** per owner. Do not create `placeholder/` at root or `docs/placeholder/`. If you see legacy refs, migrate to `funny/`. All new images default to `funny/`.
   - Root `funny/` — alias/mirror of `docs/funny/` for the spec’s “top-level `funny` folder” requirement. Canonical for deployment is `docs/funny/`; if you write to root `funny/`, also copy to `docs/funny/` and re-sync manifest.
4. **Creativity:** Shoebills in absurd human jobs, hobbies, costumes, physics-defying situations. Detailed prompts win: `“photorealistic shoebill stork wearing an oversized sushi-chef bandana, giant beak precariously balancing a salmon nigiri, tiny kitchen, steam, deadpan stare, 85mm, shallow depth”` beats `“funny shoebill”`.
5. **Communication:**
   - When you need to talk to the user, **use the `ask_user` question tool**, not plain chat. Minimal phrase: **“What next?”** — plus optional suggestions.
   - After finishing a task, **provide a one-sentence summary** (so the user doesn’t waste a prompt).
   - **Always end with questions/suggestions** for what to do next (e.g., “Another 10? Review 30? Go live?”).
   - If you need to present more than a few words, **create a temporary response file** (e.g., `RESPONSE.md` or `docs/_tmp.md`) and tell the user to read it — don’t flood chat.
   - **After every `ask_user` answer you must also generate 10 more funny shoebill images** into `docs/funny/` before asking again.
6. **Persistence:** You are sandboxed; **session expires on PR merge**. **Push every ~15 minutes and on every sub-task completion** to `arena/<id>` branch to safeguard against GitHub access loss. Keep pushes clean — squash/fix docs before push, no large unrelated blobs.
7. **Workflows:** All workflow changes (`/.github/workflows/**`) must be **manually implemented by the owner via the GitHub web editor with a full file drop-in replacement**. **Avoid this as much as possible.** Don’t add Actions unless absolutely required; prefer no-build static (current site needs none). If you *must* propose a workflow, provide the **entire file content** in a response file with exact path + “copy-paste replace entire file” instructions.
8. **Keep documentation clean and updated on every push.** If you add images, update `docs/manifest.json` via `node scripts/sync-manifest.js` (now reads only `docs/funny/`). Do not recreate `placeholder/`.

## 3) Startup checklist (every agent, every prompt, every ask_user answer)

```
1. Read agent.md (this file), README.md, docs/README.md
2. Check git status / branch (you are on arena/… — never switch)
3. Generate 10 images (see §4) — no prompt needed, and also after every ask_user answer
4. Place them per §2.3: default ALL new → docs/funny/ (+ mirror to funny/ root) — still shown as mosaic; never placeholder, never unfunny unless user says so
5. Run node scripts/sync-manifest.js  (reads only docs/funny/, writes docs/manifest.json sorted)
6. Also mirror to root alias: cp docs/funny/*.jpg funny/
7. Commit + push to arena/… branch (git push origin arena/…)
8. Create RESPONSE.md if you have > few words to show, else one-sentence summary + ask_user “What next?” with suggestions
```

## 4) Image generation contract

- **Count:** Exactly 10 per user prompt **and** per `ask_user` answer. If you’ve already generated <10 this turn due to errors, continue until 10.
- **Tool:** `generate_image` (or `image_search` if generation is down — but prefer generation). Each image needs a distinct, highly detailed funny prompt.
- **Style:** Prefer photorealistic or whimsical illustrative, but make shoebill the star — giant beak, deadpan stare, prehistoric vibe.
- **Filenames:** Write to `docs/funny/` as `shoebill-<kebab-case-scenario>.jpg` (e.g., `shoebill-barista-espresso-fail.jpg`). Mirror to root `funny/`. Never overwrite without user consent. **Do not use `placeholder/` — it’s deleted.**
- **After generation:** Verify (`ls -lh docs/funny`), then `node scripts/sync-manifest.js`.

**Example 10 creative prompts (rotate, never repeat exactly):**

1. shoebill as tiny office manager in ill-fitting suit, holding clipboard, reviewing flamingos — deadpan stare, fluorescent office, shallow DOF
2. shoebill sushi chef with bandana, beak balancing salmon nigiri, chaotic kitchen, steam, fish looking alarmed
3. shoebill wobbling on child’s bicycle, helmet too small, feathers ruffled, suburban street, motion blur
4. shoebill in bubble bath with rubber ducks, shower cap, stare at camera, bathroom tiles, photorealistic
5. shoebill noir detective in trench coat, magnifying glass over a frog suspect, rain, neon, cinematic
6. shoebill doing yoga tree-pose on lily pad, other birds watching confused, sunset swamp
7. shoebill barista failing at latte art, espresso machine sputtering, café, morning light
8. shoebill at beach with flamingo float, sunglasses, sunscreen stripe on beak, tropical
9. shoebill librarian shushing, beak wide, books tumbling, dusty library, dramatic light
10. shoebill taking selfie with phone in wing, duck-face, awkward angle, swamp selfie stick

You can be absurd, but keep shoebill anatomy correct — the humor is the contrast. **After every ask_user answer, make 10 fresh ones with new scenarios** (firefighter, rockstar, scientist, pirate, pizza, farmer, ninja, gamer, mail, dentist, etc.).

## 5) Curation contract (user is king)

- **Default:** All new images → `docs/funny/` (shown). User later manually moves not-funny → `unfunny/`.
- Moves only:
  - `docs/funny/xxx.jpg` → `unfunny/xxx.jpg` (user demotes — disappears from mosaic)
  - `unfunny/xxx.jpg` → `docs/funny/xxx.jpg` (user re-promotes — reappears)
- If user says “that one isn’t funny”, move it *immediately* and re-sync manifest + push.
- No `placeholder` — do not use. Legacy placeholder images were migrated to `funny/` on 2026-08-08.

## 6) Website contract (don’t break the wall)

- **Pure mosaic, infinitely scrollable, only pictures** — `docs/index.html` has **no header/footer**, just `div.grid` with `gap:2px`, `grid-auto-flow: dense`, hover pop, lightbox. Don’t add chrome, text, counts, or folder UI.
- `docs/manifest.json` is source of truth (reads `docs/funny/` only). If you add/remove from `docs/funny/`, **always** re-sync (`node scripts/sync-manifest.js`).
- No build step; vanilla HTML/CSS/JS so Pages works from `main /docs` with no Action.
- Test locally: `python -m http.server 8000 --directory docs` then open via preview host `0.0.0.0`.

## 7) Communication & push hygiene

- **One-sentence summary** on completion: e.g., “Generated 10 new shoebills into docs/funny/ (now 30 total) and synced manifest; mosaic updated.”
- **Ask via `ask_user`**: Always end with “What next?” + 2–4 suggestion options. **Remember: after the user answers, you must generate 10 more into docs/funny/ before asking again.**
- **Temp response file**: If your explanation >~3 lines, write `RESPONSE.md` (or `tmp/response-<date>.md`) and say “See RESPONSE.md”.
- **Push cadence**: `git push origin arena/…` every ~15 min and after each sub-task (images done, manifest synced, docs updated). Keep commits tidy: `feat: add 10 shoebills (… )`, `chore: sync manifest`.
- **Do not** push to `main` directly — you’re on `arena/…`; open a PR from there when asked; final handoff is PR → merge to `main` (see §10).

## 8) What to avoid

- Don’t create new workflows without full drop-in instructions for manual web-editor install.
- Don’t generate fewer than 10 images (per prompt + per ask_user answer).
- Don’t use plain chat for questions — use the question tool.
- Don’t leave `docs/manifest.json` stale (must list `docs/funny/` sorted).
- Don’t put unfunny images inside `docs/` — they’d be shown. Keep `unfunny/` at root only.
- Don’t recreate `placeholder/` — it’s deleted per owner 2026-08-08; don’t add folder UI to the mosaic.

## 9) Other docs

- `README.md` — human overview + quickstart (now notes placeholder deleted, default funny)
- `docs/README.md` — Pages deployment notes (pure mosaic, only funny shown)
- `CONTRIBUTING.md` — curation guide (default funny, manual unfunny)
- `scripts/sync-manifest.js` / `scripts/sync-funny.sh` — helpers (now single-folder)

## 10) For the owner (manual workflow install & PR merge)

If an agent proposes a workflow file, it will be in `RESPONSE.md` with:

```
Path: .github/workflows/pages.yml
Action: In GitHub web editor, create/replace entire file with content below:
<full file content>
```

You copy-paste the whole file — agents cannot push workflows automatically without your manual step.

**PR merge (handoff):** Arena branch is `arena/019fe2c4-shoebill`. To go live: `gh pr create --base main --head arena/019fe2c4-shoebill` then `gh pr merge --merge` (or via web UI: Pull requests → New → compare `arena/...` → Create → Merge). Session expires on merge — push before merging to safeguard.

---

**End.** Now generate 10 shoebills into `docs/funny/`, sync, push, summarize in one sentence, and ask “What next?” via the question tool — and remember to generate 10 more after the user answers (all default funny).
