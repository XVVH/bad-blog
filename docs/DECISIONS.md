# Decisions

Settled during planning in October 2026. Each entry says what was decided, why, and what was rejected, so none of it needs deciding again. Changing an entry needs the owner's agreement; when one changes, edit it and add the date. Open questions are tracked in [ROADMAP.md](ROADMAP.md#open-questions).

## Product

**D1. Markdown to static site; no CMS.** Less to manage, smaller security footprint. *Rejected:* any CMS, database or admin interface.

**D2. Bad means taste, not hostility, age or engineering.** See [INTENT.md](INTENT.md). *Rejected:* dark patterns, "old = bad" as the joke, broken layouts. Since D23, taste means a design principle broken on purpose.

**D3. Several bad themes, switchable while reading.** More bad spins to another bad theme; Less bad escapes to Not Bad.

**D4. The default AI look doesn't ship.** This is the foundation of the project: the blog is a counterweight to the AI design smell and an experiment in what bad design means to an LLM. The smell exists only as `_control`, the dev-only scaffold and baseline. *Rejected:* "✨ The Default" as a launch theme. It was proposed during planning and cut by the owner.

**D5. Content needs:** links between posts, external links, images and code blocks. Footnotes, tables, smart quotes and heading anchors are planned too. Nothing to migrate; all content is new.

**D5a. The site is called "Turrible Takes".** The misspelling is intentional. Never correct it.

## The escape hatch

**D6. Less bad is a single step: any bad theme goes straight to Not Bad.** Its job is to save a reader who's about to leave. *Rejected:* a "Mercy" middle level (bad frame, readable article) and a ladder of decreasing badness.

**D7. Escaping is instant, keeps the reader's place, and sticks.** Not Bad's stylesheet is always preloaded. The reader is returned to the paragraph that was at the top of their screen. The choice holds on every page and future visit until they press More bad.

**D8. Less bad is the fire exit:** identical in every theme, top right, not themeable.

**D9. The joke is explained only after an escape.** In bad themes the bar shows only the two buttons. Escaping opens a note in the bar. Its message is the owner's copy, used verbatim:

> This site was designed to be intentionally jarring from a design perspective. If that’s getting in the way of your enjoyment, here’s a more friendly view.

Below it, as secondary detail, the note names the theme they escaped from and lists the rules it broke (its `rules_broken`). The note shows once per escape, isn't a popup, can be dismissed, and is announced to screen readers. *Rejected:* explaining on first visit (owner: "far too easy"); theme names or a badness meter in the bar; rules-broken footers in bad themes; spins that show theme names; a theme index reachable from bad themes.

## Visits and themes

**D10. A first visit gets a random theme**, from themes marked `front_door` (all launch themes).

**D11. The theme stays the same within a visit and is re-rolled on the next visit**, unless the reader escaped. A `?bad=<id>` link overrides this, for sharing.

**D12. More bad deals from a shuffled deck**, so every theme is seen before any repeats. The next theme is fetched in the background.

**D12a. More bad spins first:** three little slot-machine reels in the bar for about 0.6 seconds, with no theme names, skipped under reduced motion. The reels scroll rather than flicker, so nothing flashes.

**D12b. Asking for a bad theme by name ends an escape.** A `?bad=<id>` link to a bad theme (from the theme index, or shared) works like pressing More bad.

**D13. Launch themes are all legible** ([RULES.md](RULES.md) tier 2). Relaxing legibility is a later-phase conversation, and a theme that isn't legible leaves the first-visit lottery.

**D14. Launch set:** Under Construction, The Focus Group, Sidebar Hell, Haute and Office Suite. The backlog in [THEMES.md](THEMES.md) is open for riffing and expansion. *Superseded by D23, D24 and D24a (October 2026). Four of the five were costumes and retired; The Focus Group stayed.*

**D14a. No in-page citations.** The Focus Group was planned with every design choice footnoted with its study. That explains the joke, so it's out. The studies remain the theme's sources and can appear in its escape note.

