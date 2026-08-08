# shoebill PR checklist

- [ ] I generated **exactly 10** new shoebill images this prompt (if agent)
- [ ] Images are sorted correctly:
  - [ ] `docs/funny/` — only funny (shown on wall)
  - [ ] `unfunny/` — not funny (archived)
  - [ ] `placeholder/` — funny enough for now
- [ ] `docs/manifest.json` synced (`node scripts/sync-manifest.js`)
- [ ] Wall tested locally (`python -m http.server 8000 --directory docs`)
- [ ] Hover pop + click lightbox still works
- [ ] One-sentence summary included
- [ ] Asked “What next?” via question tool with suggestions (if agent)
- [ ] No workflow changes, or if needed, provided **full file drop-in** instructions for manual web-editor install

ONLY THE USER decides what is funny. When in doubt, put new batch in `placeholder/` and let user promote.
