// The smell lint: flags known tells of the default AI look (docs/SMELL.md)
// in everything that ships: every theme except _control, the shared CSS,
// the templates and the site copy.
// Run with: node scripts/lint-smell.mjs
//
// A theme that uses a tell on purpose, for its own reasons, lists the rule
// id in theme.yaml with a reason:
//   smell_exemptions:
//     - "gradient-text: per-letter rainbow colouring, the 1997 way"
//
// This only catches surface smell. The deep smell (one spacing scale, one
// radius, restraint) needs a human: the owner, with the gallery.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const RULES = [
  {
    id: "smell-font",
    what: "a smell font as the first family (Inter, Geist, system-ui)",
    test: (css) => [...css.matchAll(/font(?:-family)?\s*:[^;{}]*?(?:\d+(?:px|rem|em|%)?(?:\/[\d.]+\w*)?\s+)?["']?(Inter|Geist|system-ui|-apple-system|ui-sans-serif)\b/gi)].map((m) => m[1]),
  },
  {
    id: "tailwind-hex",
    what: "a Tailwind default palette colour",
    test: (css) =>
      [...css.matchAll(/#(6366f1|4f46e5|4338ca|818cf8|8b5cf6|7c3aed|6d28d9|a855f7|9333ea|f8fafc|f1f5f9|e2e8f0|cbd5e1|94a3b8|64748b|475569|334155|1e293b|0f172a|020617|18181b|111827|3b82f6|2563eb|0ea5e9|10b981|eef2ff|e0e7ff)\b/gi)].map((m) => m[0]),
  },
  { id: "glass", what: "frosted glass (backdrop-filter: blur)", test: (css) => [...css.matchAll(/backdrop-filter\s*:\s*[^;]*blur/gi)].map((m) => m[0]) },
  { id: "gradient-text", what: "gradient-clipped text", test: (css) => [...css.matchAll(/background-clip\s*:\s*text/gi)].map((m) => m[0]) },
  { id: "emoji", what: "smell emoji (✨🚀💡🎉👋)", test: (text) => [...text.matchAll(/[✨🚀💡🎉👋]/gu)].map((m) => m[0]) },
  { id: "pill", what: "pill shapes (border-radius: 9999px)", test: (css) => [...css.matchAll(/border-radius\s*:\s*(9999px|999px|100vmax)/gi)].map((m) => m[0]) },
  {
    id: "copy",
    what: "smell copy",
    test: (text) => [...text.matchAll(/let['’]s dive in|little corner of the internet|crafted with|stay curious|thoughts on design, technology/gi)].map((m) => m[0]),
  },
];

const errors = [];
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\{\{\/\*[\s\S]*?\*\/\}\}/g, "").replace(/^\s*#.*$/gm, "");
const check = (file, text, kinds, exempt = new Set()) => {
  const body = strip(text);
  for (const rule of RULES) {
    if (!kinds.includes(rule.id) || exempt.has(rule.id)) continue;
    const hits = rule.test(body);
    if (hits.length) errors.push(`${relative(process.cwd(), file)}: ${rule.what}: ${[...new Set(hits)].join(", ")}`);
  }
};
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const CSS_RULES = ["smell-font", "tailwind-hex", "glass", "gradient-text", "emoji", "pill", "copy"];

for (const id of readdirSync("assets/themes")) {
  if (id === "_control") continue;
  const dir = join("assets/themes", id);
  let exempt = new Set();
  try {
    const yaml = readFileSync(join(dir, "theme.yaml"), "utf8");
    exempt = new Set([...yaml.matchAll(/^\s*-\s*["']?([a-z-]+):/gm)].map((m) => m[1]).filter((r) => RULES.some((x) => x.id === r)));
  } catch {}
  for (const f of walk(dir).filter((f) => /\.(css|js)$/.test(f))) check(f, readFileSync(f, "utf8"), CSS_RULES, exempt);
}
for (const f of walk("layouts")) check(f, readFileSync(f, "utf8"), ["emoji", "copy", "smell-font"]);
for (const f of ["data/copy.yaml", "config/_default/hugo.toml"]) check(f, readFileSync(f, "utf8"), ["emoji", "copy"]);

if (errors.length) {
  console.error(`Smell lint found ${errors.length} tell(s). Remove them, or exempt them in theme.yaml with a reason (docs/SMELL.md):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log("Smell lint: no known tells in anything that ships.");
