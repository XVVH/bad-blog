# The Small Print: design journal

*Status: built in phase 3. Awaiting the owner's review in the gallery.*

## Brief

- **Principle broken, and its source:** visual hierarchy. Size, weight, contrast and position rank importance, so the eye meets the title first and the small print last (Wathan & Schoger, *Refactoring UI*; Bringhurst on typographic scale).
- **The wrong rule:** the less something matters, the bigger it is.
- **Axes:** structure (hierarchy) and type (scale). Colour follows the same rule: the more something matters, the quieter its colour.
- **Costume check:** giant numerals and oversized metadata are an editorial-brutalist fashion: huge, tightly set grotesque figures in black and white. The Small Print avoids every part of that toolkit. Its giant type is Georgia, with old-style figures, normal spacing and a dull brown. It should look like a mistake, not a poster.
- **Signature moves:**
  - the article is the smallest text on the site, at exactly the legibility minimum, in a quiet grey, because it matters most
  - the copyright line is the biggest type on every page, followed by the hit count
  - dates, reading times, tags and tag counts are enormous; post titles are small
  - heading levels run backwards: a fourth-level heading outranks a second-level one
  - captions bigger than headings, footnotes bigger than the article, list bullets bigger than their items
  - pictures shrunk to a third of the column, under captions twice the size of the text
  - the language label on a code block bigger than the code
  - the thematic break as a thick slab
- **Every surface:**
  - **Home and lists:** each post is a giant date and a bigger reading time, with a little title and summary tucked between them.
  - **Tag list:** small tag names beside giant counts.
  - **Post navigation:** giant "Older" and "Newer", little post titles.
  - **Rails:** giant section headings, small links, big dates and counts.
  - **404:** a small "Not found" under the giant site furniture.
  - **More bad:** small, because it's the most important control on the page.
- **Rules it breaks:** see `rules_broken` in `assets/themes/the-small-print/theme.yaml`.
- **Legibility plan:**
  - Article text is 16px Georgia with line height 1.55, on lines of about 36em, in grey `#666666` on white (5.7:1).
  - Everything else is bigger, so nothing is hard to read. It's hard to find.
  - The giant text is in dark brown `#4b4034` (about 10:1), so it passes at any size.
- **Smell risks:** "muted grey secondary text" is deep smell; here the grey goes on the article instead, which is the point. Giant type risks looking confident and designed; it has to look misjudged. Keep it lumpy: no tight tracking, no all-caps, no black.

## First instincts

- **Huge tightly tracked grotesque numerals, black on white.** The current editorial-brutalist look, and the first picture that came to mind for "giant date". Replaced with Georgia's old-style figures in brown, at normal spacing.
- **Making the article a little bigger "so it stays readable".** That would quietly restore the hierarchy. The legibility floor already keeps it readable; the article sits exactly on it.
- **Leaving the title fairly large, as the exception.** There are no exceptions. The title is the second most important thing on the page, so it's the second smallest.

## Decisions

- **Fonts:** Georgia everywhere, falling back to the device's serif. No downloads.
- **The copyright sign** is decorative CSS text (`content: "© " / ""`), so screen readers don't hear it.
- **The hit count** is shown here, enormous, with "visits" after it as decorative CSS text. Like the counter itself, it's hidden from screen readers.

## Log

- 2026-10-19: First version. The giant type was bold with tight line spacing, and in the first screenshots it read as a confident type poster: handsome, which is Haute's problem again. Now it's regular weight with ordinary line spacing, so it looks like someone turned the sizes up and touched nothing else. That's the sincere version of the rule.

## Open questions

- Is big serif type still too handsome? On Macs and Windows it's Georgia, with old-style figures, which should look quainter than the test machine's DejaVu Serif. The owner should judge it on a real device.
