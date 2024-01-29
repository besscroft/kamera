<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps({
  loading: Boolean,
  handleButton: Boolean,
  dataList: {
    type: Array,
  },
})
const emit = defineEmits(['dataHandle'])
const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')

const appConfig = useAppConfig()

const imgId = ref<number>(0)
const showModal = ref<boolean>(false)
const mounted = ref<boolean>(false)
const modalUpdate = () => {
  showModal.value = false
}

const clickImg = (id: number) => {
  imgId.value = id
  showModal.value = true
}

const Waterfall = defineAsyncComponent(() =>
  import('vue-waterfall-plugin-next').then((module) => module.Waterfall)
)
const LazyImg = defineAsyncComponent(() =>
  import('vue-waterfall-plugin-next').then((module) => module.LazyImg)
)

const breakPointsConfig = computed(() => {
  return {
    9999: { rowPerView: 4 },
    1280: { rowPerView: 3 },
    1024: { rowPerView: Number(appConfig.mobileRow) === 2 ? 2 : 1 },
  }
})

onMounted(async () => {
  mounted.value = true
  await emit('dataHandle')
})

onUnmounted(() => {
  imgId.value = 0
})
</script>

<template>
  <div px-2>
    <ClientOnly>
      <Waterfall
        v-if="dataList && dataList?.length > 0"
        :list="dataList"
        :gutter="mdAndLarger ? 12 : 4"
        :hasAroundGutter="true"
        :crossOrigin="false"
        :backgroundColor="isDark ? '#121212' : '#FFFFFF'"
        :breakpoints="breakPointsConfig"
      >
        <template #item="{ item }">
          <div class="card">
            <LazyImg
              shadow-xl border-4 hover:-translate-y-1 hover:scale-105 hover:transition duration-300 cursor-pointer
              :url="item.url"
              @click="clickImg(item.id)"
              :alt="item.detail"
            />
          </div>
        </template>
      </Waterfall>
      <el-skeleton v-else-if="loading" animated grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4>
        <template #template>
          <el-skeleton-item variant="image" v-for="index in 4" :key="index" style="height: 16rem" />
        </template>
      </el-skeleton>
      <el-empty v-else-if="!mounted" p2 description=" " />
      <el-empty v-else p2 description="暂时还没有内容哦！" />
    </ClientOnly>

    <Canvas :showModal="showModal" :dataList="dataList" :imgId="imgId" @modalUpdate="modalUpdate" />
    <div v-if="handleButton && dataList?.length !== 0" flex justify-center items-center w-full h-24>
      <el-button :loading="loading" @click="emit('dataHandle')">加载更多</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>
