export const site = {
  name: "Bubl",
  domain: "app.debubl.com",
  url: "https://app.debubl.com",
  tagline: "Agendá y mandá a lavar tu auto desde tu celular.",
  description:
    "Descarga Bubl para iOS o Android y empieza en segundos.",
  locale: "es",
};

const badges = {
  ios: { badge: "/badges/app-store.svg", alt: "Descargar en App Store" },
  android: { badge: "/badges/google-play.png", alt: "Disponible en Google Play" },
};

// Cada app tiene su ficha en las tiendas y su App Link (Android): desde el
// botón de Play se abre vía intent:// con `deepLink` y, si la app no está
// instalada, cae a la tienda. En iOS los Universal Links no se disparan desde
// el propio dominio (Safari los abre como página web), así que el botón va
// directo al App Store y el Smart App Banner (Base.astro) ofrece "Abrir" si
// está instalada.
export const apps = {
  // App de clientes: reclama todo el dominio salvo /runner/*.
  customer: {
    name: "Bubl",
    ios: {
      appId: "6807401310",
      url: "https://apps.apple.com/us/app/bubl/id6807401310",
      ...badges.ios,
    },
    android: {
      packageName: "com.mas595.bubl",
      url: "https://play.google.com/store/apps/details?id=com.mas595.bubl",
      ...badges.android,
    },
    deepLink: "https://app.debubl.com/open",
  },
  // App de proveedores (lavaderos): solo reclama rutas bajo /runner/*, ver
  // el intent-filter del AndroidManifest y apple-app-site-association.
  runner: {
    name: "Bubl para lavaderos",
    ios: {
      appId: "6804685476",
      url: "https://apps.apple.com/us/app/bubl-para-lavaderos/id6804685476",
      ...badges.ios,
    },
    android: {
      packageName: "com.mas595.bublrunner",
      url: "https://play.google.com/store/apps/details?id=com.mas595.bublrunner",
      ...badges.android,
    },
    deepLink: "https://app.debubl.com/runner/service-requests",
  },
};

export type AppKey = keyof typeof apps;
