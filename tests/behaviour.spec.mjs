// How the bar behaves: first visits, the deck, the escape hatch, the escape
// note, persistence, per-post opt-outs, fallbacks and the hit counter.
// The rules are in docs/DECISIONS.md (D6–D15) and docs/ARCHITECTURE.md.
import { expect, test } from "@playwright/test";
import { BAD, currentTheme, FRONT_DOOR, loadImages, manifest, problems, theme, watch } from "./helpers.mjs";

const KITCHEN = "/posts/kitchen-sink/";
const OTHER = "/posts/sample-one/";
const PLAIN = "/posts/sample-three/";
const moreBad = (page) => page.getByRole("button", { name: "More bad", exact: true });
const lessBad = (page) => page.getByRole("button", { name: "Less bad", exact: true });

test("a first visit gets a random front-door theme, kept for the whole visit", async ({ page }) => {
  await watch(page);
  await page.goto(KITCHEN);
  const first = await currentTheme(page);
  expect(FRONT_DOOR).toContain(first);
  await page.goto(OTHER);
  expect(await currentTheme(page)).toBe(first);
  expect(await problems(page)).toEqual([]);
});

test("a new visit rolls a theme again", async ({ context }) => {
  const a = await context.newPage();
  await a.goto(KITCHEN);
  // A new tab is a new visit: sessionStorage starts empty.
  const b = await context.newPage();
  await b.goto(KITCHEN);
  expect(FRONT_DOOR).toContain(await currentTheme(b));
});

test("?bad= picks a theme and keeps it for the visit; unknown ids are ignored", async ({ page }) => {
  const id = BAD[0].id;
  await page.goto(`${KITCHEN}?bad=${id}`);
  expect(await currentTheme(page)).toBe(id);
  await page.goto(OTHER);
  expect(await currentTheme(page)).toBe(id);
  await page.goto(`${OTHER}?bad=not-a-theme`);
  expect(await currentTheme(page)).toBe(id);
});

test("More bad deals every theme once before repeating, never the current one", async ({ page }) => {
  test.skip(BAD.length < 2, "needs at least two bad themes");
  await page.goto(`${KITCHEN}?bad=${BAD[0].id}`);
  const seen = [await currentTheme(page)];
  for (let i = 0; i < BAD.length - 1; i++) {
    await moreBad(page).click();
    await expect.poll(() => currentTheme(page)).not.toBe(seen.at(-1));
    seen.push(await currentTheme(page));
  }
  expect(new Set(seen).size).toBe(BAD.length);
});

test("More bad announces the change without naming the theme", async ({ page }) => {
  await page.goto(`${KITCHEN}?bad=${BAD[0].id}`);
  await moreBad(page).click();
  await expect(page.locator(".sr-live")).toHaveText(manifest.copy.changed);
  // Heard, never seen.
  const box = await page.locator(".sr-live").boundingBox();
  expect(box.width * box.height, "the live region is visible").toBeLessThanOrEqual(1);
  for (const t of BAD) await expect(page.locator(".sr-live")).not.toContainText(t.name);
});

test("bad themes never name themselves in the chrome", async ({ page }) => {
  for (const t of BAD) {
    await page.goto(`${KITCHEN}?bad=${t.id}`);
    const visible = await page.evaluate(() =>
      [".bar", ".masthead", ".rail", ".site-foot"].map((s) => [...document.querySelectorAll(s)].map((el) => el.innerText).join(" ")).join(" "),
    );
    expect(visible, `${t.id} shows its own name`).not.toContain(t.name);
    await expect(page.locator(".bar-note")).toBeHidden();
  }
});

test("Less bad escapes instantly, keeps the reader's place and explains the joke", async ({ page }) => {
  const from = BAD[0];
  await page.setViewportSize({ width: 390, height: 800 });
  await watch(page);
  await page.goto(`${KITCHEN}?bad=${from.id}`);
  await loadImages(page);

  // Scroll so the "Code blocks" heading sits just under the bar.
  const heading = page.locator("#code-blocks");
  await heading.evaluate((el) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 120));
  const barBottom = async () => (await page.locator(".bar-inner").boundingBox()).height;
  await lessBad(page).click();

  expect(await currentTheme(page)).toBe("not-bad");
  await loadImages(page);
  const top = (await heading.boundingBox()).y;
  expect(top, "the reader's place moved").toBeGreaterThan(0);
  expect(top).toBeLessThan((await barBottom()) + 400);

  const note = page.locator(".bar-note");
  await expect(note).toBeVisible();
  await expect(note.locator(".bar-note-msg")).toHaveText(manifest.copy.escape);
  await expect(note.locator(".bar-note-from")).toHaveText(manifest.copy.escaped_from.replace("{theme}", from.name));
  await expect(note.locator(".bar-note-rules li")).toHaveCount(from.rules.length);
  await expect(note).toBeFocused();
  await expect(lessBad(page)).toBeHidden();
  expect(await problems(page)).toEqual([]);
});

test("the escape sticks across pages and visits, and the note shows only once", async ({ context }) => {
  const page = await context.newPage();
  await page.goto(`${KITCHEN}?bad=${BAD[0].id}`);
  await lessBad(page).click();
  await page.goto(OTHER);
  expect(await currentTheme(page)).toBe("not-bad");
  await expect(page.locator(".bar-note")).toBeHidden();
  const later = await context.newPage();
  await later.goto(OTHER);
  expect(await currentTheme(later)).toBe("not-bad");
});

