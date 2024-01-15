<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
const isDark = useDark()

// @ts-expect-error: Transition API
const isAppearanceTransition = document.startViewTransition
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
function toggleDark(event?: MouseEvent) {
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <button
    v-if="!mdAndLarger"
    flex flex-row items-center block px-5 py-2 focus-blue w-full
    class="!outline-none"
    :title="isDark ? '切换至⌈白夜⌋' : '切换至⌈常夜⌋'"
    @click="toggleDark"
  >
    <span dark:i-carbon-moon i-carbon-sun block text-xl me-4 aria-hidden="true" />{{ isDark ? '切换至⌈白夜⌋' : '切换至⌈常夜⌋' }}
  </button>
  <UButton v-else color="white" icon="dark:i-carbon-moon i-carbon-sun" :label="isDark ? '切换至⌈白夜⌋' : '切换至⌈常夜⌋'" @click="toggleDark" />
</template>
