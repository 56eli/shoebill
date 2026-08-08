# agent.md — instructions for all AI agents (Arena sandbox)

> **If you are an AI agent working on `56eli/shoebill`, read this ENTIRE file first. You must obey it every prompt. The human (owner) is the only judge of funny.**

## 0) One-sentence summary

This repo is a GitHub Pages site (`main`/`docs`) that shows a wall of **only funny shoebill stork images**; you must generate **exactly 10** creative shoebill images per prompt, sort them into `funny` / `unfunny` / `placeholder`, and keep `docs/funny` + `docs/manifest.json` in sync — then push and ask “What next?” via the *question* tool.

---

## 1) Project idea

- **GitHub Pages** is deployed from `main` → `/docs` (Settings → Pages → Source: Deploy from a branch → `main` / `docs`). No Actions required.
- `/docs` is **exclusively** the wall. It contains `index.html`, `style.css`, `script.js`, `manifest.json`, and `funny/` — nothing unfunny is linked on the site.
- The wall is a responsive grid: **hover pops a little** (`translateY(-6px) scale(1.025)` + shadow), **click opens full** in a lightbox (ESC / click outside to close).
- All site files live in `docs/` so Pages can serve them with no build step.

## 2) Golden rules (from the owner — never break)

1. **ALWAYS generate 10 images per prompt.** The tool allows up to 10 per turn — you ALWAYS create 10 funny shoebill images, even if the user didn’t ask. No exceptions. If you hit a tool limit, make a second turn and finish the 10. Be *very* creative and *very* detailed in prompts (scenario + mood + lighting + camera + shoebill expression).
2. **ONLY THE USER decides what is funny.** You may make a provisional guess for initial placement, but the user’s word is final. Never argue, never keep an image in `funny` after the user says it’s not funny. Move it immediately to `unfunny/` (or `placeholder/` if instructed).
3. **Folder contract (never mix):**
   - `docs/funny/` — **canonical funny wall**. Every image here appears on the site (via `docs/manifest.json`). This *is* the `funny` folder for Pages. Keep `funny/` (root alias) in sync if you use it.
   - `unfunny/` (repo root) — images judged *not funny*. Never shown on the wall, never deployed. Never delete — archive.
   - `placeholder/` (repo root) — *funny enough for now, but will be discarded later*. Staging/limbo for new batches pending user review.
   - Root `funny/` — alias/mirror of `docs/funny/` for the spec’s “top-level `funny` folder” requirement. Canonical for deployment is `docs/funny/`; if you write to root `funny/`, also copy to `docs/funny/` and re-sync manifest.
4. **Creativity:** Shoebills in absurd human jobs, hobbies, costumes, physics-defying situations. Detailed prompts win: `“photorealistic shoebill stork wearing an oversized sushi-chef bandana, giant beak precariously balancing a salmon nigiri, tiny kitchen, steam, deadpan stare, 85mm, shallow depth”` beats `“funny shoebill”`.
5. **Communication:**
   - When you need to talk to the user, **use the `ask_user` question tool**, not plain chat. Minimal phrase: **“What next?”** — plus optional suggestions.
   - After finishing a task, **provide a one-sentence summary** (so the user doesn’t waste a prompt asking “what happened?”).
   - **Always end with questions/suggestions** for what to do next (e.g., “Promote any placeholders? Another batch of 10? Change theme?”).
   - If you need to present more than a few words, **create a temporary response file** (e.g., `RESPONSE.md` or `docs/_tmp.md`) and tell the user to read it — don’t flood chat.
6. **Persistence:** You are sandboxed; **session expires on PR merge**. **Push every ~15 minutes and on every sub-task completion** to `arena/<id>` branch to safeguard against GitHub access loss. Keep pushes clean — squash/fix docs before push, no large unrelated blobs.
7. **Workflows:** All workflow changes (`/.github/workflows/**`) must be **manually implemented by the owner via the GitHub web editor with a full file drop-in replacement**. **Avoid this as much as possible.** Don’t add Actions unless absolutely required; prefer no-build static (current site needs none). If you *must* propose a workflow, provide the **entire file content** in a response file with exact path + “copy-paste replace entire file” instructions.
8. **Keep documentation clean and updated on every push.** If you add images, update `docs/manifest.json` (or run `node scripts/sync-manifest.js`).

## 3) Startup checklist (every agent, every prompt)

```
1. Read agent.md (this file), README.md, docs/README.md
2. Check git status / branch (you are on arena/… — never switch to another branch)
3. Generate 10 images (see §4) — no prompt needed
4. Place them per §2.3 (default: new batch → placeholder/ or docs/funny/ if clearly funny)
5. Run node scripts/sync-manifest.js  (or manually edit docs/manifest.json to list docs/funny/*)
6. Commit + push to arena/… branch (git push origin arena/…)
7. Create RESPONSE.md if you have > few words to show, else one-sentence summary + ask_user “What next?” with suggestions
```

## 4) Image generation contract

