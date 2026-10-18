# Sidebar Hell: design journal

*Status: built in phase 1. Awaiting the owner's review in the gallery.*

## Brief

- **Failure of taste:** widget maximalism. The article is the least important thing on the page.
- **Real-world references:** Blogger and WordPress blogs around 2005–2008. WordPress's default "Kubrick" theme (the rounded blue header), Blogger's Minima-era templates and its navbar (with "Next Blog »"), widgetised sidebars, tag clouds, calendar widgets and walls of 80×15 badges.
- **Axes:** structure, hierarchy.
- **Signature moves:**
  - a fixed 990px page on a pinstriped background
  - a rounded blue gradient header with the title in Trebuchet MS, and tab navigation under it
  - the article squeezed into a 440px middle column between two sidebars
  - every widget a box with its own gradient header in a different colour, and tiny Verdana text in every sidebar
  - a tag cloud sized by post count, the archive as "▼ 2026 (4)", "»" bullets
  - a calendar widget that highlights the days with posts
  - a "nobody" profile silhouette in About Me
  - an orange RSS icon
  - a wall of invented 80×15 badges
  - the bar styled as the Blogger navbar
- **Every surface:**
  - **Post:** Blogger-style uppercase date header, title in link blue, Georgia body text, "Labels:" for tags, "0 Comments" (true: there are no comments).
  - **Code:** a "Code Snippet" box with a dashed border.
  - **Tables:** grey header cells and a 1px grid.
  - **Images:** framed like a 2006 Flickr badge, with a white mat and a hard shadow.
  - **Home:** each post a dated entry with a "Read more »" link.
  - **More bad:** styled as the navbar's "Next Blog" link, still reading "More bad".
- **Rules it breaks:** see `rules_broken` in the theme's `theme.yaml`.
- **Legibility plan:** body text is 16px Georgia, `#333` on white (12.6:1), line height 1.55, about 55 characters per line in the narrow column. Only the sidebars use tiny type, and they're chrome.
- **Smell risks:** rounded boxes and gradients are smell territory. The difference is in the details. 2006 used hard 1px borders, small top-only corner radii, hard offset shadows, saturated header bars, and a different colour for every box. The smell uses one 12–16px radius, soft blurred shadows and one accent. If it ever looks calm, it's drifting.

## First instincts

- **One tidy sidebar, consistently styled.** That's a modern blog with a sidebar. Real 2006 blogs had two, and every widget installed a slightly different look. Each widget here gets its own header colour.
- **Generous spacing in the sidebars.** The era crammed 11px Verdana into every box. Kept it cramped. Tap targets still pass WCAG 2.2's 24px minimum.
- **Replacing More bad's label with "Next Blog »".** It's the perfect period joke, but it would break WCAG 2.5.3 (label in name): speech-input users say what they see. The visible label still reads "More bad", with the navbar's "»".

## Decisions

- **Fonts:** all system fonts: Trebuchet MS, Verdana, Georgia and Lucida Grande, each with fallbacks. Nothing to download.
- **The calendar** (`theme.js`) shows the month of the latest post and highlights the days that have posts. It's decorative and `aria-hidden`, because the archive already holds those links.
- **The badges are invented** ("WEB 2.0", "VALID-ISH XHTML", "POWERED BY COFFEE"), with no real brands or logos.
- **Layout:** three columns from 1000px wide. Between 700 and 999px, the article and the right sidebar sit side by side with the left sidebar below. Under 700px, one column with the article first, as RULES.md requires.

## Log

- 2026-10-18: First version.
- 2026-10-18: Fixes from the tests. The "Labels:" links were too small to tap (24px minimum), and inline code in a heading inherited the orange heading colour and failed contrast. The badges were rebuilt as proper two-part 80×15 badges. All tests pass.

## Open questions
