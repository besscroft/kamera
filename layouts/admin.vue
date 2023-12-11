<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const router = useRouter()
const { isMobile } = useDevice()

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <div>
    <Header />
    <div>
      <slot />
    </div>
    <ClientOnly>
      <el-backtop :right="smAndLarger ? 100 : 24" :bottom="smAndLarger ? 100 : 24" z-50 />
      <Music v-if="!isMobile" />
    </ClientOnly>
    <div class="fixed bottom-20px z-50 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
      <el-space size="small" spacer="|">
        <el-button :type="isDark ? 'info' : ''" @click="router.push('/admin')"> 上传 </el-button>
        <el-button :type="isDark ? 'info' : ''" @click="router.push('/admin/list')"> 维护 </el-button>
        <el-button :type="isDark ? 'info' : ''" @click="router.push('/admin/system')"> 系统 </el-button>
      </el-space>
    </div>
  </div>
</template>

<style scoped>

</style>
