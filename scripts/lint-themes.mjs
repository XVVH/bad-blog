// Checks every theme package against the contract in docs/ARCHITECTURE.md.
// Run with: node scripts/lint-themes.mjs
//
// For each assets/themes/<id>/ (except _base and _floor):
// - theme.yaml exists and its id matches the folder
// - theme.css exists, uses no !important, and contains only @layer theme,
//   @font-face, @keyframes and @property at the top level
// - every style rule inside @layer theme is scoped to :root[data-theme="<id>"]
// - @keyframes names start with "<id>-", so themes can't collide
// - url() points at a file inside the theme's own folder, or a data: URI;
//   never at another site
// - every folder holding font files also holds a licence file
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const THEMES = resolve("assets/themes");
const SKIP = new Set(["_base", "_floor"]);
const errors = [];
const fail = (file, msg) => errors.push(`${relative(process.cwd(), file)}: ${msg}`);

// Strip comments, keeping string contents intact.
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

// Split a block of CSS into top-level statements: { prelude, body } for
// blocks, { prelude } for statements ending in ";".
const statements = (css) => {
  const out = [];
  let depth = 0;
  let start = 0;
  let prelude = "";
  let quote = null;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'") quote = c;
    else if (c === "{") {
      if (depth === 0) {
        prelude = css.slice(start, i).trim();
        start = i + 1;
      }
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0) {
        out.push({ prelude, body: css.slice(start, i) });
        start = i + 1;
      }
    } else if (c === ";" && depth === 0) {
      const p = css.slice(start, i).trim();
      if (p) out.push({ prelude: p });
      start = i + 1;
    }
  }
  return out;
};

const checkScoped = (file, id, css) => {
  const scope = `:root[data-theme="${id}"]`;
  for (const s of statements(css)) {
    if (/^@(media|supports|container)\b/.test(s.prelude)) {
      if (s.body !== undefined) checkScoped(file, id, s.body);
      continue;
    }
    if (s.prelude.startsWith("@")) {
      fail(file, `"${s.prelude}" isn't allowed inside @layer theme`);
      continue;
    }
    for (const sel of s.prelude.split(",")) {
      if (!sel.trim().startsWith(scope)) fail(file, `selector "${sel.trim()}" isn't scoped to ${scope}`);
    }
  }
};

const checkUrls = (file, dir, id, css) => {
  for (const m of css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)) {
    const url = m[2].trim();
    if (url.startsWith("data:")) continue;
    if (/^[a-z]+:/i.test(url) || url.startsWith("//")) {
      fail(file, `url(${url}) points at another site; no third-party requests (RULES.md)`);
      continue;
    }
    const prefix = `../themes/${id}/`;
    if (!url.startsWith(prefix)) {
      fail(file, `url(${url}) must start with ${prefix} (theme assets are published next to the CSS bundle)`);
      continue;
    }
    if (!existsSync(join(dir, url.slice(prefix.length).split(/[?#]/)[0]))) fail(file, `url(${url}) doesn't exist`);
  }
};

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const id of readdirSync(THEMES)) {
  const dir = join(THEMES, id);
  if (SKIP.has(id) || !statSync(dir).isDirectory()) continue;

  const yamlFile = join(dir, "theme.yaml");
  if (!existsSync(yamlFile)) fail(dir, "missing theme.yaml");
  else {
    const yaml = readFileSync(yamlFile, "utf8");
    const declared = yaml.match(/^id:\s*["']?([^"'\s]+)/m)?.[1];
    if (declared !== id) fail(yamlFile, `id is "${declared}" but the folder is "${id}"`);
    if (!/^name:\s*\S/m.test(yaml)) fail(yamlFile, "missing name");
  }

  const cssFile = join(dir, "theme.css");
  if (!existsSync(cssFile)) {
    fail(dir, "missing theme.css");
    continue;
  }
  const css = stripComments(readFileSync(cssFile, "utf8"));
  if (/!\s*important/i.test(css)) fail(cssFile, "!important isn't allowed in themes; the floor must always win");
  for (const s of statements(css)) {
    if (s.prelude === "@layer theme") checkScoped(cssFile, id, s.body ?? "");
    else if (s.prelude === "@font-face" || s.prelude.startsWith("@property")) continue;
    else if (s.prelude.startsWith("@keyframes")) {
      const name = s.prelude.replace("@keyframes", "").trim();
      if (!name.startsWith(`${id}-`)) fail(cssFile, `@keyframes ${name} must be named "${id}-…"`);
    } else fail(cssFile, `top-level "${s.prelude.slice(0, 60)}" isn't allowed; put rules inside @layer theme`);
  }
  checkUrls(cssFile, dir, id, css);

  const jsFile = join(dir, "theme.js");
  if (existsSync(jsFile)) {
    const js = readFileSync(jsFile, "utf8");
    if (/(fetch|import)\s*\(\s*["'`]https?:/.test(js) || /XMLHttpRequest|WebSocket|sendBeacon/.test(js)) {
      fail(jsFile, "theme scripts may not make network requests");
    }
    if (!/export\s+(function|const)\s+activate\b/.test(js)) fail(jsFile, "must export activate()");
    if (!/export\s+(function|const)\s+deactivate\b/.test(js)) fail(jsFile, "must export deactivate()");
  }

  const fontDirs = new Set(
    walk(dir)
      .filter((f) => /\.(woff2?|ttf|otf)$/i.test(f))
      .map((f) => resolve(f, "..")),
  );
  for (const fd of fontDirs) {
    if (!readdirSync(fd).some((n) => /^(LICEN[CS]E|OFL)/i.test(n))) fail(fd, "font files need a licence file beside them");
  }
}

if (errors.length) {
  console.error(`Theme lint found ${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log("Theme lint: all themes follow the contract.");
