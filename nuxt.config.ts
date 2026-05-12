export default defineNuxtConfig({
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    public: { apiBaseUrl: process.env.API_BASE_URL }
  },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@pinia/nuxt'
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true }
  },
  compatibilityDate: '2025-01-15',
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  fonts: {
    families: [
      {
        name: 'Plus Jakarta Sans',
        provider: 'google',
        weights: [400, 600]
      },
      {
        name: 'Inter',
        provider: 'google',
        weights: [400]
      }
    ]
  }
})
