// Haute: pictures and rules fade in as they scroll into view, as on every
// award site. Never text: words waiting at opacity 0 fail contrast, and
// would stay invisible if the observer ever misfired. Never hides what's
// already on screen when the theme starts, does nothing under reduced
// motion, and deactivate() removes every trace (docs/ARCHITECTURE.md).

const TARGETS = ".post-body > .fig img, .post-body > hr";
let observer = null;

export function activate(root, api) {
  if (api.reducedMotion() || !("IntersectionObserver" in window)) return;
  const below = [...root.querySelectorAll(TARGETS)].filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  if (!below.length) return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute("data-hx-reveal", "shown");
        observer.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  for (const el of below) {
    el.setAttribute("data-hx-reveal", "hidden");
    observer.observe(el);
  }
}

export function deactivate(root) {
  observer?.disconnect();
  observer = null;
  for (const el of root.querySelectorAll("[data-hx-reveal]")) el.removeAttribute("data-hx-reveal");
}
