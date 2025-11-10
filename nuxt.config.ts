import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // app
  app: {
    head: {
      title: "Find the best Astro Turfs in Ghana on TurfSpot", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        {
          name: "description",
          content:
            "Find the best Astro Turfs in Ghana on TurfSpot. Discover and book Astro Turfs effortlessly with TurfSpot.",
        },
      ],
    },
  },

  //tailwind
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  //fonts
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      styles: ["normal", "italic"],
    },
  },

  //runtime config
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      web3formsApiKey: process.env.NUXT_WEB3FORM_ACCESS_KEY,
    },
  },

  // image optimization
  image: {
    domains: ["res.cloudinary.com"],
  },

  // gtag
  gtag: {
    id: "G-F3TC4Y2PHD",
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/fonts",
    "@pinia/nuxt",
    "@nuxtjs/leaflet",
    "nuxt-gtag",
  ],
});
