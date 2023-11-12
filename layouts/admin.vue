<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const router = useRouter()
const { isMobile } = useDevice()

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')

onBeforeMount(async () => {
  const user = useUserStore()
  if (!user.token) {
    router.push('/login')
  } else {
    const { data } = await $fetch('/api/verify', {
      method: 'get',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      }
    }).catch((error) => {
      console.log(error)
      router.push('/login')
    })
    if (data === !0) {
      router.push('/login')
    }
  }
})
</script>

<template>
  <div>
    <Header />
    <slot />
    <ClientOnly v-if="!isMobile">
      <n-back-top :right="smAndLarger ? 100 : 24" />
      <Music />
    </ClientOnly>
    <div class="fixed bottom-20px z-50 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
      <div class="inline-flex -space-x-0 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
        <button type="button" @click="router.push('/admin')" class="inline-flex items-center bg-white dark:bg-slate-700 px-4 py-2.5 text-center text-sm font-medium text-secondary-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-400">
          相片上传
        </button>
        <button type="button" @click="router.push('/admin/list')" class="inline-flex items-center bg-white dark:bg-slate-700 px-4 py-2.5 text-center text-sm font-medium text-secondary-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-400">
          相片维护
        </button>
        <button type="button" @click="router.push('/admin/system')" class="inline-flex items-center bg-white dark:bg-slate-700 px-4 py-2.5 text-center text-sm font-medium text-secondary-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-400">
          系统设置
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
