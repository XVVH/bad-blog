// Builds the production site and checks that nothing dev-only ships and the
// security headers match the code. Needs hugo on PATH. Run with: npm run test:unit
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, test } from "node:test";

let dir;
const read = (p) => readFileSync(join(dir, p), "utf8");

before(() => {
  dir = mkdtempSync(join(tmpdir(), "tt-prod-"));
  const build = spawnSync("hugo", ["--gc", "--minify", "--panicOnWarning", "-d", dir], { encoding: "utf8" });
  assert.equal(build.status, 0, `production build failed:\n${build.stdout}\n${build.stderr}`);
});
after(() => rmSync(dir, { recursive: true, force: true }));

const manifestOf = (html) => JSON.parse(html.match(/<script[^>]*\bid="?tt-manifest"?[^>]*>([\s\S]*?)<\/script>/)[1]);

test("dev-only themes never ship", () => {
  const ids = manifestOf(read("index.html")).themes.map((t) => t.id);
  assert.ok(ids.includes("not-bad"));
  assert.ok(!ids.includes("_control"), "_control is in the production manifest");
  const css = readdirSync(join(dir, "css")).map((f) => read(join("css", f))).join("\n");
  assert.ok(!css.includes('data-theme="_control"'), "_control's CSS is in the production bundle");
});

test("fixture posts never ship", () => {
  assert.ok(!existsSync(join(dir, "posts/kitchen-sink")), "the kitchen sink is in production");
  assert.ok(!read("hits-allowlist.json").includes("kitchen-sink"));
  assert.ok(!read("index.xml").includes("kitchen-sink"));
});

test("the content security policy allows exactly the inline boot script", () => {
  const html = read("index.html");
  const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  assert.equal(inline.length, 1, "expected exactly one inline script");
  const hash = `sha256-${createHash("sha256").update(inline[0]).digest("base64")}`;
  const headers = read("_headers");
  assert.ok(headers.includes(`'${hash}'`), "the _headers script hash doesn't match the inline script");
  assert.match(headers, /default-src 'self'/);
  assert.doesNotMatch(headers, /unsafe-inline|unsafe-eval/);
});

test("pages make no third-party requests", () => {
  const html = read("index.html") + read("404.html") + read("about/index.html");
  for (const m of html.matchAll(/<(?:script|link|img)\b[^>]*(?:src|href)="(https?:)?\/\/[^"]*"/g)) {
    if (m[0].startsWith("<link") && /rel="canonical"/.test(m[0])) continue;
    assert.fail(`third-party asset: ${m[0]}`);
  }
});

test("no inline style attributes, which the content security policy would block", () => {
  for (const page of ["index.html", "404.html", "about/index.html", "tags/index.html"]) {
    assert.doesNotMatch(read(page), /\sstyle="/, `${page} has an inline style attribute`);
  }
});
