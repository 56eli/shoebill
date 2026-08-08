# shoebill PR checklist

- [ ] I generated **exactly 10** new shoebill images this prompt **and** after every `ask_user` answer (if agent), defaulting all new to `docs/funny/`
- [ ] Images sorted correctly (folders repo-only, not UI):
  - [ ] `docs/funny/` (+ mirror `funny/` root) — **shown** as pure mosaic (default for all new, placeholder deleted 2026-08-08)
  - [ ] `unfunny/` (root, outside `docs`) — **never shown**, not deployed; user manually moves here to hide
  - [ ] `placeholder/` — **deleted**, not used
- [ ] `docs/manifest.json` synced (`node scripts/sync-manifest.js` reads `docs/funny/` only)
- [ ] Wall is **pure mosaic, infinitely scrollable, only pictures** — no header/footer/chrome, hover pop + lightbox works
- [ ] Wall tested locally (`python -m http.server 8000 --directory docs`)
- [ ] One-sentence summary included
- [ ] Asked “What next?” via question tool with suggestions (if agent) — and will generate 10 more after answer
- [ ] No workflow changes, or if needed, provided **full file drop-in** instructions for manual web-editor install

ONLY THE USER decides what is funny. All current 30 in `docs/funny/` confirmed funny. When in doubt, default to `docs/funny/` — user will manually demote to `unfunny/` at will.
