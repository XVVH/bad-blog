// The screenshot gallery: every theme at every width on the main pages, with
// _control (the smell) shown first as the baseline. The owner reviews it;
// it's how taste gets judged (docs/INTENT.md, "Who decides").
//
// Runs only when GALLERY=1. Output: gallery/index.html plus PNGs.
import { mkdirSync, writeFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { loadImages, THEMES } from "./helpers.mjs";

test.skip(!process.env.GALLERY, "set GALLERY=1 to build the screenshot gallery");

const OUT = "gallery";
const PAGES = [
  ["home", "/"],
  ["post", "/posts/kitchen-sink/"],
  ["short", "/posts/sample-two/"],
  ["404", "/no-such-page/"],
];
const VIEWS = [
  ["phone", 375, 812],
  ["desktop", 1366, 900],
];
const order = [...THEMES].sort((a, b) => (a.id === "_control" ? -1 : b.id === "_control" ? 1 : 0));
const shots = [];

for (const t of order) {
  for (const [pageName, path] of PAGES) {
    for (const [view, width, height] of VIEWS) {
      const file = `${t.id}-${pageName}-${view}.png`;
      shots.push({ theme: t, pageName, view, file });
      test(`${t.id} ${pageName} ${view}`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.goto(`${path}?bad=${t.id}`);
        await loadImages(page);
        await page.waitForTimeout(200);
        mkdirSync(OUT, { recursive: true });
        await page.screenshot({ path: `${OUT}/${file}`, fullPage: true, animations: "disabled" });
        expect(true).toBe(true);
      });
    }
  }
}

test.afterAll(() => {
  if (!process.env.GALLERY) return;
  const rows = order
    .map((t) => {
      const cells = PAGES.flatMap(([pageName]) =>
        VIEWS.map(([view]) => {
          const file = `${t.id}-${pageName}-${view}.png`;
          return `<figure><a href="${file}"><img src="${file}" alt="${t.name}, ${pageName}, ${view}" loading="lazy"></a><figcaption>${pageName} · ${view}</figcaption></figure>`;
        }),
      ).join("");
      return `<section><h2>${t.name} <code>${t.id}</code></h2><div class="row">${cells}</div></section>`;
    })
    .join("\n");
  writeFileSync(
    `${OUT}/index.html`,
    `<!doctype html><meta charset="utf-8"><title>Theme gallery</title>
<style>body{font:16px/1.4 system-ui,sans-serif;margin:16px}h2{margin:32px 0 8px}.row{display:flex;gap:12px;overflow-x:auto;align-items:flex-start}figure{margin:0;flex:0 0 auto}img{display:block;width:220px;height:auto;border:1px solid #999}figcaption{font-size:13px}</style>
<h1>Theme gallery</h1><p>The control (the default AI look) comes first, as the baseline. Full-page screenshots; click to open.</p>
${rows}`,
  );
});
