# Intent

## What this is

**Turrible Takes** (misspelled on purpose) is a personal blog for long-form writing, built from Markdown into a static site. No CMS, no database, no comments: less to manage and less to secure. The writing is the point; the designs are the joke.

## Why the designs are bad

Most websites built by AI share a look. Ask a model for a blog, a portfolio or a landing page without steering it, and you get [the smell](SMELL.md): the same sans-serif, the same indigo-to-violet accent, the same rounded cards and soft shadows, the same tasteful restraint. It isn't bad engineering. It's a monoculture.

This blog is a counterweight to that, and an experiment:

> What does "bad design" mean to a frontier LLM, when it is asked to commit to bad taste rather than avoid it?

The model building the themes is the subject of the experiment as much as its author. Its instincts pull toward the smell, or toward "designer-bad": an ironic, curated ugliness that is really just another kind of good taste. Each theme is an attempt to get past both. The theme journals in [`themes/`](themes/) are the record of how that went.

The first launch set found a third pull. Asked for bad design, the model reached for things already known to be bad and recreated them: GeoCities, a 2006 blog, PowerPoint 2003, a luxury fashion site. Those are memories, not taste. And irony has turned most of them good: people now use GeoCities and XTREME styling for fun. So since October 2026, a theme starts from a design principle and breaks it, rather than from something that already exists ([DECISIONS.md](DECISIONS.md) D23).

## What "bad" means here

Bad means a **design principle broken on purpose**, along three axes:

- **Structure:** grouping, alignment, hierarchy, density, rhythm.
- **Typography:** scale, spacing, texture, consistency, fit for the job.
- **Colour:** value, proportion, harmony, meaning.

Each principle has a source (Gestalt psychology, book typography, colour theory, preference research), and each theme follows a wrong version of one, faithfully. [THEMES.md](THEMES.md) lists principles to break. Graphics and decoration are no longer an axis of their own: kitsch, clip art and tired trends are costume material. A theme can still draw things when its principle calls for them.

Bad does **not** mean:

- **Hostile.** Nothing tricks, traps, blocks or pesters the reader. No popups, autoplay, scroll hijacking or fake buttons.
- **A costume.** Recreating an era, a site, a program or a genre is retrieval, and the reader is in on the joke. If a reader could name what a theme imitates, it's a costume ([THEMES.md](THEMES.md#the-costume-test)). That includes "it's old": age is never the joke.
- **Badly engineered.** Every page works on desktop and mobile, loads fast, and is accessible and readable. The engineering should be better than the designs deserve.

## Principles

1. **Bad taste, executed well.** Each theme takes one design principle, with a source, and follows the wrong version of it on every surface, built with care. Half-hearted bad just looks like a broken site. The wrong rule is followed sincerely: bad taste believes in itself, where designer-bad is making a point.
2. **The badness is only a skin.** One Markdown file becomes one clean, semantic HTML page; themes are stylesheets laid over it (the CSS Zen Garden approach). Feed readers, print, search engines and screen readers get the plain writing.
3. **The reader can always leave.** Less bad is an escape hatch, there to save the reader in the second before they close the tab. It's instant, keeps their place, and sticks.
4. **Don't explain the joke.** A reader discovers it, or escapes from it. The explanation is the reward for escaping, never the welcome.
5. **Not Bad is genuinely good, and doesn't smell.** The readable theme is built from book typography, not from the default AI look. If Not Bad looks like the smell, the whole joke undermines itself.
6. **Nothing extra to write.** The author writes plain Markdown once. Themes derive all their decoration from the content.

## Who decides

The site's owner is the judge of taste and of whether something smells. Agents propose, build and record; the owner reviews the screenshot galleries and decides.
