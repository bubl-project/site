export const site = {
  name: "Bubl",
  domain: "app.debubl.com",
  url: "https://app.debubl.com",
  tagline: "Agenda y manda a lavar tu auto desde tu celular.",
  description:
    "Descarga Bubl para iOS o Android y empieza en segundos.",
  locale: "es",
};

export const stores = {
  ios: {
    // TODO: reemplazar con la URL real de App Store
    url: "https://apps.apple.com/app/idXXXXXXXXX",
    badge: "/badges/app-store.svg",
    alt: "Descargar en App Store",
  },
  android: {
    // TODO: reemplazar con la URL real de Play Store
    url: "https://play.google.com/store/apps/details?id=com.debubl.app",
    badge: "/badges/google-play.png",
    alt: "Disponible en Google Play",
  },
};

// Universal Link destino — la app debe declarar app.debubl.com como
// Associated Domain (iOS) y App Link (Android). Cualquier ruta bajo /open
// la reclama la app; si el usuario no la tiene instalada cae a la tienda.
export const deepLink = "https://app.debubl.com/open";
