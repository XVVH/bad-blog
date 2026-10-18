// Under Construction: a sparkle trail behind the mouse pointer.
// Mouse only (never touch), off under reduced motion, at most 24 sparkles
// on screen. Everything added carries data-tt-deco and aria-hidden, and
// deactivate() removes it all (docs/ARCHITECTURE.md, "Theme packages").

const MAX = 24;
let onMove = null;
let last = 0;

export function activate(root, api) {
  if (api.reducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const now = performance.now();
    if (now - last < 45) return;
    last = now;
    const live = root.querySelectorAll(".uc-sparkle");
    if (live.length >= MAX) live[0].remove();
    const s = root.createElement("span");
    s.className = "uc-sparkle";
    s.setAttribute("data-tt-deco", "");
    s.setAttribute("aria-hidden", "true");
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    s.addEventListener("animationend", () => s.remove(), { once: true });
    root.body.append(s);
  };
  root.addEventListener("pointermove", onMove, { passive: true });
}

export function deactivate(root) {
  if (onMove) root.removeEventListener("pointermove", onMove);
  onMove = null;
  for (const s of root.querySelectorAll(".uc-sparkle")) s.remove();
}
