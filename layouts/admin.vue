<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <div>
    <Header />
    <div style="min-height: calc(100vh - 7rem);">
      <slot />
    </div>
    <ClientOnly>
      <el-backtop v-if="mdAndLarger" :right="100" :bottom="100" z-50 />
      <NavBottom v-if="!mdAndLarger" />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
