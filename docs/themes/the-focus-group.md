# The Focus Group: design journal

*Status: built in phase 1. Awaiting the owner's review in the gallery.*

## Brief

- **Failure of taste:** design by survey. Every choice is what research says people like least, assembled by a committee with total confidence and no eye.
- **Real-world references:** the studies, in place of a site or era:
  - **Pantone 448C**, "drab dark brown". A 2012 GfK Bluemoon study for the Australian government found it the least appealing colour, and it went on plain cigarette packaging.
  - **Palmer & Schloss (2010)**, "An ecological valence theory of human color preference" (*PNAS*). People dislike colours linked with things they dislike; browns and dark yellows (olives) come out near the bottom.
  - **Komar & Melamid, *The People's Choice* (1994–97).** Paintings made from opinion polls. The "Most Unwanted" ones came out small, abstract, angular and warm-toned.
  - **Tuch et al. (2012).** High visual complexity and low prototypicality (an unfamiliar layout) make a site look less attractive within 50 milliseconds.
  - **Reinecke & Gajos (2014).** How colourfulness and complexity change how appealing a site looks.
  - **Shaikh, Chaparro & Fox (2006).** People describe monospaced type as plain and dull.
- **Axes:** palette, structure, graphics. It belongs to no era.
- **Signature moves:**
  - the whole page in 448C, with dark-yellow hatching and olive panels
  - a small, angular, warm abstract after Komar & Melamid, hung crooked by the title
  - angular shards in the margins
  - the site name running vertically up the left edge, navigation in a column on the right, the tagline in a box above the article
  - headings right-aligned
  - a different border style on every kind of block (double, ridge, groove, dashed, dotted)
  - body text in Courier New
  - no blue anywhere, because blue is what everyone likes
- **Every surface:**
  - **Post:** the brown panel with a double olive border.
  - **Code:** dashed orange frame, survey-unloved token colours that still pass contrast.
  - **Tables:** double borders and alternating olive rows.
  - **Images:** a deep maroon groove.
  - **Home:** posts staggered at different indents.
  - **More bad:** an orange shard.
- **Rules it breaks:** see `rules_broken` in the theme's `theme.yaml`. The research is cited only there, so only the escape note sees it (D14a).
- **Legibility plan:**
  - Body text is cream (`#ece3c4`) on 448C (`#4a412a`), about 8:1.
  - Courier New is set at 18px with line height 1.55 and lines of about 70 characters.
  - Headings are large enough for the 3:1 large-text contrast threshold.
  - The hatching and shards are only in the margins, never behind text.
- **Smell risks:** "earthy and warm" is close to the editorial smell (SMELL.md). The difference is commitment. No cream paper, no tasteful terracotta accent, no restraint. The drab brown fills everything and the garish accents fight it.

## First instincts

- **Make the research visible:** a footnote on every choice, "(Palmer & Schloss, 2010)". Charming, but it explains the joke. The owner ruled it out (D14a).
- **An earthy, tasteful palette:** olive, rust, cream, in balance. That's the editorial smell with a brown filter. Replaced with 448C everywhere, plus the least harmonious accents I could justify (orange, mustard, maroon, teal, peach) fighting for attention.
- **A recognisable layout with odd colours.** Tuch et al. say the unfamiliar layout matters as much as the clutter, so the structure moved too: vertical name, navigation on the right, staggered list, right-aligned headings.

## Decisions

- **Courier New** is a system font; no download. The monospace choice is the research-backed "plain and dull".
- **The painting** (`img/unwanted.svg`) is drawn for this project, after the idea of Komar & Melamid's "Most Unwanted", not a copy of any painting.
- **The shards** are `.deco` spans clipped into triangles and kept inside the page's own bounds, so they never cause sideways scrolling.

## Log

- 2026-10-18: First version. On first look it read as a stylish, earthy zine: Impact headings, a cool vertical name with a drop shadow, a tidy hatch. That's designer-bad, and close to the editorial smell. Made it clunkier: the name in a gradient label with a dotted border and a teal outline, office-carpet dots over the hatching, and every paragraph flagged with a different coloured bar "to improve engagement".
- 2026-10-18: Fixed a contrast failure in the post navigation (mustard on olive); its panel is now dark brown. All floor, legibility and accessibility tests pass.

## Open questions
