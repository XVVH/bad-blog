// The hit counter's logic, kept separate from Netlify so it can be tested
// with a fake store. See docs/ARCHITECTURE.md ("Hit counter").
//
// It stores a page path and a number, and nothing else: no IP addresses, no
// cookies, nothing a visitor types. Only paths on the build's allow-list are
// accepted, so nobody can add entries. The worst anyone can do is make a
// number go up.

const MAX_PATH = 512;
const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const keyFor = (path) => encodeURIComponent(path);

// store: { get(key) -> Promise<string|null>, set(key, value) -> Promise }
export const handle = async (req, store, allowed) => {
  if (req.method === "GET") {
    const path = new URL(req.url).searchParams.get("path");
    if (!path || !allowed.has(path)) return json(404, { error: "unknown path" });
    return json(200, { path, count: Number(await store.get(keyFor(path))) || 0 });
  }

  if (req.method !== "POST") return json(405, { error: "method not allowed" });

  const path = (await req.text()).trim();
  if (!path || path.length > MAX_PATH || !allowed.has(path)) {
    return json(404, { error: "unknown path" });
  }
  // Read, add one, write. Two hits at the same instant may count once; for a
  // GeoCities-style counter that's fine (DECISIONS.md D20).
  const count = (Number(await store.get(keyFor(path))) || 0) + 1;
  await store.set(keyFor(path), String(count));
  return json(200, { path, count });
};
