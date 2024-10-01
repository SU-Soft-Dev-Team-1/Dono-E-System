export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "./src",

  modules: ['@nuxtjs/tailwindcss', 
    '@nuxt/eslint'],

  compatibilityDate: "2024-09-26",
});
