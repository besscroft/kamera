<script setup lang="ts">
import { appName } from '~/constants'
import { darkTheme, NConfigProvider, zhCN, dateZhCN } from 'naive-ui'

const isDark = useDark()

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const lightThemeOverrides = {
  common: {
    primaryColor: '#FFFFFF'
  }
}

const darkThemeOverrides = {
  common: {
    primaryColor: '#000000'
  },
  upload: {
    primaryColor: '#000000'
  }
}

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NConfigProvider
      class="w-full h-full"
      :theme="isDark ? darkTheme : undefined"
      :theme-overrides="isDark ? darkThemeOverrides : lightThemeOverrides"
      :locale="zhCN"
      :date-locale="dateZhCN"
    >
      <NMessageProvider>
        <NuxtPage />
      </NMessageProvider>
    </NConfigProvider>
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  color-scheme: dark;
  background: #121212;
  color: white;

}
html.dark .shiki-light {
  display: none;
}
html:not(.dark) .shiki-dark {
  display: none;
}
html.dark ::-moz-selection  {
  background: #444;
}
html.dark ::selection {
  background: #444;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 2147483646;
}
.dark::view-transition-old(root) {
  z-index: 2147483646;
}
.dark::view-transition-new(root) {
  z-index: 1;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

@font-face {
  font-family: 'LXGWNeoXiHei';
  src: url('public/fonts/LXGWNeoXiHei.ttf');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>
