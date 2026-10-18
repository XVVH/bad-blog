# Architecture

*Phase 0 (the plumbing) is built, as of October 2026. Where the code and this file disagree, fix one of them.*

## Overview

Markdown → Hugo → one semantic HTML page per post → styled by one stylesheet that holds every theme, each scoped to `:root[data-theme="<id>"]`. A tiny script in the page head sets `data-theme` before anything is drawn, so switching themes is just changing that attribute. Netlify serves the static output, and one Netlify Function runs the hit counter.

## Commands

```sh
npm ci                  # test tools and the function's one dependency
hugo server             # local preview, development environment (fixtures and _control included)
npm test                # theme lint, unit tests, production checks, test build, browser tests
GALLERY=1 npx playwright test tests/gallery.spec.mjs   # screenshot gallery in gallery/
npm run serve           # serve the test build (.test-site) the way Netlify would, with _headers applied
```

Hugo is pinned to the version in `netlify.toml` and `.github/workflows/ci.yml`; keep the two in step.

## Environments

- **Production** (`hugo`): real content only. `_control` and its CSS are left out entirely.
- **Development** (`hugo server`, `npm run build:test`): `config/development/hugo.toml` also mounts `fixtures/content/` (the kitchen sink and sample posts), and `_control` is included. CI tests this build.

## Content

- Posts are Hugo page bundles: `content/posts/<slug>/index.md`, with the post's images beside it.
- Fixture posts live in `fixtures/content/posts/` and exist only in development builds.
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
  - Missing alt text produces a warning locally and fails in CI (`--panicOnWarning`). A Markdown image title becomes a `<figcaption>`; a stand-alone image becomes a `<figure>`.
  - Remote images produce a warning: they send readers' requests to a third party, and they cost nothing to bring local.
- **Code** (`render-codeblock.html`): Hugo's built-in highlighter (Chroma) with `noClasses = false`, so the output is spans with classes and each theme ships its own token colours. Supports `{hl_lines=[3]}`. Wrapped in `<figure class="code" data-lang="…">` with the language as a caption. Long lines scroll inside the `<pre>`, which Chroma makes focusable.
- **Tables** (`render-table.html`): wrapped in a focusable `.table-scroll` box so wide tables scroll inside it. Alignment uses classes, because the content security policy forbids inline `style` attributes.
- **Headings** (`render-heading.html`): each gets a `#` self-link (`.h-anchor`).
- **Task lists:** `_partials/content.html` gives the checkboxes accessible names; Goldmark has no hook for them.
- **Extras:** footnotes, tables, smart quotes and heading anchors. Raw HTML in Markdown is off (`unsafe = false`).

## The markup contract

Every page type renders the same semantic skeleton, in every theme (`layouts/baseof.html`):

```html
<body>
  <a class="skip" href="#content">Skip to article</a>
  <div class="bar" role="group" aria-label="Design controls">
    <div class="bar-inner">.bar-more · .bar-plain · .bar-less</div>
    <div class="bar-note" hidden>the escape note</div>
  </div>
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
    <footer class="site-foot">site name, <span class="hits-count"> (the hit counter)</footer>
    <div class="deco" aria-hidden="true"><span></span><!-- ×8 --></div>
  </div>
  <div class="sr-live" aria-live="polite"></div>
</body>
```

- The rails (`aside` sidebars) hold real, useful content. Themes may hide them, move them or put them centre stage; Sidebar Hell lives in them.
- The `.deco` spans are empty hooks for decoration. Anything a theme injects goes inside an `aria-hidden` container.
- Themes rearrange the page with CSS grid. A theme may not change the HTML for itself alone; if it needs a new hook, add it for every theme.
- Decoration comes from the content, never from extra authoring: "NEW!" from the post date (`data-fresh` marks posts under 14 days old at build time), emoji or clip art chosen by hashing the heading text, testimonials from existing blockquotes, numbers from the hit counter.
- Hooks themes can rely on: `.deco` and `.hits` (hidden until a theme shows them), `data-fresh` on recent list items, `data-count` on tags, `data-date` on archive entries, `data-lang` on code figures, `html[data-hits]` once the counter answers.

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

`theme.css` must look like this (`npm run lint` checks it):

```css
@font-face { font-family: "…"; src: url("../themes/<id>/fonts/x.woff2") format("woff2"); }
@keyframes <id>-wobble { … }

@layer theme {
  :root[data-theme="<id>"] {
    /* every rule nested here, using native CSS nesting */
  }
}
```

- Only `@font-face`, `@keyframes` and `@property` may sit outside `@layer theme`. `@keyframes` names start with `<id>-`.
- No `!important`, so the floor always wins.
- `url()` points at files in the theme's own folder, written as `../themes/<id>/…` (they're published next to the CSS bundle), or at `data:` URIs. Never at another site.
- Font files need a licence file beside them.

