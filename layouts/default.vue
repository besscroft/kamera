<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const { isMobile } = useDevice()
const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <main>
    <Header />
    <slot />
    <ClientOnly v-if="!isMobile">
      <n-back-top :right="smAndLarger ? 100 : 24" />
      <Music />
    </ClientOnly>
    <Footer />
  </main>
</template>
