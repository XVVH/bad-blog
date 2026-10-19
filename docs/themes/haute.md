# Haute: design journal

*Status: built in phase 2 and live. **A costume around a real mechanism** (D23): it recreates luxury fashion sites, but its badness comes from a principle, too much white space. Rework it as Breathing Room (THEMES.md), keep it or retire it: the owner's call (D24).*

## Brief

- **Failure of taste:** pretension mistaken for elegance. The "too little" counterweight to the other themes: so much restraint that reading becomes a performance.
- **Real-world references:** luxury fashion house websites and design-award showcase sites. Black pages, a Didone wordmark, hairline geometric sans in wide-tracked capitals, a lone gold rule, enormous emptiness, numbered "collections", plates in black and white, things that fade in as you scroll.
- **Axes:** type, structure.
- **Signature moves:**
  - a "MAISON" wordmark in Bodoni capitals
  - everything in the chrome in 11px capitals tracked to absurdity
  - the post's date as giant hairline numerals (17·10·2026) taking up most of the screen
  - one paragraph per screen
  - section headings numbered in Roman numerals
  - images as full-width black-and-white "plates" (PLATE I, PLATE II)
  - quotes set in tiny tracked capitals, not big italics
  - the home page as "La Collection", one post per screen with "N° 01"
  - pictures and rules fading in as they scroll into view
- **Every surface:**
  - **Code:** hairline gold monospace, shades of gold and bone only.
  - **Tables:** hairline gold rules with tracked-capital headers.
  - **Links:** bone, with a hairline gold underline set far below the text.
  - **More bad:** tracked gold capitals.
- **Rules it breaks:** see `rules_broken` in the theme's `theme.yaml`.
- **Legibility plan:**
  - Body text is Jost at 19px, weight 350, bone (`#e6e0d4`) on black (about 15:1), line height 1.7, lines of about 65 characters.
  - The absurd tracking, tiny capitals and hairlines are only in the chrome and headings.
  - The fade-in applies only to pictures and rules, never to text, never to what's on screen when the theme starts, and not at all under reduced motion.
- **Smell risks:** the highest of the set. Whitespace and restraint are deep smell, and luxury is a common "elevated" AI look. Haute has to overshoot into absurdity: a whole screen for a date, a whole screen per paragraph, capitals tracked so wide they fall apart. It must never land on "clean and minimal". It avoids the editorial smell's tells: no cream, no Playfair or Fraunces, no big italic pull quotes.

## First instincts

- **Cormorant or Playfair for headings, over a sans.** That's the editorial smell, the default "luxury" pairing. Replaced with Bodoni Moda (a true Didone, as on fashion mastheads) for the wordmark and date only, and Jost (a Futura-like geometric) for everything else.
- **A gracious grid with balanced whitespace.** That's just good taste. Replaced with whitespace past the point of use: 45vh between paragraphs, a screen per post on the home page, a date that fills the viewport.
- **Cropping images to dramatic 90vh full-bleed plates.** It would hide part of every image, and RULES.md forbids hidden content. The plates run full width and keep their whole frame, in black and white.

## Decisions

- **Fonts:** Jost (roman and italic) and Bodoni Moda (roman), OFL, self-hosted, about 83KB together.
- **The fade-in** (`theme.js`) uses an IntersectionObserver, on pictures and rules only. Elements already on screen when the theme starts are never hidden. It's off under reduced motion, and removed completely on deactivate.
- **French, sparingly** ("Maison", "La Collection"), because nothing says pretension like a language the reader didn't ask for.

## Log

- 2026-10-18: First version. At a glance it's genuinely handsome; the badness only shows in use, scrolling a screen per paragraph and hunting for a title set in 12px capitals under a date the size of a door. **Question for the owner:** is that bad enough, or should it look worse at first sight too?
- 2026-10-18: The first fade-in faded paragraphs too. axe flagged every waiting paragraph for contrast, and it was right: if the observer ever misfired, the words would stay invisible. Now only pictures and rules fade. Quotes, tables and footnotes moved up to 16px (tier 2 covers all article text, not just the first paragraph).
- 2026-10-19: **Costume test.** A reader could name it ("a fashion house site"), so it's a costume: the Bodoni wordmark, black and gold, "Maison", the plates. But what makes it bad in use, a screen per paragraph and capitals tracked apart, is a broken principle that doesn't need the costume. The shortlist's Breathing Room keeps that and drops the rest, with a loud palette so it can't read as "clean and minimal". This also answers the open question below differently: the problem wasn't that it was too handsome, but that the handsome part was borrowed.

## Open questions

- Bad enough at first sight? (See the log.)
