# Architecture

*The planned design, as of October 2026. Nothing is built yet. Update this file as things get built; where the code and this file disagree, fix one of them.*

## Overview

Markdown → Hugo → one semantic HTML page per post → styled in the browser by one of several theme stylesheets. A tiny script in the page head picks the theme before anything is drawn. Netlify serves the static output, and one Netlify Function runs the hit counter.

## Content

- Posts are Hugo page bundles: `content/posts/<slug>/index.md`, with the post's images beside it.
- Front matter:

  ```yaml
  title: "…"
  date: 2026-10-18
  description: "…"       # used in lists and feeds
  tags: [ … ]
  draft: false
  bad: true              # or false (Not Bad only), or a list such as [under-construction, haute]
  ```

- Page types are kept few, because each one multiplies the work for every theme: home (the post list), post, tag list, about, and 404.
- Feeds: full-content RSS, plus a sitemap.
- URLs: `/posts/<slug>/`. The build must work under a subpath, so use `relURL`/`absURL` everywhere and never hard-code a leading `/`.

## Markdown rendering

Done with Hugo render hooks.

- **Links** (`render-link.html`):
  - Relative or `.md` destinations resolve to the target page's URL. An internal link that doesn't resolve fails the build.
  - External links get `class="ext"` and a visually hidden "(external)". No `target="_blank"`.
- **Images** (`render-image.html`):
  - Local images become a responsive `<img>` with `srcset` (for example 480, 960 and 1600px wide, as WebP), explicit `width` and `height`, `loading="lazy"` and `decoding="async"`.
  - Missing alt text produces a warning locally and fails in CI. A Markdown image title becomes a `<figcaption>`.
  - Remote images produce a warning: they send readers' requests to a third party, and they cost nothing to bring local.
- **Code:** Hugo's built-in highlighter (Chroma) with `noClasses = false`, so the output is spans with classes and each theme ships its own token colours. Supports `{hl_lines=[3]}`.
- **Extras:** footnotes, tables, smart quotes and heading anchors. Raw HTML in Markdown is off (`unsafe = false`).

## The markup contract

Every page type renders the same semantic skeleton, in every theme:

```html
<body>
  <a class="skip" href="#content">Skip to article</a>
  <nav class="bar" aria-label="Badness"><!-- More bad … Less bad --></nav>
  <div class="page">
    <header class="masthead"><!-- site name, nav --></header>
    <main id="content">
      <article class="post">
        <header class="post-head"><!-- h1, date, reading time, tags --></header>
        <div class="post-body"><!-- rendered Markdown --></div>
        <footer class="post-foot"><!-- prev/next, tags --></footer>
      </article>
    </main>
    <aside class="rail rail-a"><!-- related posts, tags, archive --></aside>
    <aside class="rail rail-b"><!-- about blurb, feed link --></aside>
    <footer class="site-foot"></footer>
    <div class="deco" aria-hidden="true"><span></span><!-- ×8 --></div>
  </div>
  <div class="sr-live" aria-live="polite"></div>
</body>
```

- The rails (`aside` sidebars) hold real, useful content. Themes may hide them, move them or put them centre stage; Sidebar Hell lives in them.
- The `.deco` spans are empty hooks for decoration. Anything a theme injects goes inside an `aria-hidden` container.
- Themes rearrange the page with CSS grid. A theme may not change the HTML for itself alone; if it needs a new hook, add it for every theme.
- Decoration comes from the content, never from extra authoring: "NEW!" from the post date, emoji or clip art chosen by hashing the heading text, testimonials from existing blockquotes, numbers from the hit counter.

## Theme packages

Themes live in `assets/themes/`, so Hugo's asset pipeline can process them. This is not Hugo's own `themes/` directory, which holds Hugo themes and isn't used here.

```
assets/themes/
  _base/              # layout primitives shared by every theme (not a look)
  _floor/             # tier 1 of RULES.md as CSS; always wins
  _control/           # the smell; dev-only, never shipped
  not-bad/            # the readable theme
  under-construction/
    theme.yaml
    theme.css
    theme.js          # optional
    fonts/  img/      # made for, or freely licensed to, this project
```

`theme.yaml`:

```yaml
id: under-construction
name: Under Construction
front_door: true        # eligible for the first-visit lottery
legible: true           # passes RULES.md tier 2
motion: true            # has animation (all of it switched off under reduced motion)
axes: [graphics, type, structure]
sources: [ … ]          # see THEMES.md
rules_broken:           # shown only in the escape note
  - "…"
smell_exemptions: []    # each with a reason
```

If `theme.js` exists, it exports `activate(root)` and `deactivate(root)`. `deactivate` removes everything `activate` added.

The build generates a manifest from all the `theme.yaml` files for the browser to use. Production builds leave out `_control`.

## Cascade layers

```css
@layer reset, base, theme, floor;
```

