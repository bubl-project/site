type Platform = "ios" | "android" | "other";

function detectPlatform(): Platform {
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}

function init() {
  const root = document.querySelector<HTMLElement>("[data-store-buttons]");
  if (!root) return;

  const platform = detectPlatform();
  const deepLink = root.dataset.deepLink;

  const matching = root.querySelector<HTMLAnchorElement>(
    `[data-store="${platform}"]`,
  );
  if (matching) {
    matching.classList.add("ring-2", "ring-secondary", "ring-offset-2");
  }

  if (platform === "other" || !deepLink) return;

  root
    .querySelectorAll<HTMLAnchorElement>(`a[data-store="${platform}"]`)
    .forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const storeUrl = a.href;
        const startedAt = Date.now();

        // Try to open the app via its Universal/App Link. If the app is
        // installed and claims the domain, the OS opens it and the page
        // goes hidden. Otherwise we fall back to the store after a delay.
        const fallback = () => {
          if (Date.now() - startedAt < 2000 && !document.hidden) {
            window.location.href = storeUrl;
          }
        };

        const timer = window.setTimeout(fallback, 1200);
        document.addEventListener(
          "visibilitychange",
          () => {
            if (document.hidden) window.clearTimeout(timer);
          },
          { once: true },
        );

        window.location.href = deepLink;
      });
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
