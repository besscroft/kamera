<script setup lang="ts">
import { useUserStore } from '~/composables/user'

const isDark = useDark()
const router = useRouter()
const user = useUserStore()

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
  <div flex flex-row justify-center items-center space-x-2>
    <button
      class="!outline-none"
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggleDark"
    >
      <span class="dark:i-carbon-moon i-carbon-sun block" aria-hidden="true" />
    </button>
    <span v-if="!user.token" class="i-carbon-user block cursor-pointer" aria-hidden="true" @click="router.push('/login')" title="登录" />
    <span v-else class="i-carbon-screen-map block cursor-pointer" aria-hidden="true" @click="router.push('/admin')" title="后台" />
  </div>
</template>
