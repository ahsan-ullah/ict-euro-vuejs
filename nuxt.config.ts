// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/node_modules/bootstrap/dist/css/bootstrap.min.css"],
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-icon",
  ],
  runtimeConfig: {
    public: {
      baseUrl: "http://127.0.0.1:8000/",
    },
  },
});
