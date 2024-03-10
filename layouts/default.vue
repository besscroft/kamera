<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <main>
    <Header />
    <div style="min-height: calc(100vh - 3.5rem);" pb-14>
      <slot />
    </div>
    <el-backtop v-if="mdAndLarger" :right="100" :bottom="100" z-50 />
    <ClientOnly>
      <NavBottom v-if="!mdAndLarger" />
    </ClientOnly>
  </main>
</template>
