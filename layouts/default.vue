<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <main>
    <Header />
    <slot />
    <n-back-top :right="smAndLarger ? 100 : 24" />
    <Footer />
  </main>
</template>
