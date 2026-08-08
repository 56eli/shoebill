# shoebill PR checklist

- [ ] I generated **exactly 10** new shoebill images this prompt **and** after every `ask_user` answer (if agent)
- [ ] Images are sorted correctly (folders are repo-only, not UI):
  - [ ] `docs/funny/` + `docs/placeholder/` — both **shown** as one pure mosaic
  - [ ] `unfunny/` (root, outside `docs`) — **never shown**, not deployed
  - [ ] `placeholder/` (root alias) mirrors `docs/placeholder/` — also shown
- [ ] `docs/manifest.json` synced (`node scripts/sync-manifest.js` reads both `funny`+`placeholder`)
- [ ] Wall is **pure mosaic, infinitely scrollable, only pictures** — no header/footer/chrome
- [ ] Wall tested locally (`python -m http.server 8000 --directory docs`)
- [ ] Hover pop + click lightbox still works
- [ ] One-sentence summary included
- [ ] Asked “What next?” via question tool with suggestions (if agent) — and will generate 10 more after answer
- [ ] No workflow changes, or if needed, provided **full file drop-in** instructions for manual web-editor install

ONLY THE USER decides what is funny. Initial 10 in `docs/funny/` are confirmed funny. When in doubt, put new batch in `docs/placeholder/` (still shown).
