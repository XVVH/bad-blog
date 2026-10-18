---
title: "Notes on a hit counter"
date: 2026-09-30
description: "A fixture post about counting things that don't matter."
tags: [web, fixtures]
---

A hit counter is the most honest analytics product ever made. It tells you one number, it tells everyone else the same number, and it makes no claims about what the number means.

This fixture post links back to [the kitchen sink](../kitchen-sink/) and out to [the Internet Archive](https://archive.org/), so that both kinds of link appear on a short page as well as a long one.

```js
counter.textContent = String(hits).padStart(6, "0");
```

That's the whole implementation, more or less. Everything else is decoration.