Decorative text from CSS uses empty alternative text, `content: "…" / ""`, so screen readers skip it.

If `theme.js` exists, it exports `activate(root, api)` and `deactivate(root)`. `deactivate` removes everything `activate` added. Everything a theme script injects carries a `data-tt-deco` attribute and `aria-hidden="true"`; the floor hides `[data-tt-deco]` in Not Bad, so printing and escaping never show it. `api.hits()` returns the hit count once known, and a `tt:hits` event fires on `document` when it arrives. `api.reducedMotion()` says whether to stay still. Theme scripts may not make network requests.

`layouts/_partials/assets.html` builds everything: one CSS bundle (`_base`, every theme, then `_floor`), each theme's script, the inline boot script and the switcher, plus the manifest the browser reads (`<script type="application/json" id="tt-manifest">`). Production builds leave out `_control`.

**Why one bundle:** every theme's CSS is scoped, so loading them all costs only bytes (a few KB each, compressed) and makes switching instant, with no flash of the wrong theme. Fonts and images still load only when a theme uses them. If the bundle ever gets too big, split it; until then, simplicity wins. The CSS isn't minified, because Hugo's minifier doesn't fully understand native nesting.

## Cascade layers

```css
@layer reset, base, theme, floor;
```

`floor` holds tier 1 of [RULES.md](RULES.md): overflow handling, visible focus, the reduced-motion shutdown, the bar's position, and the fire exit. It always wins, because themes can't use `!important`. Each theme's CSS goes in the `theme` layer.

What the floor locks:
- `html` and `body` take no `filter`, `transform`, `opacity` or blend modes, because those would reach the bar. Put global effects on `.page`.
- The bar is sticky at the top. Its row (`.bar-inner`) runs edge to edge with fixed padding, so the fire exit sits top right in every theme.
- `.bar-less` is reset with `all: unset` and restyled completely: a green exit sign (`#00703c`, white bold text, Frutiger/Helvetica/Arial), at least 44×44px, with a yellow-and-black focus ring. Its pseudo-elements and label can't be touched.
- Both buttons' accessible names are pinned with `aria-label`. A theme can restyle and decorate More bad, but its visible text must still read "More bad" (WCAG 2.5.3).

## In the browser

A tiny inline script in `<head>` (`assets/js/boot.js`), allowed by its hash in the CSP, picks the theme before anything is drawn:

1. `?bad=<id>` in the URL → that theme.
2. The reader escaped before (localStorage) → Not Bad.
3. A theme was already picked this visit (sessionStorage) → that theme.
4. Otherwise → a random `front_door` theme, saved for this visit.

Every storage read and write is wrapped in try/catch. If storage is blocked, the switcher adds `?bad=<id>` to internal links instead, so the theme or the escape survives from page to page.

Without JavaScript, the page keeps the `data-theme="not-bad"` it was built with, and the bar is hidden. Printing always uses Not Bad. Readers who ask for reduced motion get still versions of the themes. No device preference (contrast, motion, colour scheme) ever selects Not Bad (D14b in DECISIONS.md).

The switcher (`assets/js/switcher.js`) is a small module, deferred:

- **More bad:**
  - Deals the next theme from a shuffled deck, kept for the visit.
  - Crossfades to the new theme with the View Transitions API where the browser has it, skipped under reduced motion. (A short nameless spin is planned for phase 2.)
  - Changes `data-theme`, runs the old theme's `deactivate` and the new one's `activate`, and restores the reader's position.
  - Clears the escape flag.
