// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  compatibilityDate: "2025-01-02",
  runtimeConfig: {
    public: {
      url: 'http://localhost:3000',
    },
    stripe: {
      publishableKey: '',
      secretKey: '',
      webhookSecret: '',
    },
  },
  modules: ['@nuxt/ui', 'radix-vue/nuxt'],
  ui: {
    global: true,
    icons: ['solar', 'tabler', 'octicon'],
  },
})