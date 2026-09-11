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
    appId: "6807401310",
    url: "https://apps.apple.com/us/app/bubl/id6807401310",
    badge: "/badges/app-store.svg",
    alt: "Descargar en App Store",
  },
  android: {
    packageName: "com.mas595.bubl",
    url: "https://play.google.com/store/apps/details?id=com.mas595.bubl",
    badge: "/badges/google-play.png",
    alt: "Disponible en Google Play",
  },
};

// App Link (Android): la app reclama las rutas bajo /open. Desde el botón
// de Play se abre vía intent:// y, si la app no está instalada, cae a la
// tienda. En iOS los Universal Links no se disparan desde el propio dominio
// (Safari los abre como página web), así que el botón va directo al App
// Store y el Smart App Banner (Base.astro) ofrece "Abrir" si está instalada.
export const deepLink = "https://app.debubl.com/open";
