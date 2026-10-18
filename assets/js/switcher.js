// The More bad / Less bad bar, theme scripts, the escape note and the hit
// counter. See docs/ARCHITECTURE.md ("In the browser").
//
// Rules this file keeps (docs/RULES.md):
// - Less bad is instant: no animation, no network, the reader keeps their place.
// - Nothing names a theme or explains the joke until the reader escapes.
// - Every storage access can fail; the site works anyway.

const root = document.documentElement;
const manifest = JSON.parse(document.getElementById("tt-manifest").textContent);
const themes = new Map(manifest.themes.map((t) => [t.id, t]));
const copy = manifest.copy;
const BAD = manifest.themes.map((t) => t.id).filter((id) => id !== "not-bad");

const storage = (name) => {
  try {
    const s = window[name];
    s.setItem("tt:probe", "1");
    s.removeItem("tt:probe");
    return s;
  } catch {
    return null;
  }
};
const local = storage("localStorage");
const session = storage("sessionStorage");

const bar = document.querySelector(".bar");
const more = bar.querySelector(".bar-more");
const less = bar.querySelector(".bar-less");
const plain = bar.querySelector(".bar-plain");
const note = bar.querySelector(".bar-note");
const noteFrom = note.querySelector(".bar-note-from");
const noteRules = note.querySelector(".bar-note-rules");
const dismiss = note.querySelector(".bar-note-dismiss");
const live = document.querySelector(".sr-live");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const current = () => root.dataset.theme;

// The themes this page allows: none for bad: false, a subset for bad: [ids].
const eligible = () => {
  const allow = root.dataset.bad;
  if (allow === "off") return [];
  if (allow) return allow.split(" ").filter((id) => themes.has(id) && id !== "not-bad");
  return BAD;
};

// --- The deck: every theme is seen once before any repeats. -------------

let memoryDeck = [];
const shuffle = (list) => {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const readDeck = () => {
  if (!session) return memoryDeck;
  try {
    return JSON.parse(session.getItem("tt:deck") || "[]");
  } catch {
    return [];
  }
};
const writeDeck = (deck) => {
  memoryDeck = deck;
  if (session) session.setItem("tt:deck", JSON.stringify(deck));
};
const freshDeck = () => {
  const pool = eligible();
  let deck = readDeck().filter((id) => pool.includes(id) && id !== current());
  if (!deck.length) deck = shuffle(pool.filter((id) => id !== current()));
  if (!deck.length) deck = pool.slice();
  return deck;
};
const deal = () => {
  const deck = freshDeck();
  const next = deck.shift() ?? null;
  writeDeck(deck);
  return next;
};
const peek = () => freshDeck()[0] ?? null;

// --- Keeping the reader's place. ---------------------------------------
// Pixel positions don't survive a change of layout, so remember which block
// is at the top of the screen, and how far into it the reader is.

const BLOCKS = ".post-head, .post-body > *, .post-foot, .listing-head, .post-list > li, .term-list > li";
const barBottom = () => bar.getBoundingClientRect().bottom;
const readingPoint = () => {
  if (window.scrollY < 1) return null;
  const top = barBottom();
  for (const el of document.querySelectorAll(BLOCKS)) {
    const r = el.getBoundingClientRect();
    if (r.bottom > top + 1) {
      const into = r.height ? Math.min(1, Math.max(0, (top - r.top) / r.height)) : 0;
      return { el, into };
    }
  }
  return null;
};
const restore = (point) => {
  if (!point) return;
  const r = point.el.getBoundingClientRect();
  const y = window.scrollY + r.top + point.into * r.height - barBottom();
  window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
};

// --- Theme scripts. ------------------------------------------------------
// A theme's optional theme.js exports activate(root, api) and
// deactivate(root). deactivate removes everything activate added.

let hits = null;
const api = {
  hits: () => hits,
  reducedMotion: () => reducedMotion.matches,
};
let active = { id: null, mod: null };
const deactivate = () => {
  const mod = active.mod;
  active = { id: null, mod: null };
  if (mod?.deactivate) {
    try {
      mod.deactivate(document);
    } catch (e) {
      console.error(e);
    }
  }
};
const activate = async (id) => {
  deactivate();
  active = { id, mod: null };
  const url = themes.get(id)?.js;
  if (!url) return;
  try {
    const mod = await import(url);
    if (active.id !== id) return;
    active.mod = mod;
    mod.activate?.(document, api);
  } catch (e) {
    console.error(e);
  }
};
const prefetch = () => {
  const url = themes.get(peek())?.js;
  if (!url || document.querySelector(`link[rel="modulepreload"][href="${url}"]`)) return;
  const link = document.createElement("link");
  link.rel = "modulepreload";
  link.href = url;
  document.head.append(link);
};

// --- If storage is blocked, carry the theme on internal links instead. ---

const carry = (id) => {
  if (local && session) return;
  for (const a of document.querySelectorAll("a[href]")) {
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin) continue;
    if (u.pathname === location.pathname && u.search === location.search && u.hash) continue;
    u.searchParams.set("bad", id);
    a.href = u.href;
  }
};