- **Less bad:**
  - Switches to Not Bad at once, with no animation (it's already loaded), and restores the reader's position.
  - Sets the escape flag.
  - Opens the escape note in the bar and moves focus to it, so screen readers read it (the button that was pressed has gone). The note is the owner's copy (D9 in DECISIONS.md), followed by the theme's name and its `rules_broken`. All site copy lives in `data/copy.yaml`.
- **Keeping the reader's place:** before switching, note which block of the article is at the top of the screen and how far into it the reader is. After switching, scroll back to it. Pixel positions don't survive a change of layout, so don't use them.
- **Prefetch:** the next theme in the deck has its script (if any) preloaded when the browser is idle. The CSS is already loaded.
- A post's `bad:` front matter limits the deck or turns it off.

## Hit counter

- `netlify/functions/hit` plus one Netlify Blobs store, where each key is a page path and each value is a count.
- Code: `netlify/functions/hit/counter.mjs` (the logic, unit-tested with a fake store) and `hit.mjs` (wires in Blobs). Served at `/api/hit`.
- The page makes one `POST` per page per visit (marked in sessionStorage), in every theme, after it has loaded. The body is the page path. The function checks it against the allow-list Hugo generates (`hits-allowlist.json`, copied into the function by the build command), adds one, and returns `{ path, count }`. `GET /api/hit?path=…` reads a count without adding to it. There's no endpoint that lists everything.
- It stores nothing about visitors. Two hits at the same instant may occasionally count as one; that's accepted.
- Only Under Construction shows the number. Readers without JavaScript aren't counted.
- The owner reads the totals through the Netlify dashboard or CLI (`netlify blobs:list hits`). Single counts are public anyway, via Under Construction.
- `tests/serve.mjs` runs the same logic against an in-memory store, so the counter works in local tests.
- If the site is ever served under a subpath, `config.path` in `hit.mjs` must change to match.

## Netlify

- `netlify.toml` pins `HUGO_VERSION`, sets the build commands (with `-b $URL` or `-b $DEPLOY_PRIME_URL`), and skips dev dependencies on Netlify.
- **Headers** are generated by Hugo into `public/_headers` from `layouts/home.headers`, so the script hash is always right. HTML minification leaves inline JavaScript alone (`[minify] disableJS = true`) for the same reason; `js.Build` has already minified it.
  - Content security policy: `default-src 'self'; script-src 'self' 'sha256-…'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`.
  - Also `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive `Permissions-Policy`.
  - Fingerprinted assets (`/css/*`, `/js/*`) get `Cache-Control: public, max-age=31536000, immutable`; theme fonts and images (`/themes/*`) get a week.
- **Credits** (Free plan, as of October 2026; check the current rates):
  - A hard cap of 300 credits a month, shared by every project on the team.
  - Each production deploy costs 15; bandwidth costs 20 per GB; requests cost 2 per 10,000; function compute costs 10 per GB-hour.
  - A first-visit page view of about 400KB costs roughly 0.01 credits, so about 30,000 a month fit. The counter adds about 5%.
- **Budgets:**
  - First visit: about 250KB or less, not counting post images.
  - Bar and switcher JavaScript: about 8KB or less.
  - Each theme's CSS, fonts and assets: about 150KB or less. Every theme's CSS is in the one bundle, so keep theme CSS lean.
  - Post images are the biggest lever: resize them, use modern formats, and lazy-load them.
- **Deploys:** production deploys happen only on merge to main, so batch your work. Review themes from the CI screenshot gallery. Before relying on deploy previews, check whether they use credits.

## Testing

Playwright and axe-core, run in GitHub Actions (`.github/workflows/ci.yml`). These are development-only dependencies; nothing from them reaches the site. The theme list comes from the built manifest, so a new theme is tested automatically.

- `scripts/lint-themes.mjs`: the theme package contract above.
- `tests/counter.test.mjs`: the hit counter's logic.
- `tests/production.test.mjs`: builds production and checks that `_control` and fixtures don't ship, the CSP hash matches the inline script, and there are no third-party assets or inline styles.
- `tests/floor.spec.mjs`: the matrix below.
- `tests/behaviour.spec.mjs`: first visits, the deck, the escape and its note, persistence, `bad: false`, no-JS, blocked storage, printing, the hit counter.
- `tests/gallery.spec.mjs`: the screenshot gallery (only with `GALLERY=1`).

The matrix: every theme in the development build (including `_control` and Not Bad) × widths of 320, 375, 768 and 1440px × the home page and the kitchen-sink post.

Checks:
- No horizontal overflow (`scrollWidth <= innerWidth`), down to 320px.
- axe: contrast for `.post-body` text and code tokens in tier 2 themes; focus and ARIA rules on the whole page.
- The bar is visible on load, and Less bad is in its fixed position, with targets of at least 44px and keyboard focus.
- With reduced motion emulated, `document.getAnimations()` returns nothing.
- With `forced-colors: active`, the article and the fire exit stay visible.
- No content security policy violations, page errors or console errors.
- Body text in legible themes is at least 16px, with line height at least 1.4 and lines under about 90 characters.
- Broken internal links and missing alt text fail the build.
- The smell lint (planned) runs over shipped CSS and templates.

The kitchen-sink post (`content/posts/kitchen-sink/`, a draft in production) holds every Markdown feature and the nasty cases:
- an unbroken 60-character URL
- a 4000px-wide image and a very tall one
- a wide table
- code in several languages, including a 200-character line
- inline code inside headings and links
- footnotes, nested lists and long blockquotes

The gallery covers every theme × home, the kitchen sink, a short post and the 404 page × phone and desktop, with `_control` first as the baseline. CI saves it as an artifact named `gallery` for the owner to review.
