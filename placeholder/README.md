# placeholder

**Staging / limbo** — funny *enough for now*, but will be discarded later.

- For newly generated batches: agents put the 10 new images here first if their funniness is provisional.
- User later promotes survivors to `docs/funny/` (and they appear on the wall) or demotes to `unfunny/`.
- NOT shown on the website (outside `docs/` unless you also copy to `docs/placeholder/` — don't).
- Think of it as: `placeholder = funny pending review`.

Workflow:
1. Agent generates 10 images → `placeholder/` (or directly `docs/funny/` if user wants immediate wall).
2. User reviews → `placeholder/xxx.jpg` → `docs/funny/xxx.jpg` (promote) or `unfunny/xxx.jpg` (reject).
3. Agent updates `docs/manifest.json`.

See `agent.md`.
