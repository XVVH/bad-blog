# Themes

## How to make a theme

A theme starts from a **design principle**, broken on purpose. It never starts from a reference: not an era, a site, a program or a genre (DECISIONS.md D23).

1. **Pick a principle with a source:** a law of perception, a rule of typography, a theory of colour, a study. [Principles to break](#principles-to-break) is a starter list. Never just "make it ugly", and never "make it look like X".
2. **Write the wrong rule** in one sentence: the principle inverted or misapplied. For example, "the more two things belong together, the further apart they go". The theme is that rule, applied faithfully on every surface by a designer who believes it.
3. **Derive every surface from the rule:** post, home, tag list, about, 404, code blocks, images, links, footnotes and the More bad button. If the rule says nothing about a surface, find what it would say, or leave the surface plain. Decoration that doesn't come from the rule is a costume creeping back in.
   - One principle may not fill a theme. Its palette and type still need choosing, and they can't be the smell or Not Bad's. Let the same wrong rule decide them, or pair it with a second principle from another axis, and say which in the journal.
4. **Run the [costume test](#the-costume-test)** on the brief, and again on the first screenshots.
5. **Write the journal first**, as `docs/themes/<id>.md` from [`themes/_TEMPLATE.md`](themes/_TEMPLATE.md), then build.
6. **Check it** against [SMELL.md](SMELL.md) and [RULES.md](RULES.md), run the tests, and look at the gallery beside `_control`.
7. **Record** what you were tempted to do and didn't, especially every reference you reached for.

The escape note's rules-broken list (`rules_broken` in `theme.yaml`) names the principle, its source and what the theme did to it, in a sentence or two each. It's the reader's reward for escaping, so it should make the joke land.

### The costume test

A **costume** is a theme built by recreating something: GeoCities, a 2006 blog, PowerPoint 2003, a luxury fashion house. Costumes fail twice over:

- **They're retrieval, not design.** Every reference already exists, built as it existed. Recreating one tests a model's memory, not its taste. Four of the first five themes were costumes; it's the model's default for "bad" ([SMELL.md](SMELL.md#the-costume-smell)).
- **Irony turns them good.** A recognizable bad style is a joke the reader is in on, and nostalgia makes it charming. GeoCities and XTREME styling are now used ironically, for fun, which makes them closer to good taste than bad (the owner, October 2026).

**The test: if a reader could name what the theme imitates, it's a costume.** A resemblance that turns up by accident is a warning, not an automatic fail. Ask whether the joke depends on it. If it does, start again.

The test replaces the earlier, narrower *period test* ("was this bad taste in its own time?"), which Sidebar Hell failed.

**The other trap is designer-bad.** Breaking rules on purpose is a style of its own: deconstructivist graphic design (David Carson's *Ray Gun*, Emigre), web brutalism, anti-design, acid graphics. These break the same principles this project does, but expressively, and they're good taste now. The difference is sincerity. Designer-bad breaks a rule to make a point; bad taste follows a wrong rule because it believes in it. If a theme starts to look edgy, it's drifting. It should look earnest.

### Principles to break

A starter list. Each has a source, so the escape note can cite it.

**Structure**
- **Proximity:** things near each other are seen as belonging together. Max Wertheimer's laws of grouping (1923).
- **Similarity:** things that look alike are read as the same kind of thing. Wertheimer (1923).
- **Common region:** things inside one boundary are seen as a group. Stephen Palmer (1992).
- **Figure and ground:** a page separates into a subject and the space behind it. Edgar Rubin (1915).
- **Alignment and the grid:** shared edges make a page cohere. Josef Müller-Brockmann, *Grid Systems in Graphic Design* (1981).
- **Hierarchy:** size, weight, colour and position say what matters most. Wathan & Schoger, *Refactoring UI* (2018).
- **White space and density:** space groups and separates; too little crowds, too much scatters. *Refactoring UI*; Tuch et al. (2012) on complexity.
- **Reading gravity:** readers scan in predictable paths. Jakob Nielsen's F-pattern (2006).

**Typography**
- **Typographic colour:** a well-set paragraph is an even grey, which needs even word spaces and untouched lowercase. Robert Bringhurst, *The Elements of Typographic Style*; "anyone who would letterspace lowercase would steal sheep" (attributed to Frederic Goudy).
- **Measure, leading and paragraphs:** line length, line spacing, and either indents or space between paragraphs, never both. Matthew Butterick, *Practical Typography*.
- **Scale:** sizes from a deliberate scale, a few steps apart. Bringhurst.
- **Fit for purpose:** a typeface carries a personality and suits some jobs, not others. Shaikh, Chaparro & Fox (2006).
- **Consistency:** one style per kind of element.

**Colour**
- **Value contrast:** edges and text are seen through differences in lightness, not hue. Josef Albers, *Interaction of Color* (1963).
- **Vibration:** complementary hues at equal value make their shared edge shimmer. Albers.
- **Simultaneous contrast:** the same colour looks different on different grounds. Michel Eugène Chevreul (1839); Albers.
- **Proportion:** a strong colour needs a small area to balance a large area of a weak one. Johannes Itten's contrast of extension, *The Art of Color* (1961); interior design's 60-30-10 rule.
- **Meaning:** colours carry conventions, such as red for stop and green for go. ISO 3864 safety colours; the web's blue link.
- **Preference:** some colours are reliably disliked. Palmer & Schloss (2010); the GfK study behind Pantone 448C.

Legibility still wins. A wrong rule never touches tier 1 of RULES.md, and in a legible theme never tier 2. Where the rule would break legibility, it bends there, and the journal says so.

## Not Bad (the readable theme)

The escape destination. It must be genuinely good to read, and it must not smell. It is the theme most at risk, because "make it nice" is exactly when the defaults come out.

- Built from book typography: the ranges in Butterick's *Practical Typography* (15–25px text, 45–90 characters per line, line spacing of 120–145%), and Bringhurst.
- A real text typeface with real italics, probably a serif. Quiet colour that follows the device's dark mode.
- No cards, gradients, pills, shadows, icon grids or eyebrow labels. It's a book, not a startup.
- It hosts the escape note and the theme index (`/designs/`), the only places themes are named and explained.
- **Its design hasn't been chosen yet.** Propose one to the owner before building it.

## Shortlist (for the owner to pick from)

*Drafted October 2026. Nothing here is built. Names are working names, seen by readers only after an escape. Each candidate has its principle and source, the wrong rule, what the rule does to the page, how it stays legible, what to watch for, and a line of what its escape note might say.*

A launch set of four or five, across the three axes, would replace the current five (D24). Candidates can be combined where one principle doesn't fill a theme.

### Keep Your Distance (structure)
- **Principle:** proximity and similarity, the first of Wertheimer's laws of grouping (1923). Things that sit close together, or look alike, are seen as belonging together. Every layout leans on this: a heading sits nearer the text it introduces than the text before it, and a caption hugs its picture.
- **Wrong rule:** things that belong together are kept apart, in space and in style; things that don't are brought together.
- **On the page:**
  - Each heading sits tight under the end of the previous section, in that section's colour and face, with a deep gap between it and the text it introduces.
  - Captions sit nearer the next paragraph than their own picture.
  - Paragraphs have no space between them, while list items and table rows are spaced like new sections.
  - On the home page, each post's date and summary hang just above the next post's title.
  - The post's title sits with the site name; its date and tags sit with the footer.
- **Legibility:** nothing inside a block changes. Size, line spacing and measure stay in tier 2, so every word is easy to read; it's what goes with what that keeps going wrong.
- **Watch for:** timidity. A gap of a line or two looks like a CSS bug, so it has to commit: half a screen under a heading. Styling each section separately may need section wrappers in the markup contract, or `:has()` selectors.
- **Escape note:** "Proximity (Wertheimer, 1923): things near each other look like they belong together. Every heading here sits with the section before it."

### The Small Print (structure)
- **Principle:** hierarchy. Size, weight and position rank importance, so the eye meets the title first and the small print last (*Refactoring UI*; Bringhurst's scale).
- **Wrong rule:** the less something matters, the bigger it is.
- **On the page:**
  - The article is the smallest text on the site, at exactly the legibility minimum, because it matters most.
  - The copyright line is the biggest type on every page, followed by the hit count, set enormous. The visible counter survives without GeoCities.
  - Dates, reading times and tags are huge. Post titles are small. Heading levels run backwards, so a subsection's heading outranks its section's.
  - Footnotes are bigger than the article, and captions bigger than headings.
  - On the home page, each post is a giant date and reading time with a little title tucked beneath.
- **Legibility:** tier 2 sets the article's size, and the inversion works upward from there. Everything else is bigger, so nothing is hard to read. It's hard to find.
- **Watch for:** oversized numerals and metadata are an editorial-brutalist fashion (huge, tightly set grotesque numbers in black and white). The big type should be in the same plain face as everything else, big without drama. Haute already has a giant date; if both ship, they overlap.
- **Escape note:** "Hierarchy: size should say what matters. Here it says the opposite. The copyright line is the biggest thing on the site, and the article the smallest."

### Variety Pack (structure and type)
- **Principle:** consistency, and Wertheimer's similarity again: things of the same kind should look the same. Design systems exist to enforce it, and it's the engine of the deep smell (one spacing scale, one radius, one accent).
- **Wrong rule:** never use the same style twice.
- **On the page:**
  - Every paragraph has its own typeface, size, colour, alignment, width and indent. Each property cycles at a different prime length (faces every 5, colours 7, alignments 3, widths 11), so no pattern shows within a post.
  - Every heading, list, quote, table, code block and image has a style nothing else shares, down to the border: each border style and each corner radius used once.
  - Spacing comes from no scale: 13px here, 41px there, 7px.
  - Every link is underlined, but no two the same way: solid, double, dotted, dashed, wavy.
  - On the home page, every post looks like it came from a different site.
- **Legibility:** every paragraph face is a text face that reads at length, at 16–22px, and every colour pair passes AA. The variety is in style, never in readability.
- **Watch for:** the ransom note, which is a costume of this principle (and was the first thing that came to mind). Keep it per block, never per letter, with no paper, tape or cut edges. It also isn't more-is-more: nothing is added, it's only inconsistent. Several downloaded fonts would be heavy; generic families and system faces via `local()` keep the weight near zero.
- **Escape note:** "Consistency: things of the same kind should look alike. Here nothing looks like anything else, so nothing looks like it belongs."

### Fully Justified (type)
- **Principle:** typographic colour. A well-set paragraph is an even grey, which needs even word spaces and untouched lowercase (Bringhurst; Goudy's sheep). Butterick: indents or space between paragraphs, never both.
- **Wrong rule:** if text looks cramped, add space everywhere, and make every line reach both margins.
- **On the page:**
  - Everything is justified, including headings, captions, the navigation and the last line of every paragraph, so a two-word last line is pulled across the column and a short heading spreads into three lonely words.
  - Hyphenation is off, so rivers run down the page.
  - Lowercase is letterspaced and word spaces are doubled, while headings are capitals set tight: wrong in both directions.
  - Double line spacing, with paragraphs both indented and spaced.
- **Legibility:** letterspacing stays within the 0.12em that WCAG 1.4.12 asks every site to survive, and line spacing only ever goes up. Ugly, not unreadable.
- **Watch for:** the quietest candidate. At a glance it could pass for a badly set school essay, which is a costume. The stretched last lines and spread headings have to carry it, and it likely needs a colour principle beside it.
- **Escape note:** "Typographic colour: a good paragraph is an even grey. These force every line to both edges and put extra space between every letter and word."

### Breathing Room (structure; Haute, reworked)
- **Principle:** white space. *Refactoring UI*: start with too much white space, then remove it. Generous white space is also the deep smell's default answer.
- **Wrong rule:** never remove it.
- **On the page:** Haute's mechanism without the fashion house. One paragraph per screen, margins that take most of a desktop screen, capitals tracked until words come apart, the title alone on its own screen, a short post fifteen screens long. No black and gold, no Bodoni, no French, no "plates".
- **Legibility:** as Haute: body text stays in tier 2, and only the space is absurd.
- **Watch for:** this is the candidate nearest the smell, because it attacks one of the smell's own virtues. In quiet colours it would read as the smell taken literally, so it needs a loud palette. It pairs naturally with Pop of Colour: vast, empty screens of a colour nobody would choose.
- **Escape note:** "White space: good layouts start with too much and take some away. This one never took any away."

### Vibrant (colour)
- **Principle:** value contrast. Edges and text are seen through differences in lightness, not hue. Complementary hues at equal value make their shared edge vibrate until the boundary seems to dissolve (Josef Albers, *Interaction of Color*, 1963).
- **Wrong rule:** contrast comes from hue, never from lightness.
- **On the page:**
  - Every colour sits at the same mid lightness: red against green, orange against blue, violet against olive, meeting at hard edges that shimmer.
  - The page, the article panel, rules, borders, heading bands, code-block frames, table rows and picture frames are all equal-value fields.
  - No grey, no white, no black, except the text.
- **Legibility:** at a mid value (about L\* 55), every field passes AA with black text, at about 5.5:1. The text is the one value contrast on the page, so the rule bends exactly once. Links are underlined, since colour can't separate them.
- **Watch for:** pattern glare. Large flat fields only, never fine stripes or checks (Arnold Wilkins, *Visual Stress*, 1995; see the RULES.md tier 1 rule). Two costumes sit nearby: 1960s psychedelic posters, which used vibrating complementaries with swirling lettering, and Albers' own nested squares, which are designer-good. Keep everything flat and rectangular, with no lettering effects and no squares within squares.
- **Escape note:** "Value contrast: edges and text show up through differences in lightness. Every colour here has the same lightness, so the edges between them vibrate (Josef Albers, *Interaction of Color*, 1963)."

### Pop of Colour (colour)
- **Principle:** proportion. A strong colour needs a small area to balance a large area of a weak one (Itten's contrast of extension, 1961). Interior design's 60-30-10 rule: 60% a dominant neutral, 30% a secondary colour, 10% an accent. The smell follows it perfectly, with grey everywhere and one accent used sparingly.
- **Wrong rule:** the loudest colour gets the most room, and emphasis is shown by taking colour away.
- **On the page:**
  - The whole page in the loudest colour available, edge to edge. A second loud hue that doesn't go with it fills panels and code blocks.
  - Everything important is greige, as if the designer saved all their restraint for what matters. Links are greige highlights, headings sit in greige bands, and `strong` text, the current page and text selection all turn beige.
  - Pictures sit in greige frames.
- **Legibility:** near-black text on the loud ground, with the hue chosen to pass AA; emphasis is near-black on greige, which passes too.
- **Watch for:** one bold colour for a whole site is a fashion when the colour is well chosen: Brat green (2024), Klein blue, brand-colour landing pages. It has to be two loud colours that fight and a greige that belongs with neither. It needs a type or structure move as well, or it's only a palette.
- **Escape note:** "Proportion: loud colours belong in small doses and quiet ones in large (Itten; the 60-30-10 rule). Here the loudest colour has the whole page, and everything important is beige."

### Mixed Signals (colour)
- **Principle:** colour carries meaning by convention. Red means stop or error, yellow caution, green go or safe, and blue information or a link (ISO 3864 safety colours; the web's blue link).
- **Wrong rule:** choose colours for how they look, never for what they say.
- **On the page:** every element gets a signal colour it hasn't earned. The article is on safe green, headings in stop red, dates in caution amber, quotes in information blue, links any colour but blue, and the 404 page a reassuring green.
- **Legibility:** AA throughout.
- **Watch for:** the riskiest candidate. It sits nearest tier 1's "nothing pretends to be something it isn't". It works by colour only: no icons, no "Error" or "Warning", no alert boxes, nothing resembling a browser or system message. The owner's reaction to the green Less bad ("it feels like an error") shows the effect is real, and that it can read as broken rather than as taste.
- **Escape note:** "Colour carries meaning: red for stop, green for go. Every colour here was chosen for its looks, so the page keeps saying things it doesn't mean."

### The Focus Group (keep)
Already principle-first. Its wrong rule is "do whatever research says people like least", and it starts from studies, not an interface. Nothing in it can be named as an imitation, and it belongs to no era. Its first draft drifted toward a stylish, earthy zine (designer-bad) and was made clunkier; see its journal. Proposed: keep, subject to the owner's review.

### Combining
Some candidates are stronger together, as one theme with a principle on each of two axes:
- **Breathing Room + Pop of Colour:** both overdo a virtue of the smell (white space, a sparing accent). Empty screens of a loud colour, with tiny greige emphasis.
- **Fully Justified + Vibrant:** stretched, spaced-out text on shimmering fields.
- **The Small Print + Mixed Signals:** the least important things are the biggest and in alarm colours.

## Built themes

All five are built and live. Under D23 they're judged by the costume test; under D24 the costumes leave the rotation once replacements ship. Each journal has the full brief and log.

| Theme | Failure of taste | Verdict (October 2026) |
|---|---|---|
| [Under Construction](themes/under-construction.md) | Amateur more-is-more, recreating GeoCities | Costume. Irony has made it fun to look at. Retires. |
| [Sidebar Hell](themes/sidebar-hell.md) | Widget maximalism, recreating 2006 blogs | Costume, and a period-test failure: the owner's miss. Retires. |
| [Office Suite](themes/office-suite.md) | Desktop publishing with every button, recreating PowerPoint 2003 | Costume. Retires. |
| [Haute](themes/haute.md) | Pretension mistaken for elegance, recreating luxury fashion sites | Costume around a real mechanism (too much space). Rework as Breathing Room, keep, or retire: the owner's call. |
| [The Focus Group](themes/the-focus-group.md) | Design by survey, from research | Passes the costume test. Keep, subject to review. |

The Focus Group's sources and its rule against in-page citations (D14a) are in its journal and `theme.yaml`.

## More principles

Not shortlisted, for later or for riffing. Each needs a full brief before it ships.

| Idea | Principle | Why not yet |
|---|---|---|
| Figure and ground | Rubin (1915): the background is the most interesting thing on the page, and the text a hole in it | Hard to do without decoration, and close to Under Construction's starfield |
| Wrong region | Palmer (1992): boxes drawn round the wrong groups | Folded into Keep Your Distance |
| Reading gravity | Nielsen's F-pattern (2006): important things where nobody looks | Would mean reordering content, which breaks reading order for keyboard and screen-reader users |
| Uniformity | Similarity the other way: everything the same size, weight and colour | Reads as web brutalism, which is designer-bad |
| Wrong weight | Bold body text, hairline headings | Too small for a theme; fits inside The Small Print |
| Simultaneous contrast | Chevreul (1839), Albers: one "brand colour" that looks like three different colours on different grounds | Too subtle to see alone; could live inside Vibrant or Pop of Colour |
| Chaos Mode | None: random palettes, fonts and layouts, each checked for readable contrast in the browser, with endless spins | Not a principle, but not a costume either. Phase 4 |

## Ruled out

| Theme | Why |
|---|---|
| ✨ The Default | The AI default look: what this project pushes against. Proposed during planning, cut by the owner. It lives only as `_control` (see [SMELL.md](SMELL.md#the-control)). |
| Rustic Pinterest, XTREME, Leather & Linen, Web 2.0 Beta, Corporate Memphis | Costumes of named eras and trends (D23). XTREME, like GeoCities, is already used ironically. |
| Spreadsheet, Reply All, Design by Committee | Costumes of documents and processes: the post as a spreadsheet, an email chain, a review covered in sticky notes. |
| Ransom Note | The costume version of Variety Pack. |

## Sources

- CSS Zen Garden (Dave Shea, 2003): one HTML document, many stylesheets.
- Max Wertheimer (1923), "Untersuchungen zur Lehre von der Gestalt II", *Psychologische Forschung* 4: the laws of grouping.
- Stephen Palmer (1992), "Common region: a new principle of perceptual grouping", *Cognitive Psychology* 24.
- Edgar Rubin (1915), *Synsoplevede Figurer*: figure and ground.
- Josef Müller-Brockmann (1981), *Grid Systems in Graphic Design*.
- Jakob Nielsen (2006), "F-Shaped Pattern for Reading Web Content".
- Josef Albers (1963), *Interaction of Color*.
- Johannes Itten (1961), *The Art of Color*: the seven colour contrasts, including the contrast of extension.
- Michel Eugène Chevreul (1839), *De la loi du contraste simultané des couleurs*.
- ISO 3864-1: safety colours and safety signs.
- Arnold Wilkins (1995), *Visual Stress*: pattern glare and pattern-sensitive epilepsy.
- Matthew Butterick, *Practical Typography*; Robert Bringhurst, *The Elements of Typographic Style*.
- Erik Spiekermann and E. M. Ginger, *Stop Stealing Sheep & Find Out How Type Works* (1993), named after the letterspacing line attributed to Frederic Goudy.
- Adam Wathan and Steve Schoger, *Refactoring UI* (2018). Close to the source of the smell, which makes it a useful rulebook to break.
- Olia Lialina, *A Vernacular Web* (2005); Lialina and Dragan Espenschied, *One Terabyte of Kilobyte Age*. Sources for Under Construction.
- Vincent Flanders, *Web Pages That Suck*.
- Consumer Aesthetics Research Institute (CARI).
- Pantone 448C and the GfK Bluemoon plain-packaging study: <https://hyperallergic.com/304550/in-defense-of-the-worlds-ugliest-color-opaque-couche/>
- Palmer & Schloss (2010), "An ecological valence theory of human color preference", *PNAS*: <https://pmc.ncbi.nlm.nih.gov/articles/PMC2889342>
- Komar & Melamid, *The People's Choice* (1994–97): <https://diaart.org/program/artistswebprojects/komar-melamid-the-most-wanted-paintings-web-project>
- Tuch et al. (2012), "The role of visual complexity and prototypicality regarding first impression of websites", *International Journal of Human-Computer Studies* 70(11): <https://research.google/pubs/pub38315/>
- Reinecke & Gajos (2014), "Quantifying Visual Preferences Around the World", CHI '14: <https://eecs.harvard.edu/~kgajos/papers/2014/reinecke14visual.shtml>
- Shaikh, Chaparro & Fox (2006), "Perception of fonts: perceived personality traits and uses", *Usability News*: <https://portfolio.erau.edu/en/publications/perception-of-fonts-perceived-personality-traits-and-uses/>
