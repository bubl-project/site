import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://app.debubl.com",
  integrations: [tailwind()],
  build: {
    assets: "_assets",
  },
});
