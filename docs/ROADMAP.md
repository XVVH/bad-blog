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

Reviewed in part: Sidebar Hell was a miss (it reads as an ordinary 2006 blog), which led to D23 below.

## Phase 2: complete the launch set and launch

- [x] Haute
- [x] Office Suite
- [x] Spin animation, View Transitions, the theme index in Not Bad (`/designs/`)
- [x] Per-post `bad:` opt-out (built in phase 0)
- [x] Smell lint
- [x] Floor tests for animations (five seconds) and overlapping content
- [ ] The owner reviews Haute and Office Suite in the gallery
- [ ] Launch: retire the music library site and move `synchromeshi.com` to the blog (see D19 in DECISIONS.md)

## Phase 3: principle-first themes

October 2026. Four of the five launch themes turned out to be costumes, recreations of things that already existed, and irony has made that kind of bad look good. Themes now start from a broken design principle (D23), and the owner picks a new launch set (D24).

- [x] Rewrite the method around principles: INTENT.md, the costume test and principles to break in THEMES.md, RULES.md tier 3, the costume smell in SMELL.md, D23 and D24
- [x] A shortlist of principle-based candidates (THEMES.md)
- [x] The owner picks the new launch set (D24a): Keep Your Distance, The Small Print, Variety Pack, Vibrant, Breathing Room (with Pop of Colour) and The Focus Group
- [x] Build the picks, each from its journal
- [x] Haute retires; Breathing Room is built new
- [x] Retire Under Construction, Sidebar Hell, Office Suite and Haute (their code stays in git history)
- [x] A new home for the visible hit counter: The Small Print, enormous
- [x] Ship it: one production deploy, with the hidden live-region fix from the same branch (October 2026)
- [ ] The owner reviews the new set live, including The Focus Group

## Phase 4 and beyond

- [ ] Fully Justified, with the owner's narrow-slice twist (THEMES.md)
- [ ] More principle themes (THEMES.md, "More principles")
- [ ] Relaxed legibility for chosen themes (the owner's call)
- [ ] Chaos Mode
- [ ] Generated (and suitably bad) social preview images

## Before launch (the owner)

- Create a Netlify site from this repository. Netlify reads `netlify.toml`; no other settings are needed.
- Approve or change Not Bad (`docs/themes/not-bad.md`).
- Write the about page (`content/about.md`) and the site description (`params.description` in `config/_default/hugo.toml`).
- Retire the music library site and move `synchromeshi.com` to the blog.

## Open questions

For the owner:

- **The top bar** is pinned: the owner is considering reworking it. That includes whether Less bad stays a standard green exit sign, or More bad and Less bad become a matched pair styled by each theme, with the floor locking position, labels, size, contrast and equal weight.
- **The new set** needs the owner's review in the gallery. Each journal's open questions list what to look at; The Small Print's is whether big serif type is still too handsome.
- **The top bar rework** and the new themes may affect each other, since More bad is themeable.

- Not Bad: typeface, first-line indents, dot leaders (`docs/themes/not-bad.md`).

Answered (October 2026): the name (D5a), the escape note copy (D9), the music library site (D19), device preferences (D14b), The Focus Group's citations (D14a), how themes are made (D23), the new launch set and Haute (D24a), Sidebar Hell (retired, D24a), the visible hit counter (The Small Print, D20).
