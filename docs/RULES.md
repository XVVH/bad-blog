# Rules

Three tiers. The first is permanent. The second applies to the launch themes. The third is everything else.

## 1. Never (every theme, forever)

Breaking any of these is a bug, whatever the theme. Automated tests enforce as many as they can (see [ARCHITECTURE.md § Testing](ARCHITECTURE.md#testing)).

**Layout and reading**
- No sideways page scrolling at any width down to 320px (WCAG 1.4.10). Long URLs, wide images and tables wrap, shrink or scroll inside their own box. Code blocks scroll inside the block, never the page.
- No hidden or truncated article content. Anything collapsible is open by default.
- Zoom is never disabled, text is always selectable, and 200% zoom still works.

**Motion**
- Nothing flashes more than 3 times a second (WCAG 2.3.1).
- Anything that moves for more than 5 seconds can be paused (WCAG 2.2.2).
- With `prefers-reduced-motion: reduce`, nothing moves at all.

**Hostility**
- No popups, modals, overlays, interstitials or "click to enter" pages.
- No autoplaying sound or video.
- No scroll hijacking, back-button tricks or forced new tabs.
- No fake buttons, fake close icons, or anything that pretends to be something it isn't at the reader's expense.
- Nothing that tracks or fingerprints visitors, or collects anything a visitor types.

**Navigation and controls**
- Links can be told apart from body text.
- Keyboard focus is always visible.
- The More bad / Less bad bar is always present at the top, reachable by keyboard, with tap targets of at least 44×44px.
- Every other link and button is a target of at least 24×24px, or spaced so it counts as one (WCAG 2.5.8). Tiny sidebar text needs padding on its links.
- **Less bad is the fire exit.** It looks the same in every theme: same position (top right), same shape, same words. Themes may not restyle it. More bad can be themed.
- Accessible names never change: "More bad" and "Less bad". A theme may decorate More bad (add "»", an icon, a shape), but its visible text must still read "More bad", because speech-input users say what they see (WCAG 2.5.3, label in name).

**Screen readers**
- Every theme presents the identical article to assistive technology. All decoration, injected text and fake widgets are `aria-hidden`.
- Decorative text made with CSS has empty alternative text, `content: "Welcome to " / ""`, so it isn't read aloud.
- Theme changes are announced in a live region.

**Content and assets**
- Images keep their alt text and captions in every theme.
- Fonts have free licences (OFL or similar) and are self-hosted. System fonts such as Comic Sans MS, Papyrus or Impact are used via `local()` with a free look-alike as fallback, because many phones don't have them.
- Decorative art (GIFs, clip art, textures, icons) is made for this project, never taken from archives or commercial clip-art libraries.
- No third-party requests of any kind.

**The joke**
- No bad theme explains itself: no theme name, no badness meter, no "this is intentional", no rules-broken list, no in-page citations for its design choices, no link to a theme index. These exist only in Not Bad, after an escape.
- The More bad spin shows no theme names.

## 2. Legibility (all launch themes)

Every theme in the launch set is ugly but easy to read. A later phase may relax this for particular themes, but only with the owner's agreement. A theme that does declares `legible: false` and drops out of the first-visit lottery.

- Body text and code tokens meet WCAG AA contrast (4.5:1) against whatever is actually behind them.
- Body text is at least the equivalent of 16px, with a line height of at least 1.4.
- Body lines stay under about 90 characters.
- Body text is set in something that can be read at length. A theme's terrible display font goes on headings and chrome, not paragraphs, unless it passes the rules above.

## 3. Fair game

Everything else: palette, fonts, hierarchy, layout, decoration, kitsch, the copy in headings and buttons, the 404 page, too much or too little of anything. The tone has no limits beyond tier 1.

Two specific invitations:

- **Break the systems, not just the surface.** The deep smell ([SMELL.md](SMELL.md#deep-smell)) lives in consistent spacing scales, one radius everywhere, symmetric balance and restraint. Inconsistency is a legitimate design move here.
- **Be specific.** "Ugly" isn't a brief. "A 2006 Blogger sidebar with a tag cloud, a calendar widget and a wall of 88×31 badges" is.

## When fixing things

- **Fix bugs, never fix taste.** If a theme breaks tier 1 or tier 2, fix that and only that, in the theme's own idiom. Don't tidy, align, harmonize or modernize anything else.
- If a fix would change the theme's character, ask the owner first.
