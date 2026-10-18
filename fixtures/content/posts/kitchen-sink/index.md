---
title: "The kitchen sink: every Markdown feature, and the nasty cases that break layouts"
date: 2026-10-17
description: "A fixture post. Every theme must survive this page at every width."
tags: [fixtures, testing, a-tag-with-a-rather-long-name-that-should-still-wrap]
---

This post exists to break themes. It holds every Markdown feature the blog supports, plus the cases that usually cause sideways scrolling on a phone. If a theme survives this page at 320 pixels wide, it will survive anything the author writes. It's a development fixture and never appears in production builds.

The opening paragraph is deliberately long, because body text is what readers spend their time with. A theme can do anything it likes to the chrome, but these lines have to stay comfortable to read: a sensible size, enough space between lines, and lines that don't run on forever. Here is some *italic text*, some **bold text**, some ***bold italic***, a bit of `inline code`, and ~~struck-through text~~. "Smart quotes" and 'single quotes' should curl, the apostrophe in it's should too, dashes -- like this -- should become en dashes, and three dots... should become an ellipsis.

## Links of every kind

A link to [another post using its folder](../sample-one/), a link to [another post using its Markdown file](../sample-two/index.md), and a link to [the about page](/about/). Internal links that don't resolve fail the build, so these are checked every time.

An [external link to the Hugo documentation](https://gohugo.io/documentation/) should be marked as external in a way each theme chooses. A bare URL becomes a link too: https://example.com/a/deliberately/long/path/that-keeps-going-without-any-natural-break-points-at-all?and=a&query=string

Here is an unbroken string with no spaces at all: Supercalifragilisticexpialidociouslyunbreakablewordthatgoesonandonandon. It must wrap rather than push the page sideways.

A link to [a heading on this page](#code-blocks), and a [link whose text is long enough to wrap across more than one line on a narrow phone screen](https://example.com/).

## Headings, with `code` and [links](https://example.com/) inside them

### A third-level heading

#### A fourth-level heading, which is as deep as posts are expected to go

Some text after a fourth-level heading, so the spacing below it can be judged.

## Lists

Unordered:

- A short item.
- An item long enough to wrap onto a second line on most screens, so that the hanging indent can be checked properly.
- An item with nested items:
  - A nested item.
  - Another nested item, also long enough to wrap onto a second line on a narrow screen.
    - A third level, because someone will eventually do this.

Ordered:

1. First.
2. Second, with a paragraph's worth of text so that the number and the wrapped lines can be checked for alignment against each other.
3. Third.
10. Tenth, to check that two-digit numbers still line up.

A task list:

- [x] Done.
- [ ] Not done.

A definition list:

Theme
: A stylesheet laid over the same page.

Not Bad
: The readable theme, where escapees land.

## Quotes

> A blockquote that runs long enough to wrap onto several lines. Themes turn blockquotes into all sorts of things, but the words inside must stay readable, and the quote must not overflow its container on a narrow screen.
>
> A second paragraph inside the same quote.
>
> > A quote inside a quote.

## Code blocks

A JavaScript block with a highlighted line:

```js {hl_lines=[3]}
// Deal the next theme from a shuffled deck.
function deal(deck, current) {
  const next = deck.find((id) => id !== current);
  return next ?? null;
}
```

A Python block:

```python
def count_hits(store, path: str) -> int:
    """Add one to a page's count and return the new total."""
    current = int(store.get(path) or 0)
    store.set(path, str(current + 1))
    return current + 1
```

A CSS block with a line that is far too long for any screen, which must scroll inside the block and never push the page sideways:

```css
:root[data-theme="example"] .post-body > p:first-of-type::first-line { font-variant-caps: all-small-caps; letter-spacing: 0.08em; text-decoration: underline wavy hotpink 2px; text-underline-offset: 0.3em; }
```

A shell block:

```bash
hugo --gc --minify -b "$URL" && echo "built"
```

A block with no language at all:

```
Plain preformatted text.
    Indented by four spaces.
```

## A wide table

| Planet | Type | Moons | Day length | Year length | Distance from the Sun | Rings | Notes |
|---|---|--:|---|---|---|:-:|---|
| Mercury | rocky | 0 | 59 Earth days | 88 Earth days | 58 million km | no | The smallest planet, and the closest to the Sun |
| Venus | rocky | 0 | 243 Earth days | 225 Earth days | 108 million km | no | Its day is longer than its year |
| Jupiter | gas giant | 95 | 10 hours | 12 Earth years | 778 million km | yes | Faint rings that are hard to see |
| Neptune | ice giant | 16 | 16 hours | 165 Earth years | 4.5 billion km | yes | The windiest planet |

## Images

A very wide image with a caption:

![A wide diagonal-striped gradient used to test that wide images shrink to fit](wide.jpg "A 4000-pixel-wide image. It must shrink to fit, never overflow.")

A photo-sized image without a caption:

![A striped gradient at a typical photo size](photo.jpg)

A very tall image:

![A tall striped gradient used to test that tall images keep their proportions](tall.jpg "A tall image, 700 by 2600 pixels.")

## Footnotes and the rest

A sentence with a footnote.[^short] Another with a longer one.[^long]

---

The rule above is a thematic break. This is the last paragraph of the kitchen sink.

[^short]: A short footnote.

[^long]: A long footnote that runs for several lines, contains a [link](https://example.com/), some `inline code`, and enough words to check that footnote text wraps properly and stays readable at a smaller size.
