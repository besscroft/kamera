<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const { isMobile } = useDevice()
const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <div>
    <Header />
    <div style="min-height: calc(100vh - 7rem);" pb-14>
      <slot />
    </div>
    <ClientOnly>
      <el-backtop v-if="!smAndLarger" :right="100" :bottom="100" z-50 />
      <Music v-if="smAndLarger && !isMobile" />
      <NavBottom v-if="!smAndLarger" />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
