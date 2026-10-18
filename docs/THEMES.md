# Themes

## How to make a theme

1. **Start from something real:** a specific movement, era, site, document type or study. Never just "make it ugly". Collect references before writing any CSS.
2. **Name the failure of taste** in one sentence, for example "amateur more-is-more" or "pretension mistaken for elegance".
3. **Pick the axes** it attacks (palette, type, structure, graphics) and its signature moves.
4. **Plan every surface:** post, home, tag list, about, 404, code blocks, images, links, footnotes, and the More bad button.
5. **Write the journal first**, as `docs/themes/<id>.md` from [`themes/_TEMPLATE.md`](themes/_TEMPLATE.md), then build.
6. **Check it** against [SMELL.md](SMELL.md) and [RULES.md](RULES.md), run the tests, and look at the gallery beside `_control`.
7. **Record** what you were tempted to do and didn't.

## Not Bad (the readable theme)

The escape destination. It must be genuinely good to read, and it must not smell. It is the theme most at risk, because "make it nice" is exactly when the defaults come out.

- Built from book typography: the ranges in Butterick's *Practical Typography* (15–25px text, 45–90 characters per line, line spacing of 120–145%), and Bringhurst.
- A real text typeface with real italics, probably a serif. Quiet colour that follows the device's dark mode.
- No cards, gradients, pills, shadows, icon grids or eyebrow labels. It's a book, not a startup.
- It hosts the escape note and the theme index, the only places themes are named and explained.
- **Its design hasn't been chosen yet.** Propose one to the owner before building it.

## Launch set

### Under Construction
- **Failure of taste:** amateur more-is-more. Not "it's old".
- **Sources:** GeoCities pages, via Olia Lialina's *A Vernacular Web* (2005) and the *One Terabyte of Kilobyte Age* archive.
- **Axes:** graphics, type, structure.
- **Signature moves:**
  - tiled background and rainbow divider lines
  - a bevelled table frame
  - Comic Sans mixed with Times
  - "NEW!" starbursts on recent posts
  - the real hit counter, as an odometer
  - a webring footer (really the previous/next post links)
  - an "under construction" sign
  - optionally, a static guestbook signed only by the owner
- **Code blocks:** a bevelled Notepad window.
- **Watch for:** keeping marquees and blinking within the motion rules. Every GIF is made for this project.

