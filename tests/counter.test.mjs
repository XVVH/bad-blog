// Unit tests for the hit counter's logic. Run with: npm run test:unit
import assert from "node:assert/strict";
import { test } from "node:test";
import { handle } from "../netlify/functions/hit/counter.mjs";

const fakeStore = () => {
  const data = new Map();
  return { data, get: async (k) => data.get(k) ?? null, set: async (k, v) => void data.set(k, v) };
};
const allowed = new Set(["/", "/posts/hello/"]);
const post = (body) => new Request("https://example.test/api/hit", { method: "POST", body });
const get = (q = "") => new Request(`https://example.test/api/hit${q}`);

test("counts a known path and returns the new total", async () => {
  const store = fakeStore();
  assert.deepEqual(await (await handle(post("/posts/hello/"), store, allowed)).json(), { path: "/posts/hello/", count: 1 });
  assert.deepEqual(await (await handle(post("/posts/hello/"), store, allowed)).json(), { path: "/posts/hello/", count: 2 });
});

test("rejects paths that aren't on the allow-list, and stores nothing", async () => {
  const store = fakeStore();
  const res = await handle(post("/not-a-page/"), store, allowed);
  assert.equal(res.status, 404);
  assert.equal(store.data.size, 0);
});

test("rejects empty and oversized bodies", async () => {
  const store = fakeStore();
  assert.equal((await handle(post(""), store, allowed)).status, 404);
  assert.equal((await handle(post("/".repeat(600)), store, allowed)).status, 404);
  assert.equal(store.data.size, 0);
});

test("reads a count without incrementing it", async () => {
  const store = fakeStore();
  await handle(post("/"), store, allowed);
  assert.deepEqual(await (await handle(get("?path=/"), store, allowed)).json(), { path: "/", count: 1 });
  assert.deepEqual(await (await handle(get("?path=/"), store, allowed)).json(), { path: "/", count: 1 });
  assert.equal((await handle(get(), store, allowed)).status, 404);
  assert.equal((await handle(get("?path=/nope/"), store, allowed)).status, 404);
});

test("refuses other methods and never caches", async () => {
  const res = await handle(new Request("https://example.test/api/hit", { method: "DELETE" }), fakeStore(), allowed);
  assert.equal(res.status, 405);
  assert.equal(res.headers.get("cache-control"), "no-store");
});