// --- The bar. --------------------------------------------------------------

const announce = (text) => {
  live.textContent = "";
  window.setTimeout(() => {
    live.textContent = text;
  }, 50);
};

const sync = () => {
  const none = eligible().length === 0;
  more.hidden = none;
  plain.hidden = !none;
};

const hideNote = () => {
  note.hidden = true;
};

const showNote = (fromId) => {
  const from = themes.get(fromId);
  const rules = from?.rules ?? [];
  noteFrom.textContent = copy.escaped_from.replace("{theme}", from?.name ?? fromId);
  noteFrom.hidden = rules.length === 0;
  noteRules.replaceChildren(
    ...rules.map((rule) => {
      const li = document.createElement("li");
      li.textContent = rule;
      return li;
    }),
  );
  noteRules.hidden = rules.length === 0;
  note.hidden = false;
  note.focus({ preventScroll: true });
};

// The spin: three reels in the bar, about 0.6s, no theme names. The reels
// scroll rather than flicker, so nothing flashes. Skipped under reduced motion.
let spinning = false;
const spin = () =>
  new Promise((done) => {
    if (reducedMotion.matches) return done();
    const reel = document.createElement("span");
    reel.className = "bar-spin";
    reel.setAttribute("aria-hidden", "true");
    reel.append(...[0, 1, 2].map(() => document.createElement("span")));
    more.after(reel);
    window.setTimeout(() => {
      reel.remove();
      done();
    }, 650);
  });

more.addEventListener("click", async () => {
  if (spinning) return;
  const next = deal();
  if (!next) return;
  spinning = true;
  await spin();
  spinning = false;
  local?.removeItem("tt:escaped");
  session?.setItem("tt:theme", next);
  hideNote();
  const point = readingPoint();
  const swap = async () => {
    root.dataset.theme = next;
    sync();
    await activate(next);
    restore(point);
  };
  if (document.startViewTransition && !reducedMotion.matches) {
    document.startViewTransition(swap);
  } else {
    swap();
  }
  announce(copy.changed);
  carry(next);
  prefetch();
});

// The fire exit. Instant: no view transition, no waiting on anything.
less.addEventListener("click", () => {
  const from = current();
  if (from === "not-bad") return;
  local?.setItem("tt:escaped", "1");
  session?.setItem("tt:theme", "not-bad");
  const point = readingPoint();
  deactivate();
  root.dataset.theme = "not-bad";
  sync();
  restore(point);
  showNote(from);
  carry("not-bad");
});

dismiss.addEventListener("click", () => {
  hideNote();
  more.focus();
});

// Printing always uses Not Bad.
let beforePrint = null;
window.addEventListener("beforeprint", () => {
  beforePrint = current();
  root.dataset.theme = "not-bad";
});
window.addEventListener("afterprint", () => {
  if (beforePrint) root.dataset.theme = beforePrint;
  beforePrint = null;
});

// --- The hit counter. ------------------------------------------------------
// One count per page per visit. Nothing about the visitor is sent or stored.

const countHit = async () => {
  const path = document.querySelector('meta[name="tt-hit"]')?.content;
  if (!path || !manifest.hits) return;
  const key = `tt:hit:${path}`;
  let count = Number(session?.getItem(key)) || null;
  if (count === null) {
    try {
      const res = await fetch(manifest.hits, {
        method: "POST",
        headers: { "content-type": "text/plain" },
        body: path,
        keepalive: true,
      });
      if (!res.ok) return;
      count = Number((await res.json()).count);
      if (!Number.isFinite(count)) return;
      session?.setItem(key, String(count));
    } catch {
      return;
    }
  }
  hits = count;
  root.dataset.hits = String(count);
  for (const el of document.querySelectorAll(".hits-count")) {
    el.textContent = String(count).padStart(6, "0");
  }
  document.dispatchEvent(new CustomEvent("tt:hits", { detail: { count } }));
};

// --- Start. ------------------------------------------------------------------

sync();
carry(current());
activate(current());
if ("requestIdleCallback" in window) window.requestIdleCallback(prefetch);
else window.setTimeout(prefetch, 1000);
countHit();
