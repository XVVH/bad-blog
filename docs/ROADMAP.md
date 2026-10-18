# Roadmap

Update this as work lands. Tick boxes; don't delete history.

## Phase 0: plumbing

The blog works, and is good, before anything is bad.

- [x] Hugo setup: pinned version (0.167.0), works under a subpath
- [x] Content model: page bundles, front matter, fixture posts in development only
- [x] Render hooks: links (resolve, and fail the build if broken), images, headings, code blocks, tables; Chroma with classes
- [x] The markup contract and shared layout primitives
- [x] The `_floor` layer (tier 1 of RULES.md)
- [x] The `_control` theme (scaffold and baseline; dev-only)
- [x] Not Bad, as a proposal for the owner (see `docs/themes/not-bad.md`)
- [x] Browser side: head script, bar, More bad deck, Less bad escape and note, keeping the reader's place, persistence, blocked-storage fallback, printing
- [x] The kitchen-sink post
- [x] CI: theme lint, unit tests, production checks, Playwright and axe matrix, screenshot gallery with the `_control` baseline
- [x] `netlify.toml` and the generated `_headers`: Hugo version, build commands, CSP with the boot script's hash, cache rules
- [x] Hit counter: function and Blobs store
- [ ] Connect the repository to Netlify (the owner; see "Before launch" below)

## Phase 1: the first three bad themes

Chosen for different axes, to stress the markup contract.

- [x] Under Construction (graphics, type), including the visible hit counter
- [x] Sidebar Hell (structure)
- [x] The Focus Group (palette, research)
- [ ] The owner reviews all three in the gallery

## Phase 2: complete the launch set and launch

- [x] Haute
- [x] Office Suite
- [x] Spin animation, View Transitions, the theme index in Not Bad (`/designs/`)
- [x] Per-post `bad:` opt-out (built in phase 0)
- [x] Smell lint
- [x] Floor tests for animations (five seconds) and overlapping content
- [ ] The owner reviews Haute and Office Suite in the gallery
- [ ] Launch: retire the music library site and move `synchromeshi.com` to the blog (see D19 in DECISIONS.md)

## Phase 3 and beyond

- [ ] Backlog themes
- [ ] Relaxed legibility for chosen themes (the owner's call)
- [ ] Chaos Mode
- [ ] Generated (and suitably bad) social preview images

## Before launch (the owner)

- Create a Netlify site from this repository. Netlify reads `netlify.toml`; no other settings are needed.
- Approve or change Not Bad (`docs/themes/not-bad.md`).
- Write the about page (`content/about.md`) and the site description (`params.description` in `config/_default/hugo.toml`).
- Retire the music library site and move `synchromeshi.com` to the blog.

## Open questions

For the owner, from the theme journals:

- Not Bad: typeface, first-line indents, dot leaders (`docs/themes/not-bad.md`).
- Haute: handsome at first sight, bad only in use. Bad enough? (`docs/themes/haute.md`)

Answered (October 2026): the name (D5a), the escape note copy (D9), the music library site (D19), device preferences (D14b), The Focus Group's citations (D14a).
