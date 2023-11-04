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
      <n-image v-for="item in dataList" :key="item.id"
        lazy shadow-xl border-4 hover:-translate-y-1 hover:scale-105 hover:transition duration-300
        cursor-pointer
        :src="item.url"
        @click="clickImg(item.id)"
        preview-disabled
      />
    </wc-waterfall>
    <div v-else-if="dataList?.length <= 5 && dataList?.length !== 0" v-auto-animate p-1 md:px-4 lg:px-8 xl:px-12 columns-1 md:columns-2 lg:columns-3 xl:columns-4>
      <div pt-2 v-for="item in dataList" :key="item.id">
        <n-image
          lazy shadow-xl border-4 hover:-translate-y-1 hover:scale-105 hover:transition duration-300
          cursor-pointer
          :src="item.url"
          @click="clickImg(item.id)"
          preview-disabled
        />
      </div>
    </div>
    <n-empty v-else p2 description="暂时还没有内容哦！">
      <template #icon>
        <n-icon>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 10h2v2h-2z" fill="currentColor"></path><path d="M12 10h2v2h-2z" fill="currentColor"></path><path d="M26 20h-5v-2h1a2.002 2.002 0 0 0 2-2v-4h2v-2h-2V8a2.002 2.002 0 0 0-2-2h-2V2h-2v4h-4V2h-2v4h-2a2.002 2.002 0 0 0-2 2v2H6v2h2v4a2.002 2.002 0 0 0 2 2h1v2H6a2.002 2.002 0 0 0-2 2v8h2v-8h20v8h2v-8a2.002 2.002 0 0 0-2-2zM10 8h12v8H10zm3 10h6v2h-6z" fill="currentColor"></path></svg>
        </n-icon>
      </template>
    </n-empty>

    <Canvas :showModal="showModal" :dataList="dataList" :imgId="imgId" @modalUpdate="modalUpdate" />
    <div v-if="handleButton && dataList?.length !== 0" flex justify-center items-center w-full h-24>
      <n-button :loading="loading" @click="emit('dataHandle')">
        加载更多
      </n-button>
    </div>
  </div>
</template>

<style scoped>

</style>
