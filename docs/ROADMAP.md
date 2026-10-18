# Roadmap

Update this as work lands. Tick boxes; don't delete history.

## Phase 0: plumbing

The blog works, and is good, before anything is bad.

- [ ] Hugo setup: pinned version, works under a subpath
- [ ] Content model: page bundles, front matter
- [ ] Render hooks: links (resolve, and fail the build if broken), images, headings; Chroma with classes
- [ ] The markup contract and shared layout primitives
- [ ] The `_floor` layer (tier 1 of RULES.md)
- [ ] The `_control` theme (scaffold and baseline; dev-only)
- [ ] Not Bad (propose the design to the owner first)
- [ ] Browser side: head script, bar, More bad deck, Less bad escape and note, keeping the reader's place, persistence
- [ ] The kitchen-sink post
- [ ] CI: Playwright and axe matrix; screenshot gallery with the `_control` baseline
- [ ] `netlify.toml`: Hugo version, headers, cache rules
- [ ] Hit counter: function and Blobs store

## Phase 1: the first three bad themes

Chosen for different axes, to stress the markup contract.

- [ ] Under Construction (graphics, type), including the visible hit counter
- [ ] Sidebar Hell (structure)
- [ ] The Focus Group (palette, research)

## Phase 2: complete the launch set and launch

- [ ] Haute
- [ ] Office Suite
- [ ] Spin animation, View Transitions, the theme index in Not Bad
- [ ] Per-post `bad:` opt-out
- [ ] Smell lint
- [ ] Launch: move the domain (see D19 in DECISIONS.md)

## Phase 3 and beyond

- [ ] Backlog themes
- [ ] Relaxed legibility for chosen themes (the owner's call)
- [ ] Chaos Mode
- [ ] Generated (and suitably bad) social preview images

## Open questions

For the owner:

- The site's name.
- The escape note's copy.
- The music library site: move it to a subdomain, or retire it?
- Should `prefers-contrast: more` start readers in Not Bad?
- Do The Focus Group's in-page citations count as explaining the joke? (See THEMES.md.)
