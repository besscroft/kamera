import { pwa } from './config/pwa'
import { appDescription } from './constants/index'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/device',
    '@formkit/auto-animate/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/supabase',
  ],

  supabase: {
    // Options
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },

  build: {
    transpile:
        process.env.NODE_ENV === 'production'
            ? [
              'naive-ui',
              'vueuc',
              '@css-render/vue3-ssr',
              '@juggle/resize-observer'
            ]
            : ['@juggle/resize-observer']
  },

  vite: {
    optimizeDeps: {
      include:
          process.env.NODE_ENV === 'development'
              ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
              : []
    },
    plugins: [
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
      }),
    ]
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
    emitRouteChunkError: false,
  },

  pinia: {
    autoImports: [
      'defineStore',
    ]
  },

  piniaPersistedstate: {
    storage: 'localStorage',
    debug: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
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
      routes: [
        '/',
        '/about',
        '/cosplay',
        '/tietie',
        '/timeline',
        '/robots.txt',
        '/manifest.webmanifest',
      ],
    },
    preset: 'vercel'
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'naive-ui-style' },
        { name: 'theme-color', content: '#38f8f8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      ],
      htmlAttrs: {
        lang: 'zh'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  pwa,

  devtools: {
    enabled: true,
  },
})
