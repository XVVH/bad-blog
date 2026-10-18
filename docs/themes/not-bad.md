# Not Bad: design journal

*Status: **proposed, awaiting the owner's approval.** Built in phase 0 because the escape hatch needs somewhere to land; everything here is open to change.*

## Brief

- **Purpose:** the escape destination. Genuinely good to read, and free of the smell.
- **Real-world references:** printed books; Butterick's *Practical Typography* (body text 15–25px, 45–90 characters per line, line spacing 120–145%); Bringhurst's *The Elements of Typographic Style* (first-line indents, letterspacing caps, the asterism).
- **Surfaces:**
  - **Post:** one column of about 33em. Title in the text face at weight 500. Date and reading time in italic. Tags as a plain comma list.
  - **Home and lists:** a table of contents, with dot leaders running from each title to its date.
  - **Code:** no box and no window chrome, just a hairline rule on the left. Keywords bold, strings dark green, comments italic grey, numbers dark red.
  - **Tables:** booktabs style, three rules and no grid.
  - **Section breaks:** an asterism (⁂).
  - **Footnotes:** smaller text under a short rule.
  - **The bar:** a quiet strip with More bad as an italic underlined button, aligned with the text column. The escape note opens beneath it.
- **Rules it breaks:** none. It's the readable one.
- **Legibility plan:** body text runs 18–21px depending on screen width, line height 1.45, measure about 66 characters. Every colour passes AA, light and dark.
- **Smell risks:** the highest of any theme. "Make it nice" is exactly when the defaults come out, and there are two smells to avoid: the startup look, and the warm "editorial" look (cream paper, a display serif over Inter, a terracotta accent; see SMELL.md).

## First instincts

What I reached for first, before checking it against SMELL.md:

- **A sans-serif or Georgia at 18px, 65ch wide, line height 1.7, with space between paragraphs.** That's the generic "readable blog" recipe. Replaced with one text serif and first-line indents with no gaps between paragraphs, as books do.
- **A warm off-white background** (`#faf9f6` or similar) with a muted accent for links. That's the editorial smell. Replaced with plain white paper and links underlined in the text colour, with no accent colour at all.
- **Dates and metadata in muted grey.** Deep smell. Italic does the de-emphasis instead, in the same ink.
- **The site name as a small, uppercase, letterspaced label at the top.** That turned out to be the eyebrow label from SMELL.md in book clothing. Changed to the site name in italic.
- **Code in a tinted, rounded box.** Changed to monospace with a hairline rule beside it, closer to how books set code.

## Decisions

- **Typeface:** Literata (Google Fonts / TypeTogether, OFL), self-hosted as two variable files, roman and italic, about 106KB together. It was designed for long reading on screens. If Literata doesn't load, the stack falls back to Charter, Sitka Text, Cambria and Georgia.
- **Dark mode** follows the device: near-black paper (`#151514`), warm light ink, and the same token colours lightened.
- **Print** always uses Not Bad, without the bar or sidebars, and with external link URLs printed after the links.
- **The sidebars** become a quiet colophon after the article: related posts, recent posts, tags and the feed link. The archive and the about blurb are hidden, because the home page already lists everything.

## Log

- 2026-10-18: First version, for the owner's review. Passes every check in `tests/floor.spec.mjs` at 320, 375, 768 and 1440px, light and dark.

## Open questions

For the owner:

- Literata, or another text face?
- First-line indents, or space between paragraphs?
- Dot leaders on the post list: charming or fussy?
