# Keep Your Distance: design journal

*Status: built in phase 3. Awaiting the owner's review in the gallery.*

## Brief

- **Principle broken, and its source:** proximity and similarity, the first of Max Wertheimer's laws of grouping (1923), with Stephen Palmer's common region (1992). Things close together, things that look alike, and things inside one boundary are seen as belonging together.
- **The wrong rule:** things that belong together are kept apart, in space and in style; things that don't are brought together.
- **Axes:** structure (proximity, common region), with colour and type decided by the same rule (similarity).
- **Costume check:** there's nothing for it to imitate; no site was ever laid out like this on purpose. Two things came to mind and were dropped (see First instincts): airy Swiss-style asymmetric layouts, and the landing page's alternating section bands.
- **Signature moves:**
  - the space between two things grows with how closely they're related: lines in a paragraph are far apart, paragraphs closer, and a section's last line is glued to the next heading
  - every heading sits tight under the end of the previous section, then half a screen of space before the text it introduces
  - sections alternate between two colour bands and two typefaces, and each heading wears the band and face of the section *before* it, so the colour boundary falls just before the first paragraph of each section
  - each band's text is set in the other band's colour family
  - a caption sits half a screen below its picture, glued to the next paragraph and dressed like it
  - list markers stand far from their items; list items are spaced like sections
  - table cells in a row are spread apart, while the rows touch
  - underlines drift down toward the next line
  - the post title is dressed like the navigation and glued under it, far from its own date and tags
- **Every surface:**
  - **Home and lists:** each post's title, date and summary are spread apart, and the summary is glued to the next post's title.
  - **Tag list:** each tag's count stands apart from it and against the next tag.
  - **Code:** the language label is far above its code and glued to the paragraph before; code lines are as loosely spaced as text.
  - **Footnotes:** numbers far from their notes.
  - **Rails and footer:** the same rule; each rail heading is glued to the list before it.
  - **404:** the same treatment.
  - **More bad:** dressed like the site navigation, which it has nothing to do with.
- **Rules it breaks:** see `rules_broken` in `assets/themes/keep-your-distance/theme.yaml`.
- **Legibility plan:**
  - Body text is 18px with line height 2.1, so spacing only ever goes up, on about 34em lines.
  - Band A is pale khaki with dark blue ink; band B is pale blue with dark brown ink. Both pass AA comfortably (over 9:1).
  - Nothing inside a block is hidden or squeezed. Every word is easy to read; it's what goes with what that keeps going wrong.
- **Smell risks:** the deep smell's "generous whitespace" is nearby, because this theme uses a lot of space. The difference is that the space is in the wrong places, unevenly. Alternating section bands are a landing-page trope; here they're misaligned with their headings, which no landing page would do. Its colours mustn't drift into tasteful pastels.

## First instincts

- **Big, calm gaps, carefully proportioned.** That's Swiss asymmetric layout, and designer-good. The gaps here are wrong, not elegant: the biggest one sits between a heading and its own text.
- **Alternating full-width section bands,** like a landing page. Kept the idea of bands, because they make Palmer's common region visible, but pinned them to the wrong boundaries, inside the article column only.
- **Headings set apart from both neighbours.** That's merely neutral. The rule says a heading belongs with what follows, so it has to be pushed away from that and pulled toward what came before.

## Decisions

- **Fonts:** system only. Band A in Palatino (Palatino Linotype, Book Antiqua, then the device's serif); band B in Tahoma (then Verdana, then the device's sans-serif).
- **Sections without wrappers:** the markup has no `<section>` per heading, so the bands come from sibling selectors: everything after the *k*th `h2` takes section *k*'s band, for up to 16 sections, and a later rule wins. The *k*th `h2` itself only follows heading *k*−1, so it takes the previous section's band automatically. No markup change was needed.
- **Spacing as padding:** inside the article, the gaps are padding rather than margin, so a band's colour runs unbroken through the gaps that belong to it.

## Log

- 2026-10-19: First version. The first draft put the post's date and tags far below the title, then far above the article, which pushed the first band below the first screen on desktop. By the rule, the tags and the article aren't related, so the tags are now glued to the first paragraph, and the first band shows at the bottom of the first screen. Headings had em-based padding and sat indented from the text; fixed. All tests pass.

## Open questions
