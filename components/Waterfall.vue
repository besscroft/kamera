<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const cols = ref(2)
const imgId = ref<number>(0)
const showModal = ref<boolean>(false)
const props = defineProps({
  loading: Boolean,
  handleButton: Boolean,
  dataList: {
    type: Array,
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const emit = defineEmits(['dataHandle'])

const modalUpdate = () => {
  showModal.value = false
}

const clickImg = (id: Number) => {
  imgId.value = id
  showModal.value = true
}

onMounted(async () => {
  await emit('dataHandle')
  if (typeof document != 'undefined') import('wc-waterfall')
  cols.value = breakpoints.greaterOrEqual('lg').value ? 4 : breakpoints.greaterOrEqual('md').value ? 3 : breakpoints.greaterOrEqual('sm').value ? 2 : 1
})

watch(breakpoints.current(), (val) => {
  cols.value = breakpoints.greaterOrEqual('lg').value ? 4 : breakpoints.greaterOrEqual('md').value ? 3 : breakpoints.greaterOrEqual('sm').value ? 2 : 1
})

onUnmounted(() => {
  imgId.value = 0
})
</script>

<template>
  <div px-2>
    <wc-waterfall v-if="dataList?.length > 5" :gap="10" :cols="cols" p-1 md:px-4 lg:px-8 xl:px-12>
      <div v-for="item in dataList">
        <el-image
          lazy shadow-xl border-4 hover:-translate-y-1 hover:scale-105 hover:transition duration-300 cursor-pointer
          :key="item.id"
          :src="item.url"
          @click="clickImg(item.id)"
        >
          <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
          </template>
        </el-image>
      </div>
    </wc-waterfall>
    <div v-else-if="dataList?.length <= 5 && dataList?.length !== 0" v-auto-animate p-1 md:px-4 lg:px-8 xl:px-12 columns-1 md:columns-2 lg:columns-3 xl:columns-4>
      <div pt-2 v-for="item in dataList" :key="item.id">
        <el-image
          lazy shadow-xl border-4 hover:-translate-y-1 hover:scale-105 hover:transition duration-300 cursor-pointer
          :src="item.url"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          fit="cover"
          @click="clickImg(item.id)"
        >
          <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
          </template>
        </el-image>
      </div>
    </div>
    <el-skeleton v-else-if="dataList?.length <= 5 && loading" animated grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4>
      <template #template>
        <el-skeleton-item variant="image" v-for="index in 4" :key="index" style="height: 16rem" />
      </template>
    </el-skeleton>
    <el-empty v-else p2 description="暂时还没有内容哦！" />

    <Canvas :showModal="showModal" :dataList="dataList" :imgId="imgId" @modalUpdate="modalUpdate" />
    <div v-if="handleButton && dataList?.length !== 0" flex justify-center items-center w-full h-24>
      <el-button :loading="loading" @click="emit('dataHandle')">加载更多</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>
