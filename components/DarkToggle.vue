<script setup lang="ts">
import { useUserStore } from '~/composables/user'

const isDark = useDark()
const router = useRouter()
const route = useRoute()
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
  <div flex flex-row items-center justify-center space-x-2>
    <button
      class="!outline-none"
      :title="isDark ? '切换至⌈白夜⌋' : '切换至⌈常夜⌋'"
      @click="toggleDark"
    >
      <span dark:i-carbon-moon i-carbon-sun block aria-hidden="true" />
    </button>
    <span v-if="!user.token" i-carbon-user block cursor-pointer aria-hidden="true" title="登录" @click="router.push('/login')" />
    <span v-else-if="!route.path.startsWith('/admin')" i-carbon-screen-map block cursor-pointer aria-hidden="true" title="后台" @click="router.push('/admin')" />
  </div>
</template>
