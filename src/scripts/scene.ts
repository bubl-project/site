// A small, event-driven enhancement. The scene is complete without JavaScript.
const scene = document.querySelector<HTMLElement>("[data-depth-scene]");
const motion = window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)");

if (scene) {
  let frame = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    scene.style.removeProperty("--scene-x");
    scene.style.removeProperty("--scene-y");
  };
  scene.addEventListener("pointermove", (event) => {
    if (!motion.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = scene.getBoundingClientRect();
      scene.style.setProperty("--scene-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}deg`);
      scene.style.setProperty("--scene-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * -6}deg`);
      frame = 0;
    });
  }, { passive: true });
  scene.addEventListener("pointerleave", reset);
  motion.addEventListener("change", reset);
  document.addEventListener("visibilitychange", () => { if (document.hidden) reset(); });
}
