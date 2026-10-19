# The smell

The default look of AI-built websites: what a model produces when nobody steers it, and what this project exists to push against.

**Nothing that ships may carry it**: not the bad themes, not Not Bad, not the bar, not the 404 page. The only place it lives is `assets/themes/_control/`, the baseline that never ships (see [below](#the-control)).

If you are a model reading this: these are your defaults. Expect to reach for them, especially when you're "just getting something working". Catch yourself, and write it down in the theme's journal when you do.

## Surface smell

What you can see in a screenshot.

**Type**
- Inter, Geist or a system UI sans-serif for everything.
- Gradient-filled headline text.
- A small, uppercase, letterspaced "eyebrow" label above a headline.
- A tidy modular type scale.

**Colour**
- Slate or zinc greys with one indigo, violet or blue accent.
- Indigo-to-violet or blue-to-purple gradients.
- Dark mode as near-black slate with the same accent.
- Tailwind's default palette values, such as indigo-500 `#6366f1`, violet-500 `#8b5cf6` and slate-900 `#0f172a`.

**Shapes and surfaces**
- Rounded cards (12–16px radius) with soft drop shadows.
- Pill-shaped badges and buttons.
- Frosted glass (`backdrop-filter: blur`).
- Blurred colour blobs, or a faint dot or grid pattern behind the hero.
- Bento grids.

**Furniture**
- A centred hero: eyebrow, headline, subheading, two buttons (one filled, one outlined).
- A three-card feature grid with an icon on each card.
- Thin line icons (Lucide, Heroicons), or emoji as bullets (✨🚀💡).
- Testimonial cards, logo strips, FAQ accordions, "Get started" buttons.
- Code blocks in fake macOS window chrome with traffic-light dots.

## The editorial smell

A second default, which shows up when a model is asked for something "elegant", "warm" or "literary". It's the bigger risk for Not Bad.

- Cream or warm off-white paper (`#faf9f6`, `#f5f1e8` and friends).
- A display serif for headlines (Fraunces, Instrument Serif, Playfair Display, DM Serif Display) over an Inter or system sans body.
- One muted terracotta, rust or olive accent.
- Big italic serif pull quotes, thin rules, generous margins, small-caps eyebrow labels.

## The costume smell

A third default, which shows up when a model is asked for *bad* design. It's the one this project fell into first.

- **Retrieval:** recreating a style already known to be bad. GeoCities and "under construction" signs, Comic Sans and Papyrus, MySpace glitter, WordArt and clip art, the 2006 blog sidebar, Web 2.0 gloss and BETA badges, skeuomorphic leather, Y2K chrome, vaporwave, XTREME energy-drink angles.
- **Designer-bad:** the fashionable version. Web brutalism (raw HTML, system monospace, hard black borders), deconstructivist layouts after *Ray Gun* and Emigre, acid graphics, anti-design, maximalist collage. These break real principles, but expressively, and they're good taste now.
- **The tell:** you can name it. If a brief contains a decade, a product, a site or a genre, it's a costume.

The first launch set is the record. Four of its five themes were costumes: Under Construction (GeoCities), Sidebar Hell (2006 blogs), Office Suite (PowerPoint 2003) and Haute (luxury fashion sites). Only The Focus Group started somewhere else, from research. The pull didn't stop when the method changed. Drafting the principle shortlist, the first image for each candidate was still a reference: a ransom note for "never repeat a style", a 1960s psychedelic poster for equal-value colour, brutalist numerals for inverted hierarchy, Brat green for a page in one loud colour. Each is now named in its candidate's "Watch for".

The costume smell was named after the first launch set was built; its four costumes retired in phase 3 (DECISIONS.md D24a). The check is the costume test in [THEMES.md](THEMES.md#the-costume-test). The lint can't see it.

## Deep smell

What survives after the fonts and colours change. It's harder to see, and it's the main reason a "different" design can still smell.

- One spacing scale (multiples of 4 or 8px) applied everywhere, perfectly.
- One border radius everywhere.
- One accent colour, used sparingly and correctly.
- Everything centred, balanced, symmetric and aligned to a grid.
- Generous whitespace as the default answer.
- Secondary text in muted grey.
- A 150–200ms eased transition on every hover.
- Restraint: good taste applied evenly, nothing committed to.

A bad theme that keeps all of these is the smell in fancy dress. Inconsistency, misalignment, crowding, asymmetry and commitment are all available tools.

## Copy smell

Words carry it too: button labels, taglines, 404 pages, empty states.

- "Welcome to my little corner of the internet."
- "Thoughts on design, technology, and life."
- "Let's dive in." "Stay curious." "Crafted with ❤️."
- Emoji as punctuation, Title Case Everywhere, relentless friendliness.

## The control

`assets/themes/_control/` is a deliberately faithful rendition of the smell, kept for two reasons:

1. **Scaffolding.** It's the theme used to prove the build and theme pipeline work before any bad theme exists.
2. **Baseline.** Screenshot galleries show each bad theme beside the control, so the distance from the default is visible. That comparison is part of the experiment's record.

It is excluded from production builds. It never appears in the rotation, can't be selected with `?bad=`, and nothing may be copied from it into a theme or into Not Bad.

## Checking for the smell

- **Mechanical:** `scripts/lint-smell.mjs` (part of `npm run lint`) flags known surface tells in everything that ships. Rule ids:
  - `smell-font`: Inter, Geist or a system UI font as the first family
  - `tailwind-hex`: Tailwind default colours
  - `glass`: `backdrop-filter: blur`
  - `gradient-text`: gradient-clipped text
  - `emoji`: ✨🚀💡🎉👋
  - `pill`: `border-radius: 9999px`
  - `copy`: phrases from the copy smell

  A theme that uses one on purpose, for its own reasons, lists it in `theme.yaml` as `smell_exemptions: ["<rule-id>: <reason>"]`. The lint can't see the deep smell.
- **Costume:** the costume test in [THEMES.md](THEMES.md#the-costume-test), on the brief and on the first screenshots.
- **Human:** the owner reviews the screenshot gallery. That is the real test.
