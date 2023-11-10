<script setup lang="ts">
const { isMobile } = useDevice()
</script>

<template>
  <div h-full>
    <slot />
    <ClientOnly v-if="!isMobile">
      <Music />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