- **Count:** Exactly 10 per user prompt / per agent session turn. If you’ve already generated <10 this turn due to errors, continue until 10.
- **Tool:** `generate_image` (or `image_search` if generation is down — but prefer generation). Each image needs a distinct, highly detailed funny prompt.
- **Style:** Prefer photorealistic or whimsical illustrative, but make shoebill the star — giant beak, deadpan stare, prehistoric vibe.
- **Filenames:** Write to `placeholder/` or `docs/funny/` as `shoebill-<kebab-case-scenario>.jpg` (e.g., `shoebill-barista-espresso-fail.jpg`). Never overwrite without user consent.
- **After generation:** Verify files exist (`ls -lh`), then sync manifest.

**Example 10 creative prompts (rotate, never repeat exactly):**

1.shoebill as tiny office manager in ill-fitting suit, holding clipboard, reviewing flamingos — deadpan stare, fluorescent office, shallow DOF
2. shoebill sushi chef with bandana, beak balancing salmon nigiri, chaotic kitchen, steam, fish looking alarmed
3. shoebill wobbling on child’s bicycle, helmet too small, feathers ruffled, suburban street, motion blur
4. shoebill in bubble bath with rubber ducks, shower cap, stare at camera, bathroom tiles, photorealistic
5. shoebill noir detective in trench coat, magnifying glass over a frog suspect, rain, neon, cinematic
6. shoebill doing yoga tree-pose on lily pad, other birds watching confused, sunset swamp
7. shoebill barista failing at latte art, espresso machine sputtering, café, morning light
8. shoebill at beach with flamingo float, sunglasses, sunscreen stripe on beak, tropical
9. shoebill librarian shushing, beak wide, books tumbling, dusty library, dramatic light
10. shoebill taking selfie with phone in wing, duck-face, awkward angle, swamp selfie stick

You can be absurd, but keep shoebill anatomy correct — the humor is the contrast.

## 5) Curation contract (user is king)

- You **never** delete images. Moves only:
  - `placeholder/xxx.jpg` → `docs/funny/xxx.jpg` (user promotes)
  - `docs/funny/xxx.jpg` → `unfunny/xxx.jpg` (user demotes)
  - `placeholder/xxx.jpg` → `unfunny/xxx.jpg` (reject)
  - Anything → `placeholder/` (user says “keep but not yet funny”)
- If user says “that one isn’t funny”, move it *immediately* and re-sync manifest + push.
- If user hasn’t reviewed yet, leave new batch in `placeholder/` — don’t auto-promote without signal, unless the batch was clearly meant for the wall.

## 6) Website contract (don’t break the wall)

- Don’t add unfunny images to `docs/funny/` or `docs/manifest.json`.
- `docs/manifest.json` is the source of truth for the grid. `docs/script.js` loads it. If you add/remove from `docs/funny/`, **always** update the manifest (run `node scripts/sync-manifest.js`).
- No build step; keep site vanilla HTML/CSS/JS so Pages works from `main /docs` with no Action.
- Test locally: `python -m http.server 8000 --directory docs` then open via preview host `0.0.0.0` (Arena proxy checks host allowlist).

## 7) Communication & push hygiene

- **One-sentence summary** on completion: e.g., “Generated 10 new shoebills into placeholder/ and synced manifest; wall now shows 20 funny shoebills.”
- **Ask via `ask_user`**: Always end with “What next?” + 2–4 suggestion options (e.g., “Promote placeholders? Generate another 10 with theme X? Tweak hover effect?”).
- **Temp response file**: If your explanation >~3 lines, write `RESPONSE.md` (or `tmp/response-<date>.md`) and say “See RESPONSE.md”.
- **Push cadence**: `git push origin arena/…` every ~15 min and after each sub-task (images done, manifest synced, docs updated). Keep commits tidy: `feat: add 10 shoebills (beach/detective theme)`, `chore: sync manifest`.
- **Do not** push to `main` directly — you’re on `arena/…`; open a PR from there when asked.

## 8) What to avoid

- Don’t create new workflows without full drop-in instructions for manual web-editor install.
- Don’t generate fewer than 10 images because you think the user didn’t ask — they did, implicitly.
- Don’t use plain chat for questions — use the question tool.
- Don’t leave `docs/manifest.json` stale.
- Don’t put unfunny/placeholder images inside `docs/` where they’d be deployed unintentionally (except `docs/funny`).

## 9) Other docs

- `README.md` — human overview + quickstart
- `docs/README.md` — Pages deployment notes
- `CONTRIBUTING.md` — contributor curation guide
- `scripts/sync-manifest.js` / `scripts/sync-funny.sh` — helpers

## 10) For the owner (manual workflow install)

If an agent proposes a workflow file, it will be in `RESPONSE.md` with a block like:

```
Path: .github/workflows/pages.yml
Action: In GitHub web editor, create/replace entire file with content below:
<full file content>
```

You copy-paste the whole file — agents cannot push workflows automatically without your manual step.

---

**End.** Now generate 10 shoebills, sync, push, summarize in one sentence, and ask “What next?” via the question tool.
