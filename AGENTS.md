# agent.md — instructions for all AI agents (Arena sandbox)

> **If you are an AI agent working on `56eli/shoebill`, read this ENTIRE file first. You must obey it every prompt. The human (owner) is the only judge of funny.**

## 0) One-sentence summary

GitHub Pages wall (`main`/`docs`) is a **pure mosaic, infinitely scrollable, only pictures** — it shows **both** `funny` + `placeholder` as one wall (`unfunny` never shown); you must generate **exactly 10** creative shoebill images **per prompt AND after every `ask_user` answer**, keep `docs/funny` + `docs/placeholder` + `docs/manifest.json` in sync, push, then ask “What next?” via the *question* tool.

---

## 1) Project idea

- **GitHub Pages** is deployed from `main` → `/docs` (Settings → Pages → Source: Deploy from a branch → `main` / `docs`). No Actions required.
- `/docs` **is** the wall — it contains **only** `index.html`, `style.css`, `script.js`, `manifest.json`, `funny/` and `placeholder/` (both shown). `unfunny/` lives at repo root outside `docs` so it’s never deployed.
- The wall is **purely pictures, nothing else**: no header/footer/chrome — just a gap-`2px` dense mosaic grid (`grid-auto-flow: dense`, `gap:2px`) that is **infinitely scrollable** (normal page scroll, no pagination). Hover pops a little (`scale 1.02` + shadow), click opens full lightbox (ESC / click outside to close). Folders are repo-only — the site never shows folder UI, only the combined mosaic.
- All site files are vanilla HTML/CSS/JS so Pages works with no build step.

## 2) Golden rules (from the owner — never break)

1. **ALWAYS generate 10 images per prompt AND after every `ask_user` answer.** The tool allows up to 10 per turn — you ALWAYS create 10 funny shoebill images, even if the user didn’t ask, and **also** after the user answers any `ask_user` question. No exceptions. If you hit a tool limit, make a second turn and finish the 10. Be *very* creative and *very* detailed (scenario + mood + lighting + camera + shoebill expression). The initial 10 are already confirmed funny — future batches follow the same rule.
2. **ONLY THE USER decides what is funny.** You may make a provisional guess for initial placement, but the user’s word is final. Never argue, never keep an image in `funny`/`placeholder` after the user says it’s not funny — move it immediately to `unfunny/`.
3. **Folder contract (never mix) — UPDATED:**
   - `docs/funny/` + `docs/placeholder/` — **both shown** on the wall as one infinite mosaic (listed in `docs/manifest.json` → `docs/index.html`). `docs/funny/` = promoted funny; `docs/placeholder/` = *funny enough for now, but will be discarded later* — also shown. Keep sorted, keep manifest in sync.
   - `unfunny/` (repo root, **outside `docs`**) — images judged *not funny*. **Never shown**, never deployed, never on the mosaic. Never delete — archive. The wall shows **only** `funny` + `placeholder`.
   - Folders are **repo-only, not seen on the website**. The site is purely pictures; never render folder names/sections as UI.
   - Mirrors at repo root: `funny/` and `placeholder/` are alias/mirrors of `docs/funny/` and `docs/placeholder/` for the spec’s “top-level folder” requirement. Canonical for deployment is `docs/...`; if you write to root alias, also copy to `docs/...` and re-sync manifest. `unfunny/` has no mirror in `docs`.
4. **Creativity:** Shoebills in absurd human jobs, hobbies, costumes, physics-defying situations. Detailed prompts win: `“photorealistic shoebill stork wearing an oversized sushi-chef bandana, giant beak precariously balancing a salmon nigiri, tiny kitchen, steam, deadpan stare, 85mm, shallow depth”` beats `“funny shoebill”`.
5. **Communication:**
   - When you need to talk to the user, **use the `ask_user` question tool**, not plain chat. Minimal phrase: **“What next?”** — plus optional suggestions.
   - After finishing a task, **provide a one-sentence summary** (so the user doesn’t waste a prompt).
   - **Always end with questions/suggestions** for what to do next (e.g., “Promote any placeholders? Another batch of 10? Change theme?”).
   - If you need to present more than a few words, **create a temporary response file** (e.g., `RESPONSE.md` or `docs/_tmp.md`) and tell the user to read it — don’t flood chat.
   - **After every `ask_user` answer you must also generate 10 more funny shoebill images** (see rule 1) before asking again.
6. **Persistence:** You are sandboxed; **session expires on PR merge**. **Push every ~15 minutes and on every sub-task completion** to `arena/<id>` branch to safeguard against GitHub access loss. Keep pushes clean — squash/fix docs before push, no large unrelated blobs.
7. **Workflows:** All workflow changes (`/.github/workflows/**`) must be **manually implemented by the owner via the GitHub web editor with a full file drop-in replacement**. **Avoid this as much as possible.** Don’t add Actions unless absolutely required; prefer no-build static (current site needs none). If you *must* propose a workflow, provide the **entire file content** in a response file with exact path + “copy-paste replace entire file” instructions.
8. **Keep documentation clean and updated on every push.** If you add images, update `docs/manifest.json` (or run `node scripts/sync-manifest.js` which reads **both** `docs/funny/` + `docs/placeholder/`) and keep `agent.md`/other docs in sync (this file already notes pure mosaic + both folders shown + after-every-answer 10).

## 3) Startup checklist (every agent, every prompt, every ask_user answer)

