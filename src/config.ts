export const site = {
  name: "Bubl",
  domain: "app.debubl.com",
  url: "https://app.debubl.com",
  tagline: "Agendá y mandá a lavar tu auto desde tu celular.",
  description:
    "Descarga Bubl para iOS o Android y empieza en segundos.",
  locale: "es",
};

export const stores = {
  ios: {
    url: "https://apps.apple.com/us/app/bubl/id6807401310",
    badge: "/badges/app-store.svg",
    alt: "Descargar en App Store",
  },
  android: {
    url: "https://play.google.com/store/apps/details?id=com.mas595.bubl",
    badge: "/badges/google-play.png",
    alt: "Disponible en Google Play",
  },
};

// Universal Link destino — la app debe declarar app.debubl.com como
// Associated Domain (iOS) y App Link (Android). Cualquier ruta bajo /open
// la reclama la app; si el usuario no la tiene instalada cae a la tienda.
export const deepLink = "https://app.debubl.com/open";