`floor` holds tier 1 of [RULES.md](RULES.md): overflow handling, visible focus, the reduced-motion shutdown, and the fixed styling of the Less bad button. It always wins. Each theme's CSS goes in the `theme` layer.

## In the browser

A tiny inline script in `<head>`, allowed by its hash in the CSP, picks the theme before anything is drawn:

1. `?bad=<id>` in the URL → that theme.
2. The reader escaped before (localStorage) → Not Bad.
3. A theme was already picked this visit (sessionStorage) → that theme.
4. Otherwise → a random `front_door` theme, saved for this visit.

Every storage read and write is wrapped in try/catch. If storage is blocked, the switcher adds `?bad=<id>` to internal links instead, so the theme or the escape survives from page to page.

Without JavaScript, the page links Not Bad. Printing always uses Not Bad. Readers who ask for reduced motion get still versions of the themes.

The switcher script is small and loads deferred:

- **More bad:**
  - Deals the next theme from a shuffled deck, kept for the visit.
  - Plays a short spin with no theme names, skipped under reduced motion.
  - Swaps stylesheets, runs `deactivate` and `activate`, and restores the reader's position.
  - Clears the escape flag.
- **Less bad:**
  - Switches to Not Bad at once, with no animation (it's already loaded), and restores the reader's position.
  - Sets the escape flag.
  - Opens the escape note in the bar with the theme's `rules_broken`, and announces it in the live region.
- **Keeping the reader's place:** before switching, note which block of the article is at the top of the screen and how far into it the reader is. After switching, scroll back to it. Pixel positions don't survive a change of layout, so don't use them.
- **Prefetch:** the next theme in the deck is fetched when the browser is idle, so More bad switches instantly.
- Crossfade with the View Transitions API where the browser has it.
- A post's `bad:` front matter limits the deck or turns it off.

## Hit counter

- `netlify/functions/hit` plus one Netlify Blobs store, where each key is a page path and each value is a count.
- The page makes one request per page per visit (marked in sessionStorage), in every theme, after it has loaded. The function checks the path against an allow-list generated at build time, adds one, and returns the count.
- It stores nothing about visitors. Two hits at the same instant may occasionally count as one; that's accepted.
- Only Under Construction shows the number. Readers without JavaScript aren't counted.
- The owner reads the totals through the Netlify CLI or dashboard, or through a small read endpoint. The counts are public anyway, via Under Construction.

## Netlify

- `netlify.toml` pins `HUGO_VERSION` and sets the headers.
- **Headers:**
  - Content security policy: `default-src 'self'; script-src 'self' 'sha256-…'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`.
  - Also `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive `Permissions-Policy`.
  - Fingerprinted assets get `Cache-Control: public, max-age=31536000, immutable`.
- **Credits** (Free plan, as of October 2026; check the current rates):
  - A hard cap of 300 credits a month, shared by every project on the team.
  - Each production deploy costs 15; bandwidth costs 20 per GB; requests cost 2 per 10,000; function compute costs 10 per GB-hour.
  - A first-visit page view of about 400KB costs roughly 0.01 credits, so about 30,000 a month fit. The counter adds about 5%.
- **Budgets:**
  - First visit: about 250KB or less, not counting post images.
  - Bar and switcher JavaScript: about 8KB or less.
  - Each theme's CSS, fonts and assets: about 150KB or less.
  - Post images are the biggest lever: resize them, use modern formats, and lazy-load them.
- **Deploys:** production deploys happen only on merge to main, so batch your work. Review themes from the CI screenshot gallery. Before relying on deploy previews, check whether they use credits.

## Testing

Playwright and axe-core, run in GitHub Actions. These are development-only dependencies; nothing from them reaches the site.

The matrix: every shipped theme plus Not Bad × widths of 360, 768 and 1440px × the home page and the kitchen-sink post.

Checks:
- No horizontal overflow (`scrollWidth <= innerWidth`), including at 320px and at 200% zoom.
- axe: contrast for `.post-body` text and code tokens in tier 2 themes; focus and ARIA rules on the whole page.
- The bar is visible on load, and Less bad is in its fixed position, with targets of at least 44px and keyboard focus.
- With reduced motion emulated, `document.getAnimations()` returns nothing.
- With `forced-colors: active`, the article stays readable.
- Broken internal links and missing alt text fail the build.
- The smell lint (planned) runs over shipped CSS and templates.

The kitchen-sink post (`content/posts/kitchen-sink/`, a draft in production) holds every Markdown feature and the nasty cases:
- an unbroken 60-character URL
- a 4000px-wide image and a very tall one
- a wide table
- code in several languages, including a 200-character line
- inline code inside headings and links
- footnotes, nested lists and long blockquotes

The output is a screenshot gallery of every combination, with `_control` beside each theme, saved as a CI artifact for the owner to review.
