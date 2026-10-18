// Tier 1 and tier 2 of docs/RULES.md, checked for every theme at every
// width. A failure here is a bug in the theme, never a reason to relax the
// test.
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { animationEnds, loadImages, PAGES, problems, settle, THEMES, watch, WIDTHS } from "./helpers.mjs";

const EXIT = { background: "rgb(0, 112, 60)", color: "rgb(255, 255, 255)", weight: "700" };

for (const t of THEMES) {
  for (const path of PAGES) {
    test.describe(`${t.id} ${path}`, () => {
      for (const width of WIDTHS) {
        test(`never rules at ${width}px`, async ({ page }) => {
          await page.setViewportSize({ width, height: 800 });
          await watch(page);
          await page.goto(`${path}?bad=${t.id}`);
          await loadImages(page);
          await settle(page);
          expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe(t.id);

          // No sideways scrolling.
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          expect(overflow, "page scrolls sideways").toBeLessThanOrEqual(0);

          // The bar is at the top, and stays there after scrolling.
          const bar = page.locator(".bar");
          await expect(bar).toBeVisible();
          const more = page.getByRole("button", { name: "More bad", exact: true });
          await expect(more).toBeVisible();
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          expect(Math.round((await bar.boundingBox()).y)).toBe(0);

          const less = page.getByRole("button", { name: "Less bad", exact: true });
          if (t.id === "not-bad") {
            await expect(less).toBeHidden();
          } else {
            // The fire exit: visible, big enough, top right, identical everywhere.
            await expect(less).toBeVisible();
            const box = await less.boundingBox();
            expect(box.width).toBeGreaterThanOrEqual(44);
            expect(box.height).toBeGreaterThanOrEqual(44);
            expect(box.y).toBeLessThan(60);
            expect(box.x + box.width).toBeGreaterThan(width - 120);
            const style = await less.evaluate((el) => {
              const s = getComputedStyle(el);
              return { background: s.backgroundColor, color: s.color, weight: s.fontWeight };
            });
            expect(style).toEqual(EXIT);
          }

          // Content stays inside its boxes: the article holds its own text,
          // and the main regions never overlap each other.
          const boxes = await page.evaluate(() => {
            const r = (el) => el && el.getBoundingClientRect();
            const post = document.querySelector(".post");
            const kids = post ? [...post.querySelectorAll(":scope > .post-head, :scope > .post-body > *")].filter((k) => getComputedStyle(k).display !== "contents") : [];
            const spill = post ? kids.filter((k) => r(k).bottom > r(post).bottom + 1).map((k) => k.tagName + "." + k.className) : [];
            const regions = [".masthead", ".main", ".rail-a", ".rail-b", ".site-foot"]
              .map((s) => [s, document.querySelector(s)])
              .filter(([, el]) => el && el.offsetParent !== null && getComputedStyle(el).display !== "contents" && r(el).height > 0);
            const overlaps = [];
            for (let i = 0; i < regions.length; i++)
              for (let j = i + 1; j < regions.length; j++) {
                const a = r(regions[i][1]), b = r(regions[j][1]);
                const x = Math.min(a.right, b.right) - Math.max(a.left, b.left);
                const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
                if (x > 2 && y > 2) overlaps.push(`${regions[i][0]} overlaps ${regions[j][0]}`);
              }
            return { spill, overlaps };
          });
          expect(boxes.spill, "content spilling out of the article").toEqual([]);
          expect(boxes.overlaps, "page regions overlapping").toEqual([]);

          expect(await problems(page)).toEqual([]);
        });
      }

      test("everything that moves stops within five seconds", async ({ page }) => {
        // WCAG 2.2.2: anything that moves for more than five seconds needs a
        // pause button. Themes don't have one, so nothing may run longer.
        await page.goto(`${path}?bad=${t.id}`);
        const long = (await animationEnds(page)).filter((a) => a.end === null || a.end > 5000);
        expect(long, "animations that run past five seconds").toEqual([]);
      });

      test("accessibility", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(`${path}?bad=${t.id}`);
        await loadImages(page);
        await settle(page);
        const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
        const all = await new AxeBuilder({ page }).withTags(tags).disableRules(["color-contrast"]).analyze();
        expect(all.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
        if (t.legible) {
          // Tier 2: what's in <main> stays readable. The chrome is fair game.
          const contrast = await new AxeBuilder({ page }).include("main").withRules(["color-contrast"]).analyze();
          expect(contrast.violations.flatMap((v) => v.nodes.map((n) => `${n.target.join(" ")}: ${n.failureSummary}`))).toEqual([]);
        }
      });

      test("body text is legible", async ({ page }) => {
        test.skip(!t.legible || path === "/", "tier 2 applies to legible themes' article text");
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(`${path}?bad=${t.id}`);
        await loadImages(page);
        await settle(page);
        const p = await page.locator(".post-body > p").first().evaluate((el) => {
          const s = getComputedStyle(el);
          const size = parseFloat(s.fontSize);
          const line = s.lineHeight === "normal" ? size * 1.2 : parseFloat(s.lineHeight);
          const chars = el.getBoundingClientRect().width / (size * 0.5);
          return { size, ratio: line / size, chars };
        });
        expect(p.size, "body text at least 16px").toBeGreaterThanOrEqual(16);
        expect(p.ratio, "line height at least 1.4").toBeGreaterThanOrEqual(1.4);
        expect(p.chars, "lines under about 90 characters").toBeLessThanOrEqual(95);
      });

      test("reduced motion stops everything", async ({ browser }) => {
        const context = await browser.newContext({ reducedMotion: "reduce" });
        const page = await context.newPage();
        await page.goto(`${path}?bad=${t.id}`);
        await page.waitForTimeout(300);
        const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
        expect(running).toBe(0);
        await context.close();
      });

      test("forced colours keep the page usable", async ({ browser }) => {
        const context = await browser.newContext({ forcedColors: "active", viewport: { width: 375, height: 800 } });
        const page = await context.newPage();
        await page.goto(`${path}?bad=${t.id}`);
        await loadImages(page);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
        await expect(page.locator(".main")).toBeVisible();
        if (t.id !== "not-bad") await expect(page.getByRole("button", { name: "Less bad", exact: true })).toBeVisible();
        await context.close();
      });

      test("keyboard focus is visible", async ({ page }) => {
        await page.goto(`${path}?bad=${t.id}`);
        await page.keyboard.press("Tab");
        await expect(page.locator(".skip")).toBeInViewport();
        await page.keyboard.press("Tab");
        const outline = await page.evaluate(() => {
          const s = getComputedStyle(document.activeElement);
          return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) };
        });
        expect(outline.style).not.toBe("none");
        expect(outline.width).toBeGreaterThanOrEqual(2);
      });
    });
  }
}
