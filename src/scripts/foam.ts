// Pointer-driven, bounded CSS particles. No timers or animation loop at rest.
const motion = window.matchMedia("(prefers-reduced-motion: no-preference) and (any-hover: hover) and (any-pointer: fine)");
const maskSupported = CSS.supports("mask-image", 'url("")') || CSS.supports("-webkit-mask-image", 'url("")');
const MAX_PUFFS = 120;
const EMISSION_INTERVAL = 100;
const FOAM_LIFETIME = 12_000;

document.querySelectorAll<HTMLElement>("[data-foam-layer]").forEach((layer) => {
  const surface = layer.closest<HTMLElement>("[data-foam-surface]");
  const image = surface?.querySelector<HTMLImageElement>("img");
  if (!surface || !image) return;

  let frame = 0;
  let lastEmission = 0;
  let previous: { x: number; y: number } | null = null;

  const resetPointer = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = null;
  };
  const clear = () => {
    resetPointer();
    layer.replaceChildren();
  };
  const sync = () => {
    clear();
    const ready = maskSupported && motion.matches && !document.hidden && image.complete && image.naturalWidth > 0;
    layer.dataset.ready = String(ready);
    // Use the already loaded responsive asset as an alpha mask, so the foam
    // follows the artwork's silhouette and never paints its empty background.
    if (ready) layer.style.setProperty("--foam-mask", `url("${image.currentSrc || image.src}")`);
  };
  const emit = (x: number, y: number, width: number, height: number) => {
    // Keep existing foam for its full lifetime, even during continuous movement.
    if (layer.childElementCount >= MAX_PUFFS) return;
    const puff = document.createElement("span");
    puff.className = "foam-puff";
    puff.style.left = `${x / width * 100}%`;
    puff.style.top = `${y / height * 100}%`;
    puff.style.setProperty("--foam-size", `${18 + Math.random() * 16}px`);
    puff.style.setProperty("--foam-life", `${FOAM_LIFETIME}ms`);
    puff.style.setProperty("--foam-drift", `${Math.random() * 14 - 7}px`);
    puff.addEventListener("animationend", () => puff.remove(), { once: true });
    layer.append(puff);
  };

  surface.addEventListener("pointermove", (event) => {
    if (layer.dataset.ready !== "true" || event.pointerType === "touch") return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame((now) => {
      frame = 0;
      if (now - lastEmission < EMISSION_INTERVAL) return;
      const bounds = surface.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = (event.clientX - bounds.left) / bounds.width * surface.clientWidth;
      const y = (event.clientY - bounds.top) / bounds.height * surface.clientHeight;
      if (x < 0 || y < 0 || x > surface.clientWidth || y > surface.clientHeight) return;
      const distance = previous ? Math.hypot(x - previous.x, y - previous.y) : 0;
      if (previous && distance < 5) return;
      emit(x, y, surface.clientWidth, surface.clientHeight);
      previous = { x, y };
      lastEmission = now;
    });
  }, { passive: true });
  surface.addEventListener("pointerleave", resetPointer);
  surface.addEventListener("pointercancel", resetPointer);
  image.addEventListener("load", sync);
  motion.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("pagehide", clear);
  sync();
});