**D14b. Device preferences never pick Not Bad.** A reader whose device asks for more contrast still gets a random bad theme (owner: "that's cheating"). Reduced motion gets still versions of the themes, not Not Bad. Only missing JavaScript and printing fall back to Not Bad, because those are technical fallbacks, not preferences.

**D14c. The theme index lives at `/designs/`.** It names every theme and the rules each breaks, with a link to try each one. It's always shown in Not Bad (`bad: false`), and it's linked only from Not Bad: from the escape note and from a footer link that the floor hides in every bad theme.

**D15. Posts can opt out.** `bad: false` keeps a post in Not Bad; `bad: [ids]` limits it to the listed themes. This is for posts where the joke doesn't fit.

## Stack and hosting

**D16. Hugo.** One pinned program with no npm dependency tree in the build. It has page bundles, render hooks, image processing, built-in JavaScript bundling, RSS, a sitemap and tags. *Rejected:* Eleventy (npm dependency tree), Astro (heavier).

**D17. One semantic HTML structure; themes are skins** (the CSS Zen Garden approach). *Rejected:* separate HTML per theme, which multiplies builds and breaks instant switching.

**D18. Netlify**, where the owner's other sites live. The account is on the Free plan for now and may upgrade. Production deploys are batched, because each costs 15 credits from a 300-credit monthly cap.

**D19. Domain.** The blog takes `synchromeshi.com` at launch. The site there now is the owner's Apple Music library listing, their first AI dev project. It retires for now, and the owner may rebuild it later. Its old URLs fall through to the blog's 404 page, so no redirects are needed. Posts live under `/posts/<slug>/` to keep the top level free, and the build works under a subpath.

**D20. Hit counts only; no analytics.** Netlify's built-in analytics keeps 1, 7 or 30 days of history depending on plan, so the blog runs its own counter: a Netlify Function plus Netlify Blobs storing page path and count. Each page is counted once per visit, in every theme. Only paths that exist are accepted. No IPs, cookies or visitor input are stored. Only The Small Print displays the number, enormous, because it's the least important thing on the page (Under Construction showed it as an odometer until it retired, D24a). *Rejected:* Netlify Real User Monitoring (injects a script), theme-switch beacons, any analytics service.

**D21. No guestbook or any other form.** The owner considers it too prone to abuse. If a theme ever wants one for the look, it is a static guestbook signed only by the owner, with no form and no email address.

**D22. No third-party requests.** Fonts are self-hosted, with no CDNs, embeds or trackers.

## How themes are made

**D23. Themes start from a broken design principle, never from a borrowed interface** (October 2026). Each theme takes one principle of structure, typography or colour, with a source, and follows a wrong version of it faithfully on every surface. Two reasons, both the owner's. Pastiche has swung from bad to good: GeoCities and XTREME "have become funny to use ironically". And the first themes were each "based on something that existed before and just built as it existed", which tests a model's memory rather than its taste. The costume test in [THEMES.md](THEMES.md#the-costume-test) enforces this. *Rejected:* recreating eras, sites, programs or genres (the first launch set's method, and the old backlog); designer-bad styles such as brutalism or deconstructivism as the alternative, because they're good taste now.

**D24. A new launch set, picked by the owner from the shortlist in [THEMES.md](THEMES.md#the-shortlist-october-2026)** (October 2026). Under Construction, Sidebar Hell and Office Suite are costumes: they leave the rotation when their replacements ship, and stay in git history. Haute is a costume around a real mechanism, and can be reworked (as Breathing Room), kept or retired. The Focus Group already starts from research rather than an interface, and stays, subject to review. Until the new themes ship, the live site keeps all five, so it's never short of themes. No new theme is built until the owner has picked.

**D24a. The owner's pick** (October 2026): Keep Your Distance, The Small Print, Variety Pack, Vibrant and The Focus Group, plus Breathing Room combined with Pop of Colour as one theme. **Haute retires** with the other three costumes, and Breathing Room is built new rather than reworked from it. Fully Justified waits on the back burner, with the owner's twist: everything justified into one narrow middle slice of the page, rather than across a full-width column. Mixed Signals isn't picked.
