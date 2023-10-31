<script setup lang="ts">
import { appName } from '~/constants'
import { darkTheme, NConfigProvider } from 'naive-ui'

const color = useColorMode()

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
      :theme="color.value === 'dark' ? darkTheme : undefined"
    >
      <NuxtPage />
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
  background: #222;
  color: white;
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
</style>
