import { appDescription } from './constants/index'
import photosList from './constants/photos.json'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
    '@nuxtjs/device',
    '@formkit/auto-animate/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@element-plus/nuxt',
    '@nuxt/ui',
  ],

  vue: {
    defineModel: true,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
    emitRouteChunkError: 'automatic',
  },

  pinia: {
    autoImports: [
      'defineStore',
    ],
  },

  piniaPersistedstate: {
    storage: 'localStorage',
    debug: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
    'element-plus/theme-chalk/dark/css-vars.css',
    'vue-waterfall-plugin-next/dist/style.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
      routes: [
        '/',
        '/about',
        '/login',
        '/admin',
        '/admin/upload',
        '/admin/list',
        '/admin/system',
      ],
    },
    hooks: {
      'prerender:routes': async function (routes) {
        const preRoutes = []
        if (photosList) {
          const genericRoutes = photosList?.map((item: any) => {
            return item.url
          })
          preRoutes.push(...genericRoutes)
        }

        if (preRoutes.length) {
          for (const route of preRoutes) {
            routes.add(route)
          }
        }
      },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'theme-color', content: '#38f8f8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      ],
      htmlAttrs: {
        lang: 'zh',
      },
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
