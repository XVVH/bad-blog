// Shared helpers for the browser tests.
import { readFileSync } from "node:fs";

// The theme manifest, read from the built site so tests always cover every
// theme that exists, including ones added later.
const html = readFileSync(".test-site/index.html", "utf8");
export const manifest = JSON.parse(html.match(/<script[^>]*\bid="?tt-manifest"?[^>]*>([\s\S]*?)<\/script>/)[1]);
export const THEMES = manifest.themes;
export const BAD = THEMES.filter((t) => t.id !== "not-bad");
export const FRONT_DOOR = BAD.filter((t) => t.front_door).map((t) => t.id);
export const theme = (id) => THEMES.find((t) => t.id === id);

export const PAGES = ["/", "/posts/kitchen-sink/"];
export const WIDTHS = [320, 375, 768, 1440];

// Record page errors, console errors and content security policy
// violations. Call before the first navigation; read with problems(page).
export const watch = async (page) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error" && !/api\/hit/.test(m.text())) errors.push(`console: ${m.text()}`);
  });
  await page.addInitScript(() => {
    window.__csp = [];
    document.addEventListener("securitypolicyviolation", (e) => {
      window.__csp.push(`${e.violatedDirective} blocked ${e.blockedURI || "inline"}`);
    });
  });
  page.__errors = errors;
};
export const problems = async (page) => [...page.__errors, ...(await page.evaluate(() => window.__csp ?? []))];

// Lazy images have no size until loaded; load them all so layout is final.
export const loadImages = async (page) => {
  await page.evaluate(async () => {
    const imgs = [...document.images];
    imgs.forEach((i) => (i.loading = "eager"));
    const settled = (i) =>
      new Promise((done) => {
        i.addEventListener("load", done, { once: true });
        i.addEventListener("error", done, { once: true });
      });
    await Promise.all(imgs.filter((i) => !i.complete).map(settled));
    await document.fonts.ready;
  });
};

// Every animation running on the page, with when it ends (ms after the
// page's timeline started). Infinity means it never stops.
export const animationEnds = (page) =>
  page.evaluate(() =>
    document.getAnimations().map((a) => {
      const t = a.effect?.getComputedTiming?.() ?? {};
      const name = a.animationName ?? a.transitionProperty ?? a.constructor.name;
      return { name, end: t.endTime === Infinity || t.iterations === Infinity ? null : t.endTime };
    }),
  );

// Wait for every finite animation to finish, so tests see the settled page.
export const settle = async (page) => {
  await page.evaluate(() => Promise.all(document.getAnimations().filter((a) => a.effect?.getComputedTiming?.().endTime !== Infinity).map((a) => a.finished.catch(() => null))));
};

export const currentTheme = (page) => page.evaluate(() => document.documentElement.dataset.theme);
