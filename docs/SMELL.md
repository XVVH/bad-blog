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

- **Mechanical:** a smell lint (planned) flags known tells in shipped CSS and templates: smell fonts as primary families, Tailwind default hex values, `backdrop-filter: blur`, gradient-clipped text, emoji bullets. A theme that uses one on purpose, for its own reasons, declares it in `theme.yaml` with the reason.
- **Human:** the owner reviews the screenshot gallery. That is the real test.
