<script setup lang="ts">
const { isMobile } = useDevice()
</script>

<template>
  <div h-full>
    <div style="min-height: calc(100vh - 3.5rem);">
      <slot />
    </div>
    <ClientOnly v-if="!isMobile">
      <Music />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
