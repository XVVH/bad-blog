// A small static server for tests and local review. It behaves like Netlify
// where it matters: it applies the generated _headers file (so the content
// security policy is enforced in tests), serves 404.html for missing pages,
// and runs the hit counter's logic against an in-memory store.
//
// Usage: node tests/serve.mjs [dir] [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { handle } from "../netlify/functions/hit/counter.mjs";

const root = resolve(process.argv[2] ?? ".test-site");
const port = Number(process.argv[3] ?? 8787);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

// Parse Netlify's _headers format: an unindented path pattern, followed by
// indented "Name: value" lines. Every matching rule applies.
const parseHeaders = (text) => {
  const rules = [];
  for (const line of text.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      const pattern = new RegExp(`^${line.trim().replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`);
      rules.push({ pattern, headers: [] });
    } else if (rules.length) {
      const i = line.indexOf(":");
      rules.at(-1).headers.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
    }
  }
  return rules;
};

let rules = [];
try {
  rules = parseHeaders(await readFile(join(root, "_headers"), "utf8"));
} catch {
  console.warn("serve: no _headers file; serving without security headers");
}

let allowed = new Set();
try {
  allowed = new Set(JSON.parse(await readFile(join(root, "hits-allowlist.json"), "utf8")));
} catch {}
const memory = new Map();
const store = { get: async (k) => memory.get(k) ?? null, set: async (k, v) => void memory.set(k, v) };

const fileFor = async (pathname) => {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, safe);
  if (!file.startsWith(root)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    return null;
  }
};

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);

  if (url.pathname === "/api/hit") {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const request = new Request(url, {
      method: req.method,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
    });
    const response = await handle(request, store, allowed);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.text());
    return;
  }

  let status = 200;
  let file = await fileFor(url.pathname);
  if (!file) {
    status = 404;
    file = join(root, "404.html");
  }
  const headers = { "content-type": TYPES[extname(file)] ?? "application/octet-stream" };
  for (const rule of rules) {
    if (rule.pattern.test(url.pathname)) for (const [k, v] of rule.headers) headers[k] = v;
  }
  try {
    const body = await readFile(file);
    res.writeHead(status, headers);
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
