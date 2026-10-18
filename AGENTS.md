# Turrible Takes: read this first

This repository is **Turrible Takes**, a Markdown-to-static-site blog whose designs are **bad on purpose**. Before you change anything, understand why. The most likely way to damage this project is to "improve" it.

## The short version

- Almost every AI-built website has the same design smell. This blog is the counterweight to that smell, and an experiment in what "bad" design means to a frontier LLM. If you are a model, your instincts are the thing under test.
- "Bad" means bad **taste**: palette, type, layout, graphics. It never means hostile to the reader, broken on mobile, or badly engineered.
- Every page renders in one of several bad themes. **More bad** spins to another one. **Less bad** is the escape hatch to a readable theme called **Not Bad**, for a reader who's about to leave.
- The joke is never explained until someone escapes.

## Read before touching anything

1. [`docs/INTENT.md`](docs/INTENT.md): why this exists and what the experiment is.
2. [`docs/RULES.md`](docs/RULES.md): what a theme may never do, and what it may.
3. [`docs/SMELL.md`](docs/SMELL.md): the default AI design smell, surface and deep. Nothing that ships may carry it.
4. [`docs/DECISIONS.md`](docs/DECISIONS.md): settled decisions and the alternatives already rejected. Don't reopen them without the owner.

Then, depending on the task:
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): how it's built.
- [`docs/THEMES.md`](docs/THEMES.md): the catalogue and how to make a theme.
- [`docs/ROADMAP.md`](docs/ROADMAP.md): what's done, what's next, and the open questions.
- [`docs/themes/`](docs/themes/): one design journal per theme.

## Rules for agents

- **The name is "Turrible Takes".** The misspelling is deliberate. Never correct it, in copy, metadata or code.
- **Fix bugs, never fix taste.** In a bad theme, the ugliness is the spec. Breaking `docs/RULES.md` is a bug; a clashing colour is not.
- **Don't explain the joke** in any bad theme: no theme names, badness meters, "this is intentional" notes or rules-broken lists. Those live only in Not Bad, after an escape.
- **Don't restyle the Less bad button.** It is the fire exit: same place, shape and words in every theme.
- **Never ship `_control`** (the default-smell baseline), and never copy anything from it into a theme or Not Bad.
- **Don't add third-party requests**, trackers, comment systems, forms, or anything that accepts visitor input. The hit counter is the one server-side piece; see `docs/ARCHITECTURE.md`.
- **Batch production deploys.** On Netlify's Free plan each production deploy costs 15 credits, out of 300 a month shared by every project on the account.
- **Record what you learn.** When you design or change a theme, keep its journal in `docs/themes/` current, especially where your first instinct was the smell. That record is the experiment's data.
- When a decision changes, update `docs/DECISIONS.md`. When work lands, update `docs/ROADMAP.md`. When the build differs from `docs/ARCHITECTURE.md`, fix one of them.

## Working on it

```sh
npm ci          # test tools and the hit counter's one dependency
hugo server     # local preview, with fixture posts and _control
npm test        # lint, unit tests, production checks, browser tests
```

Run `npm test` before every push. More commands, and how everything fits together, are in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Status

Phases 0–2 are built and tested: the plumbing, Not Bad (a proposal awaiting the owner), and all five launch themes (Under Construction, Sidebar Hell, The Focus Group, Haute, Office Suite). What's left before launch is the owner's: review, Netlify, the domain. See [`docs/ROADMAP.md`](docs/ROADMAP.md).
