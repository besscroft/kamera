<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const { isMobile } = useDevice()
const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <div>
    <Header />
    <div style="min-height: calc(100vh - 7rem);" pb-14>
      <slot />
    </div>
    <ClientOnly>
      <el-backtop v-if="mdAndLarger" :right="100" :bottom="100" z-50 />
      <Music v-if="mdAndLarger && !isMobile" />
      <NavBottom v-if="!mdAndLarger" />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
