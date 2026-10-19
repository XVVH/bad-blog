# Breathing Room: design journal

*Status: built in phase 3, new (not reworked from Haute, which retired). Awaiting the owner's review in the gallery.*

## Brief

- **Principles broken, and their sources:** two, both virtues of the smell overdone.
  - **White space.** *Refactoring UI* (Wathan & Schoger, 2018): start with too much white space, then remove it. Generous white space is also the deep smell's default answer (SMELL.md).
  - **Proportion of colour.** Johannes Itten's contrast of extension (*The Art of Color*, 1961): a strong colour needs a small area to balance a large area of a weak one. Interior design's 60-30-10 rule says the same: 60% a dominant neutral, 30% a secondary colour, 10% an accent. The smell follows it perfectly, with grey everywhere and one accent used sparingly.
- **The wrong rules:** never remove any white space; the loudest colour gets the most room, and emphasis is shown by taking colour away.
- **Axes:** structure (white space) and colour (proportion). Type follows the first rule: space between letters is white space too.
- **Costume check:** Haute was a luxury fashion site, and the obvious costume here is the same one: black, gold, a Didone wordmark, French. None of it is here. The second costume is "clean and minimal", the smell taken literally, which is why the "white" space is a loud orange. The third is the 2022 "dopamine décor" fashion for orange and pink; this combination is set at full strength over whole screens, with beige for everything that matters, which no trend has wanted.
- **Signature moves:**
  - one block per screen: every paragraph, heading, list, picture and code block is followed by most of a screen of empty orange
  - the post's title alone on its own screen, in tiny capitals tracked so wide the words come apart
  - a narrow column in the middle of a desktop screen, with the rest left empty
  - the page edge to edge in the loudest orange; quotes, code, tables and footnotes in a hot pink that doesn't go with it
  - everything important is greige: headings, links, the title, the current navigation, bold text, the keywords in code and More bad, as if the designer saved all their restraint for what matters
  - the thematic break is a whole extra screen of nothing
- **Every surface:**
  - **Home and lists:** one post per screen, each a tiny greige title in the middle of the orange.
  - **Tag list:** one tag per line, spaced half a screen apart.
  - **Rails and footer:** a screen each.
  - **404:** "Not found", alone, very small, after a long scroll.
  - **More bad:** greige, of course.
- **Rules it breaks:** see `rules_broken` in `assets/themes/breathing-room/theme.yaml`.
- **Legibility plan:**
  - Body text is Verdana at 16px (Verdana is large for its size), line height 1.75, on lines of about 30em, near-black `#1a1414` on orange `#ff6a00` (6.3:1) and on pink `#ff3fa4` (5.6:1).
  - Greige emphasis is near-black on `#c9bca9` (9.5:1).
  - Tiny tracked capitals are only in headings and chrome, and still at least 12px.
  - Only the space is absurd; nothing inside a block is hard to read.
- **Smell risks:** the highest of the new set, because white space *is* the smell. The loud colour is what keeps it from reading as minimal; if it ever looks calm, it's drifting.

## First instincts

- **A cream or white page with a single accent.** That's the smell, and Haute's first move. The whole point of the colour rule is that the empty space is the loudest thing on the page.
- **A hairline Didone or geometric sans** for the tracked capitals. That's the luxury costume again. Verdana is about as far from luxury as a typeface gets.
- **Fading things in as they scroll into view.** Haute did this. It's a luxury-site move, it adds nothing to the rule, and it's gone.

## Decisions

- **Fonts:** system only. Verdana, falling back to the device's sans-serif.
- **Space in `vh`**, so it's always most of a screen, whatever the screen.

## Log

- 2026-10-19: First version. The first draft spaced the masthead out too, a screen per item, which put the first word of the article about seven screens down. That tips from bad taste into making the reader work to find anything, so the chrome is now spaced within the first screen and the title gets the second to itself. From there on, every block still gets a screen. All tests pass.

## Open questions
