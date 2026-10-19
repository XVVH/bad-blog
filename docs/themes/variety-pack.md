# Variety Pack: design journal

*Status: built in phase 3. Awaiting the owner's review in the gallery.*

## Brief

- **Principle broken, and its source:** consistency, and Max Wertheimer's law of similarity (1923): things of the same kind should look alike, so a reader can tell what kind of thing each one is. Design systems exist to enforce it, and it's the engine of the deep smell (one spacing scale, one radius, one accent).
- **The wrong rule:** never use the same style twice.
- **Axes:** structure (similarity) and type (consistency). Colour follows the same rule.
- **Costume check:** the costume of this principle is the ransom note, a different cut-out letter for every character. It was the first thing that came to mind, and it's on the ruled-out list. Variety Pack varies per block, never per letter, with no paper, tape or cut edges. It isn't Under Construction's more-is-more either: nothing is added, it's only inconsistent.
- **Signature moves:**
  - every paragraph has its own typeface, size, line spacing, colour, alignment, width, indent from the left, gap below, and now and then a tint, italics, bold or small capitals
  - each property cycles at a different prime length (alignment every 3 paragraphs, colour every 5, typeface every 7, size every 11, width and spacing every 13, extras every 17), so the combination doesn't repeat for 255,255 paragraphs
  - every heading is unlike every other heading, including others at the same level
  - each nesting level of a list has its own marker; each code block its own frame, corners, typeface and token colours
  - every CSS border style is used once, by a different kind of element
  - every link is underlined, but in five different ways: solid, double, dotted, dashed and wavy
  - pictures cropped to a different corner shape each
  - spacing from no scale at all: 3px, 7px, 13px, 41px, 58px
- **Every surface:**
  - **Home and lists:** every post looks as if it came from a different site.
  - **Tag list:** every tag styled differently.
  - **Rails:** each section its own box, colour, typeface and corners.
  - **404 and about:** the same rule.
  - **More bad:** a style nothing else on the page has.
- **Rules it breaks:** see `rules_broken` in `assets/themes/variety-pack/theme.yaml`.
- **Legibility plan:**
  - Every paragraph face is a text face that reads at length (Georgia, Verdana, Courier New, Trebuchet MS, Palatino, Tahoma, Times New Roman), at 16–22px, with line spacing of 1.4–1.9.
  - Every text colour is at least 7:1 on white, so it still passes AA on the paragraph tints.
  - The widest paragraph stays under about 85 characters. On phones the widths and offsets vary less, so no paragraph gets too narrow to read.
- **Smell risks:** low for the surface smell, since nothing here is consistent. The risk is the opposite: ending up as a tidy "eclectic" design with a secret system. The variety must look accidental.

## First instincts

- **A ransom note**, letter by letter. The costume version; ruled out before starting.
- **Cycling everything together**, so paragraph 1 always has face 1, colour 1 and size 1. That makes a visible pattern, which is a system. The prime lengths break it.
- **Keeping one "safe" body face and varying the rest.** That's consistency through the back door.

## Decisions

- **Fonts:** system faces only, each with a generic fallback. On devices without them (most phones), several paragraphs fall back to the same face; their size, colour, alignment and width still differ.
- **Cycles use `:nth-of-type()` for paragraphs and `:nth-child(… of .code)` for code blocks**, so each kind of element counts only its own kind.

## Log

- 2026-10-19: First version. All tests pass at the first attempt. In the gallery it reads less chaotic than the rule sounds, because most blocks still share the left edge. Worth the owner's eye: if it looks like a tidy "eclectic" design, the offsets need to grow.

## Open questions
