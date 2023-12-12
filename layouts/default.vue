<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const { isMobile } = useDevice()
const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <main>
    <Header />
    <div style="min-height: calc(100vh - 3.5rem);" pb-14>
      <slot />
    </div>
    <el-backtop v-if="smAndLarger" :right="100" :bottom="100" z-50 />
    <ClientOnly>
      <Music v-if="smAndLarger && !isMobile" />
      <NavBottom v-if="!smAndLarger" />
    </ClientOnly>
  </main>
</template>
