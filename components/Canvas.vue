<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps({
  imgId: Number,
  dataList: {
    type: Array,
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
const color = useColorMode()
const { isMobile } = useDevice()

const xClick = () => {
  props.imgId = 0
  props.dataList = []
}
</script>

<template>
  <dialog id="kamera_modal" class="modal w-full h-full">
    <div class="modal-box rounded w-full h-full max-w-full max-h-full base-100 scrollbar-hide">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="xClick">✕</button>
      </form>
      <div :class="smAndLarger || !isMobile ? 'grid grid-cols-1 gap-2 md:grid-cols-3 lg:gap-4' : 'h-full flex flex-col pt-6 space-y-2'">
        <div :class="smAndLarger || !isMobile ? 'md:col-span-2 max-h-full' : ''">
          <img class="max-h-full" :src="dataList[imgId-1]?.url" />
        </div>
        <div class="flex flex-col space-y-4 mt-8">
          <div class="flex flex-col card w-full h-16 p-2 bg-base-100 shadow-md shadow-slate-100 hover:bg-slate-400 justify-center items-center">
            <span class="dark:text-slate-400">EXIF</span>
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
            <div class="rating gap-1">
              <input type="radio" name="rating-3" class="mask mask-heart bg-red-400" :checked="dataList[imgId-1]?.rating === 1" />
              <input type="radio" name="rating-3" class="mask mask-heart bg-orange-400" :checked="dataList[imgId-1]?.rating === 2" />
              <input type="radio" name="rating-3" class="mask mask-heart bg-yellow-400" :checked="dataList[imgId-1]?.rating === 3" />
              <input type="radio" name="rating-3" class="mask mask-heart bg-lime-400" :checked="dataList[imgId-1]?.rating === 4" />
              <input type="radio" name="rating-3" class="mask mask-heart bg-green-400" :checked="dataList[imgId-1]?.rating === 5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>

</style>
