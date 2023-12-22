<script setup lang="ts">
const { isMobile } = useDevice()
</script>

<template>
  <div h-full>
    <div h-full>
      <slot />
    </div>
    <ClientOnly v-if="!isMobile">
      <Music />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