### The Focus Group
- **Failure of taste:** design by survey. Every choice is what research says people like least.
- **Sources:**
  - Pantone 448C, "drab dark brown" (GfK Bluemoon, 2012, for Australia's plain cigarette packaging)
  - Palmer & Schloss (2010): dark yellows and olives are among the least-liked colours
  - Komar & Melamid, *The People's Choice*: the "Most Unwanted" paintings came out small, abstract and warm-toned
  - Tuch et al. (2012): busy, unfamiliar-looking sites are rated least attractive within 50 milliseconds
  - Reinecke & Gajos (2014): how colourfulness and complexity affect appeal
- **Axes:** palette, structure, graphics. It belongs to no era.
- **Signature moves:** maximum clutter and a deliberately unfamiliar layout, all in the least-liked palette, delivered deadpan.
- **Code blocks:** survey-hated token colours that still pass contrast.
- **Watch for:** body text stays legible on 448C (light text on it passes). **Open question:** planning originally had every design decision footnoted in the page with its study. Does that count as explaining the joke? If so, the citations go only in the escape note.

### Sidebar Hell
- **Failure of taste:** widget maximalism. The article is the least important thing on the page.
- **Sources:** Blogger and WordPress blogs around 2006.
- **Axes:** structure, hierarchy.
- **Signature moves:** a narrow article column between two stuffed sidebars holding a tag cloud, blogroll, calendar, archive tree, "currently reading" and a wall of 88×31 badges. Every widget is real navigation, drawn from the rails.
- **On phones:** the article comes first, with the sidebars stacked after it.
- **Code blocks:** a "Code Snippet" widget box.

### Haute
- **Failure of taste:** pretension mistaken for elegance. The "too little" counterweight to the others.
- **Sources:** luxury fashion sites and design-award showcase sites.
- **Axes:** type, structure.
- **Signature moves:** hairline capitals with extreme letter spacing, black and gold, one paragraph per screen, a giant date, images cropped to 90% of the screen height.
- **Code blocks:** hairline gold monospace.
- **Watch for:** the highest risk of drifting into the smell. Whitespace and restraint are deep smell, so Haute has to overshoot them into absurdity rather than land on "clean and minimal". Body text still meets tier 2.

### Office Suite
- **Failure of taste:** desktop publishing by someone who found every button.
- **Sources:** WordArt, Microsoft Publisher border art, PowerPoint 2003 templates. All recreated, never copied.
- **Axes:** type, graphics, structure.
- **Signature moves:** WordArt headings done in CSS (gradient fill, skew, extrusion), Publisher-style borders, clip art drawn for this project, each section a 4:3 slide with ghostly "Click to add title" placeholders, and a home page that looks like PowerPoint's slide sorter.
- **Code blocks:** Courier on a slide titled "My Code" in WordArt.
- **Watch for:** slides must grow with their content, never clip it.

## Backlog

Open for riffing; add your own. Each needs the same treatment as the launch set before it ships.

| Theme | Failure of taste / source |
|---|---|
| Rustic Pinterest | 2013: chalkboard, burlap, mason jars, script fonts, washi-taped photos, a hipster ✕ logo, "Est. 2026" |
| XTREME | Energy drinks and gamer gear: angular shapes, neon on black, chrome lettering, lightning |
| Leather & Linen | 2012 skeuomorphism: stitched leather, linen, notebook paper, coffee rings |
| Ransom Note | A different font for every letter of every heading |
| Spreadsheet | The post laid out in spreadsheet cells, with the title in the formula bar |
| Reply All | The post as an email chain, each section quoted one level deeper (capped for phones) |
| Corporate Memphis | Flat blobby-people illustration (Facebook's Alegria era); the most drawing work |
| Design by Committee | Sticky notes in the margins: "can the logo pop more?" |
| Web 2.0 Beta | Glossy buttons, wet-floor reflections, BETA starbursts (catalogued by the Consumer Aesthetics Research Institute) |
| Chaos Mode | Randomly generated palettes, fonts and layouts, each checked for readable contrast in the browser; endless spins |

## Excluded

| Theme | Why |
|---|---|
| ✨ The Default | The AI default look: what this project pushes against. Proposed during planning, cut by the owner. It lives only as `_control` (see [SMELL.md](SMELL.md#the-control)). |

## Sources

- CSS Zen Garden (Dave Shea, 2003): one HTML document, many stylesheets.
- Olia Lialina, *A Vernacular Web* (2005); Lialina and Dragan Espenschied, *One Terabyte of Kilobyte Age*.
- Vincent Flanders, *Web Pages That Suck*.
- Consumer Aesthetics Research Institute (CARI).
- Matthew Butterick, *Practical Typography*; Robert Bringhurst, *The Elements of Typographic Style*.
- Adam Wathan and Steve Schoger, *Refactoring UI* (2018). Close to the source of the smell, which makes it a useful rulebook to break.
- Pantone 448C and the GfK Bluemoon plain-packaging study: <https://hyperallergic.com/304550/in-defense-of-the-worlds-ugliest-color-opaque-couche/>
- Palmer & Schloss (2010), "An ecological valence theory of human color preference", *PNAS*.
- Komar & Melamid, *The People's Choice* (1994–97): <https://diaart.org/program/artistswebprojects/komar-melamid-the-most-wanted-paintings-web-project>
- Tuch et al. (2012), "The role of visual complexity and prototypicality regarding first impression of websites", *International Journal of Human-Computer Studies* 70(11): <https://research.google/pubs/pub38315/>
- Reinecke & Gajos (2014), "Quantifying Visual Preferences Around the World", CHI '14: <https://eecs.harvard.edu/~kgajos/papers/2014/reinecke14visual.shtml>
