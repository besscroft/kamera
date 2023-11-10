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
  <div h-full>
    <slot />
    <ClientOnly v-if="!isMobile">
      <n-back-top :right="smAndLarger ? 100 : 24" />
      <Music />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
