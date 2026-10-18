// Netlify Function: POST a page path to count a hit; GET ?path= to read a
// count without adding to it. There's deliberately no "read everything"
// endpoint; the owner reads totals with `netlify blobs:list hits`.
//
// allowlist.json is copied from the Hugo build (public/hits-allowlist.json)
// by the build command in netlify.toml.
import { getStore } from "@netlify/blobs";
import allowlist from "./allowlist.json" with { type: "json" };
import { handle } from "./counter.mjs";

const allowed = new Set(allowlist);

export default async (req) => {
  const store = getStore({ name: "hits", consistency: "strong" });
  return handle(req, store, allowed);
};

export const config = { path: "/api/hit" };
