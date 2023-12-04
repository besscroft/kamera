<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const { isMobile } = useDevice()
const route = useRoute()
const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <main>
    <Header />
    <slot />
    <ClientOnly>
      <el-backtop :right="smAndLarger ? 100 : 24" :bottom="smAndLarger ? 100 : 24" z-50 />
      <Music v-if="!isMobile" />
    </ClientOnly>
    <Footer v-if="route.path === '/' || route.path === '/about'" />
  </main>
</template>
