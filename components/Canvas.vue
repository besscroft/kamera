<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { GlobalThemeOverrides, useThemeVars } from 'naive-ui'

const props = defineProps({
  showModal: Boolean,
  imgId: Number,
  dataList: {
    type: Array,
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
const color = useColorMode()
const { isMobile } = useDevice()
const show = ref(false)
const emit = defineEmits(['modalUpdate'])

const xClick = () => {
  props.imgId = 0
  props.dataList = []
  show.value = false
  emit('modalUpdate', false)
}

const { popoverColor, boxShadow2, textColor2, borderRadius } =
    useThemeVars().value
const themeOverrides: NonNullable<GlobalThemeOverrides['Image']> = {
  toolbarColor: popoverColor,
  toolbarBoxShadow: boxShadow2,
  toolbarIconColor: textColor2,
  toolbarBorderRadius: borderRadius
}

watch(() => props.imgId, (val) => {
  show.value = props.showModal
})

onUnmounted(() => {
  emit('modalUpdate')
})
</script>

<template>
  <n-modal
    class="h-full w-full"
    preset="card"
    v-model:show="show"
    @on-after-leave="xClick"
  >
    <div :class="smAndLarger || !isMobile ? 'grid grid-cols-1 gap-2 md:grid-cols-3 lg:gap-4' : 'h-full flex flex-col pt-6 space-y-2'">
      <div :class="smAndLarger || !isMobile ? 'md:col-span-2 max-h-full' : ''">
        <n-image
          :theme-overrides="themeOverrides"
          show-toolbar-tooltip
          :src="dataList[imgId-1]?.url"
        />
      </div>
      <div class="flex flex-col space-y-4 mt-8">
        <div class="flex flex-col card w-full h-16 p-2 bg-base-100 shadow-md shadow-slate-100 hover:bg-slate-400 justify-center items-center">
          <span>EXIF</span>
          <span>略...</span>
        </div>
        <div class="flex flex-col card w-full h-16 p-2 bg-base-100 shadow-md shadow-slate-100 hover:bg-slate-400 justify-center items-center">
          <span>相机</span>
          <span>{{ dataList[imgId-1]?.device }}</span>
        </div>
        <div class="flex flex-col card w-full h-16 p-2 bg-base-100 shadow-md shadow-slate-100 hover:bg-slate-400 justify-center items-center">
          <span>相片描述</span>
          <span>{{ dataList[imgId-1]?.detail }}</span>
        </div>
        <div class="flex flex-col card w-full h-16 p-2 bg-base-100 shadow-md shadow-slate-100 hover:bg-slate-400 justify-center items-center">
          <span>评分</span>
          <n-rate readonly :default-value="dataList[imgId-1]?.rating" />
        </div>
      </div>
    </div>
  </n-modal>
</template>

<style scoped>

</style>