test("dismissing the note returns focus to More bad", async ({ page }) => {
  await page.goto(`${KITCHEN}?bad=${BAD[0].id}`);
  await lessBad(page).click();
  await page.getByRole("button", { name: manifest.copy.dismiss }).click();
  await expect(page.locator(".bar-note")).toBeHidden();
  await expect(moreBad(page)).toBeFocused();
});

test("More bad after an escape clears it", async ({ context }) => {
  const page = await context.newPage();
  await page.goto(`${KITCHEN}?bad=${BAD[0].id}`);
  await lessBad(page).click();
  await moreBad(page).click();
  await expect.poll(() => currentTheme(page)).not.toBe("not-bad");
  const later = await context.newPage();
  await later.goto(OTHER);
  expect(FRONT_DOOR).toContain(await currentTheme(later));
});

test("a post with bad: false stays plain without changing the visit's theme", async ({ page }) => {
  const id = BAD[0].id;
  await page.goto(`${OTHER}?bad=${id}`);
  await page.goto(PLAIN);
  expect(await currentTheme(page)).toBe("not-bad");
  await expect(page.locator(".bar-plain")).toHaveText(manifest.copy.stays_plain);
  await expect(moreBad(page)).toBeHidden();
  await page.goto(OTHER);
  expect(await currentTheme(page)).toBe(id);
});

test("without JavaScript, readers get Not Bad and no bar", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(KITCHEN);
  expect(await page.getAttribute("html", "data-theme")).toBe("not-bad");
  await expect(page.locator(".bar")).toBeHidden();
  await expect(page.locator(".post-title")).toBeVisible();
  await context.close();
});

test("with storage blocked, the theme rides on internal links instead", async ({ page }) => {
  await page.addInitScript(() => {
    for (const name of ["localStorage", "sessionStorage"]) {
      Object.defineProperty(window, name, {
        get() {
          throw new DOMException("blocked", "SecurityError");
        },
      });
    }
  });
  await watch(page);
  await page.goto(KITCHEN);
  const id = await currentTheme(page);
  expect(FRONT_DOOR).toContain(id);
  const href = await page.locator(".site-nav a").first().getAttribute("href");
  expect(href).toContain(`bad=${id}`);
  await lessBad(page).click();
  expect(await page.locator(".site-nav a").first().getAttribute("href")).toContain("bad=not-bad");
  await page.locator(".site-nav a").first().click();
  expect(await currentTheme(page)).toBe("not-bad");
  expect(await problems(page)).toEqual([]);
});

test("printing always uses Not Bad", async ({ page }) => {
  const id = BAD[0].id;
  await page.goto(`${KITCHEN}?bad=${id}`);
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
  expect(await currentTheme(page)).toBe("not-bad");
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  expect(await currentTheme(page)).toBe(id);
});

test("the hit counter counts once per visit and shows six digits", async ({ page, request }) => {
  // A page no other test visits, because the test server's counts are shared.
  const COUNTED = "/posts/sample-two/";
  await page.goto(COUNTED);
  await expect(page.locator(".hits-count")).toHaveText(/^\d{6}$/);
  const read = async () => (await (await request.get(`/api/hit?path=${encodeURIComponent(COUNTED)}`)).json()).count;
  const before = await read();
  await page.reload();
  await expect(page.locator(".hits-count")).toHaveText(/^\d{6}$/);
  expect(await read()).toBe(before);
});

test("the hit counter refuses pages that don't exist", async ({ request }) => {
  const res = await request.post("/api/hit", { data: "/not-a-real-page/", headers: { "content-type": "text/plain" } });
  expect(res.status()).toBe(404);
});

test("the theme index is reachable only from Not Bad, and always shows in Not Bad", async ({ page }) => {
  const link = page.locator(".site-foot .designs-link");
  for (const t of BAD) {
    await page.goto(`${OTHER}?bad=${t.id}`);
    await expect(link, `${t.id} shows the theme index link`).toBeHidden();
  }
  await page.goto(`${OTHER}?bad=not-bad`);
  await expect(link).toBeVisible();
  await link.click();
  expect(await currentTheme(page)).toBe("not-bad");
  for (const t of BAD) await expect(page.locator(`#design-${t.id} h2`)).toHaveText(t.name);
});

test("the escape note links to the theme index", async ({ page }) => {
  await page.goto(`${KITCHEN}?bad=${BAD[0].id}`);
  await lessBad(page).click();
  await expect(page.locator(".bar-note .designs-link")).toBeVisible();
});

test("asking for a bad theme by name ends an escape", async ({ context }) => {
  const page = await context.newPage();
  await page.goto(`${KITCHEN}?bad=${BAD[0].id}`);
  await lessBad(page).click();
  await page.goto(`${OTHER}?bad=${BAD[0].id}`);
  await page.goto(KITCHEN);
  expect(await currentTheme(page)).toBe(BAD[0].id);
});

test("the More bad spin names nothing", async ({ page }) => {
  await page.goto(`${KITCHEN}?bad=${BAD[0].id}`);
  await moreBad(page).click();
  const spin = page.locator(".bar-spin");
  await expect(spin).toBeAttached();
  expect(await spin.innerText()).toBe("");
  await expect(spin).not.toBeAttached();
});

test("theme metadata is complete", () => {
  for (const t of BAD) {
    expect(t.name, `${t.id} has a name`).toBeTruthy();
    expect(t.rules.length, `${t.id} lists the rules it breaks, for the escape note`).toBeGreaterThan(0);
  }
  expect(theme("not-bad")).toBeTruthy();
});
