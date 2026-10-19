# Under Construction: design journal

*Status: built in phase 1 and live. **A costume** (D23): it recreates GeoCities, a style irony has since made fun to look at. It leaves the rotation when the principle-first set ships (D24).*

## Brief

- **Failure of taste:** amateur more-is-more. Every effect the author found, used at once, with total confidence. Not "it's old".
- **Real-world references:** GeoCities home pages as preserved by Olia Lialina and Dragan Espenschied's *One Terabyte of Kilobyte Age*, and Lialina's essay *A Vernacular Web* (2005): starfield backgrounds, `<center>`, rainbow rules, construction signs, hit counters, webrings, "best viewed in…" notes.
- **Axes:** graphics, type, structure.
- **Signature moves:**
  - a tiled starfield behind everything
  - the content in a bevelled navy table, 760px wide, "best viewed at 800 × 600"
  - Comic Sans headings over Times New Roman body text, everything centred
  - a rainbow site name, a slide-in "marquee" tagline, and an under-construction sign on every page
  - rainbow dividers, red ball bullets, a blue border round every image
  - "NEW!" starbursts on recent posts
  - the real hit counter as an odometer
  - previous/next posts as a webring
  - a strip of flames at the bottom of the page
  - a sparkle trail behind the mouse pointer
- **Every surface:**
  - **Home:** a centred list of posts with ball bullets and NEW! badges.
  - **Post:** title in lime Comic Sans, body text in pale yellow Times on navy.
  - **Code:** a Windows Notepad window titled after the language.
  - **Tables:** bevelled with purple headers.
  - **Images:** framed in link blue.
  - **Links:** cyan, visited pink.
  - **404:** the same treatment, so it's still under construction.
  - **More bad:** a grey bevelled button.
- **Rules it breaks** (shown in the escape note): see `rules_broken` in `assets/themes/under-construction/theme.yaml`.
- **Legibility plan:**
  - Body text is pale yellow Times on a solid navy panel (about 15:1). The starfield is only behind the chrome.
  - Body text is 19px with line height 1.45. The panel caps lines at about 80 characters.
  - Code is black on white inside the Notepad window.
  - Every animation stops within five seconds, so nothing needs a pause button (WCAG 2.2.2), and nothing flashes faster than once a second.
- **Smell risks:** "retro homage". A tasteful vaporwave or pixel-font tribute to GeoCities is a designer's idea of the web in 1997, and that's its own smell. The tells are pixel fonts, crisp Win95 chrome everywhere, neat alignment and a consistent palette.

## First instincts

What I reached for first:

- **A pixel font (Press Start 2P or similar) for headings.** That's the homage, not the thing. Real pages used whatever the computer had: Times New Roman by default, Comic Sans when the author wanted fun. Replaced.
- **A tidy, consistent Win95 look:** every box the same grey bevel, aligned on a grid. Real pages mixed bevels, tables, colours and sizes with no system at all. I kept one bevel for the content table and let everything else disagree: teal box, purple box, navy table, grey buttons.
- **Left-aligned body text, because that's "correct".** GeoCities centred everything, so this theme centres the paragraphs too. That stays within tier 2: centred text is ugly, but still legible at this size and line length.
- **Endless blinking and scrolling.** Authentic, but it breaks WCAG 2.2.2 without a pause button. Every animation here plays for five seconds or less and then stops. The marquee slides in once and stays, like `<marquee behavior="slide">`.

## Decisions

- **Fonts:** Comic Sans MS where the device has it, falling back to Comic Neue (OFL, self-hosted, about 39KB for regular and bold). Times New Roman and Courier New come from the system.
- **Art:** the starfield, red ball, construction sign, flames and star are SVGs drawn for this project (`img/`). None are taken from the GeoCities archive.
- **Decorative text** made with CSS (`content: "…" / ""`) has empty alternative text, so screen readers don't read "Welcome to" or "Best viewed in Netscape" aloud.
- **The sparkle trail** (`theme.js`) works only with a mouse, never with touch. It's switched off for readers who ask for reduced motion, and it stops at 24 sparkles on screen at once.

## Log

- 2026-10-18: First version.
- 2026-10-18: Fixes from the tests and the gallery. The marquee moved the whole box and pushed the page sideways mid-animation; it now animates `text-indent` inside its own box. Underlined `h2`s made links inside headings indistinguishable (axe `link-in-text-block`), so the underline became a shadow. Sidebar links got padding for 24px targets. The construction sign's icons moved into its background. All tests pass.
- 2026-10-19: **Ruled a costume.** The owner: GeoCities and XTREME "have become funny to use ironically", so recreating them has swung from bad to good(ish). The brief said "not 'it's old'", and it wasn't, but the joke still depended on the reader recognizing GeoCities. Its one principle-shaped idea, more-is-more with no system, lives on in Variety Pack's "never use the same style twice". Its visible hit counter needs a new home (ROADMAP.md).

## Open questions
