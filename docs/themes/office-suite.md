# Office Suite: design journal

*Status: built in phase 2. Awaiting the owner's review in the gallery.*

## Brief

- **Failure of taste:** desktop publishing by someone who found every button. The post pasted into a PowerPoint slide, with WordArt, clip art and border art from the same afternoon.
- **Real-world references:** Microsoft Office around 2003. PowerPoint's Normal view (slide list on the left, the slide in the middle, "Click to add notes" below, a status bar), its slide sorter, the blue-background, yellow-title, white-bullets design template, WordArt, Publisher's border art and picture frames, callout shapes, and the clip art gallery. All of it recreated, never copied.
- **Axes:** type, graphics, structure.
- **Signature moves:**
  - an Office-style toolbar for the bar, with its menu ("File Edit View Insert…")
  - the post as a slide on the grey workspace: navy gradient, a swoosh, a yellow WordArt title tilted in 3D
  - every paragraph a bullet point that flies in from the left
  - each section heading starting a new "Slide N"
  - a border of apples round the whole page
  - clip art: light bulb, trophy, computer, green arrow
  - captions in yellow callout bubbles, quotes on a sticky-note text box
  - code on a white slide titled "My Code"
  - the home page as the slide sorter
  - the post's footer as the notes pane
  - the site footer as the status bar ("Slide 1 of 1 · Default Design · English (U.S.)")
- **Rules it breaks:** see `rules_broken` in the theme's `theme.yaml`.
- **Legibility plan:**
  - Body text is Arial 20px, white on navy (`#00205b` to `#0b3d91`, over 12:1), line height 1.5, about 70 characters per line.
  - WordArt is only on headings. It's solid yellow with an extruded shadow, so contrast can be measured.
  - The fly-in plays once, under two seconds, and is off under reduced motion.
- **Smell risks:** low. The look is loud and specific. The risk is the opposite one: "ironic retro", a clean modern recreation of Office chrome. Keep it lumpy: real 2003 decks mixed Arial, Times, Tahoma and Comic Sans, and nothing lined up.

## First instincts

- **Gradient-filled WordArt** (`background-clip: text`). That's the classic look, but the colour can't be measured for contrast. The title uses a solid yellow face with a stepped 3D shadow and a skew instead. It's equally WordArt and it's checkable.
- **Fixed 4:3 slides.** A real slide clips whatever doesn't fit, and RULES.md forbids clipping. The slide starts at 4:3 and grows with its content, like a slide someone kept typing into.
- **A tidy recreation of the Office 2003 toolbar.** It's tempting to make it pixel-perfect and handsome. Kept it approximate and slightly wrong, like a template someone else made.

## Decisions

- **Fonts:** system only: Arial, Arial Black, Impact, Tahoma, Times New Roman, Courier New, with fallbacks. No downloads.
- **Clip art and border art** are SVGs drawn for this project (`img/`). Nothing comes from Microsoft's clip art gallery.
- **The menu text** in the toolbar is decoration (`content: … / ""`), not real menus. It isn't clickable and doesn't pretend to be.

## Log

- 2026-10-18: First version.
- 2026-10-18: The slide didn't grow with its content. A stray `min-height: 0` cancels `aspect-ratio`'s grow-to-fit, so on phones the text spilled out over the sidebars. Fixed, and `tests/floor.spec.mjs` now checks that article content stays inside the article and that the page's regions never overlap. More bad also wrapped onto four lines beside the menu text; the floor now stops More bad shrinking.

## Open questions