```
1. Read agent.md (this file), README.md, docs/README.md
2. Check git status / branch (you are on arena/… — never switch)
3. Generate 10 images (see §4) — no prompt needed, and also after every ask_user answer
4. Place them per §2.3:
   - default new batch → docs/placeholder/ (+ mirror to placeholder/ root) — still shown as mosaic
   - or docs/funny/ if user explicitly says “funny” 
   - never docs/unfunny — unfunny is root only, never shown
5. Run node scripts/sync-manifest.js  (reads docs/funny + docs/placeholder, writes docs/manifest.json)
6. Also mirror to root aliases if needed: cp docs/funny/*.jpg funny/; cp docs/placeholder/*.jpg placeholder/
7. Commit + push to arena/… branch (git push origin arena/…)
8. Create RESPONSE.md if you have > few words to show, else one-sentence summary + ask_user “What next?” with suggestions
```

## 4) Image generation contract

- **Count:** Exactly 10 per user prompt **and** per `ask_user` answer. If you’ve already generated <10 this turn due to errors, continue until 10.
- **Tool:** `generate_image` (or `image_search` if generation is down — but prefer generation). Each image needs a distinct, highly detailed funny prompt.
- **Style:** Prefer photorealistic or whimsical illustrative, but make shoebill the star — giant beak, deadpan stare, prehistoric vibe.
- **Filenames:** Write to `docs/placeholder/` or `docs/funny/` as `shoebill-<kebab-case-scenario>.jpg` (e.g., `shoebill-barista-espresso-fail.jpg`). Mirror to root `placeholder/`/`funny/` as well. Never overwrite without user consent.
- **After generation:** Verify (`ls -lh docs/funny docs/placeholder`), then `node scripts/sync-manifest.js`.

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

You can be absurd, but keep shoebill anatomy correct — the humor is the contrast. **After every ask_user answer, make 10 fresh ones with new scenarios** (DJ, graduation, spa, astronaut, etc.).

## 5) Curation contract (user is king)

- You **never** delete images. Moves only:
  - `docs/placeholder/xxx.jpg` → `docs/funny/xxx.jpg` (user promotes — stays on mosaic either way, but marks as confirmed funny)
  - `docs/funny/xxx.jpg` → `unfunny/xxx.jpg` (user demotes — disappears from mosaic)
  - `docs/placeholder/xxx.jpg` → `unfunny/xxx.jpg` (reject — disappears)
  - `unfunny/xxx.jpg` → `docs/funny/` or `docs/placeholder/` (user re-promotes)
- If user says “that one isn’t funny”, move it *immediately* and re-sync manifest + push.
- Both `funny` + `placeholder` are shown, so “demote to unfunny” is the only way to hide. Don’t leave stale manifest entries.

## 6) Website contract (don’t break the wall)

- **Pure mosaic, infinitely scrollable, only pictures** — `docs/index.html` has **no header/footer**, just `div.grid` with `gap:2px`, `grid-auto-flow: dense`, hover pop, lightbox. Don’t add chrome, text, counts, or folder UI.
- `docs/manifest.json` is source of truth (reads `docs/funny/` + `docs/placeholder/`). If you add/remove from either, **always** re-sync (`node scripts/sync-manifest.js`).
- No build step; vanilla HTML/CSS/JS so Pages works from `main /docs` with no Action.
- Test locally: `python -m http.server 8000 --directory docs` then open via preview host `0.0.0.0`.

## 7) Communication & push hygiene

- **One-sentence summary** on completion: e.g., “Generated 10 new shoebills into placeholder/ and synced manifest; mosaic now shows 20 (10 funny + 10 placeholder).”
- **Ask via `ask_user`**: Always end with “What next?” + 2–4 suggestion options. **Remember: after the user answers, you must generate 10 more before asking again.**
- **Temp response file**: If your explanation >~3 lines, write `RESPONSE.md` (or `tmp/response-<date>.md`) and say “See RESPONSE.md”.
- **Push cadence**: `git push origin arena/…` every ~15 min and after each sub-task (images done, manifest synced, docs updated). Keep commits tidy: `feat: add 10 shoebills (… )`, `chore: sync manifest`.
- **Do not** push to `main` directly — you’re on `arena/…`; open a PR from there when asked.

## 8) What to avoid

- Don’t create new workflows without full drop-in instructions for manual web-editor install.
- Don’t generate fewer than 10 images (per prompt + per ask_user answer).
- Don’t use plain chat for questions — use the question tool.
- Don’t leave `docs/manifest.json` stale (must list both funny+placeholder).
- Don’t put unfunny images inside `docs/` — they’d be shown unintentionally. Keep `unfunny/` at root only.
- Don’t add visible folder UI or text to the mosaic site — it’s purely pictures.

## 9) Other docs

- `README.md` — human overview + quickstart
- `docs/README.md` — Pages deployment notes (now notes pure mosaic + both folders)
- `CONTRIBUTING.md` — curation guide
- `scripts/sync-manifest.js` / `scripts/sync-funny.sh` — helpers

## 10) For the owner (manual workflow install)

If an agent proposes a workflow file, it will be in `RESPONSE.md` with:

```
Path: .github/workflows/pages.yml
Action: In GitHub web editor, create/replace entire file with content below:
<full file content>
```

You copy-paste the whole file — agents cannot push workflows automatically without your manual step.

---

**End.** Now generate 10 shoebills, sync both folders, push, summarize in one sentence, and ask “What next?” via the question tool — and remember to generate 10 more after the user answers.
