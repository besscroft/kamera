<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElConfigProvider } from 'element-plus'
import { appName } from '~/constants'

onHydrated(() => {
  console.log(isHydrated.value)
})

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <UNotifications :ui="{ wrapper: 'z-[9999]', width: 'w-full md:w-80' }" />
    <ElConfigProvider :locale="zhCn">
      <NuxtPage />
    </ElConfigProvider>
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
