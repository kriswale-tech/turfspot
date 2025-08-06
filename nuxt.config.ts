import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

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

  modules: ["@nuxt/icon", "@nuxt/eslint", "@nuxt/image", "@nuxt/fonts"],
});
