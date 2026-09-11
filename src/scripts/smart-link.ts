type Platform = "ios" | "android" | "other";

function detectPlatform(): Platform {
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}

// Chrome intent URL: opens the app if the package is installed, otherwise
// the browser navigates to browser_fallback_url (the Play Store page).
function androidIntentUrl(deepLink: string, pkg: string, fallback: string) {
  const { host, pathname, search } = new URL(deepLink);
  return (
    `intent://${host}${pathname}${search}#Intent;scheme=https;package=${pkg};` +
    `S.browser_fallback_url=${encodeURIComponent(fallback)};end`
  );
}

function init() {
  const root = document.querySelector<HTMLElement>("[data-store-buttons]");
  if (!root) return;

  const platform = detectPlatform();

  const matching = root.querySelector<HTMLAnchorElement>(
    `[data-store="${platform}"]`,
  );
  if (matching) {
    matching.classList.add("ring-2", "ring-secondary", "ring-offset-2");
  }

  // iOS: Universal Links never fire from a page on the same domain and JS
  // redirects don't trigger them, so the badge links straight to the App
  // Store (which shows "Abrir" when installed). The Smart App Banner in
  // Base.astro covers opening the app from Safari.
  //
  // Android (Chromium browsers): rewrite the Play badge to an intent:// URL
  // that opens the app when installed and falls back to the store.
  const { deepLink, androidPackage } = root.dataset;
  if (platform !== "android" || !deepLink || !androidPackage) return;
  if (!/Chrome\//.test(navigator.userAgent)) return;

  root
    .querySelectorAll<HTMLAnchorElement>('a[data-store="android"]')
    .forEach((a) => {
      a.href = androidIntentUrl(deepLink, androidPackage, a.href);
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
