<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps({
  showModal: Boolean,
  imgId: Number,
  dataList: {
    type: Array,
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
const { isMobile } = useDevice()
const show = ref(false)
const rating = ref(0)
const emit = defineEmits(['modalUpdate'])

const xClick = () => {
  props.imgId = 0
  props.dataList = []
  show.value = false
  emit('modalUpdate', false)
}

watch(() => props.showModal, (val) => {
  show.value = props.showModal
  rating.value = props.dataList?.find((item: any) => item.id === props.imgId)?.rating
})

onMounted(() => {
  rating.value = props.dataList?.find((item: any) => item.id === props.imgId)?.rating
})

onUnmounted(() => {
  emit('modalUpdate')
})
</script>

<template>
  <el-dialog
    min-h-full w-full
    v-model="show"
    align-center
    @close="() => xClick()"
  >
    <div :class="smAndLarger || !isMobile ? 'grid grid-cols-1 gap-2 md:grid-cols-3 lg:gap-4' : 'h-full flex flex-col pt-6 space-y-2'">
      <div :class="smAndLarger || !isMobile ? 'md:col-span-2 max-h-full flex justify-center h-[90vh]' : ''">
        <ClientOnly>
          <el-image
            :class="smAndLarger || !isMobile ? 'h-[85vh]' : ''"
            :src="dataList.find((item: any) => item.id === imgId)?.url"
            :alt="dataList.find((item: any) => item.id === imgId)?.detail"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="dataList?.filter((item: any) => item.id === imgId)?.map((item: any) => item.url)"
            :initial-index="1"
            fit="contain"
          />
        </ClientOnly>
      </div>
      <div class="flex flex-col space-y-4 mt-8">
        <div class="mx-auto max-w-md rounded-lg bg-white dark:bg-gray-300 shadow-md w-full">
          <div class="p-4">
            <p class="mt-1 text-gray-500 text-center">点击图片预览</p>
          </div>
        </div>
        <div class="mx-auto max-w-md rounded-lg bg-white dark:bg-gray-300 shadow-md w-full">
          <div class="p-4">
            <h3 class="flex justify-center items-center space-x-1 text-base text-center font-medium text-gray-900">
              <div i-carbon-image-search />
              <p>EXIF</p>
            </h3>
            <el-collapse>
              <el-collapse-item title="点击查看 EXIF 信息" name="1">
                <el-descriptions
                  :title="Object.keys(dataList.find((item: any) => item.id === imgId)?.exif).length === 0 ? 'EXIF 信息为空！' : ''"
                  direction="vertical"
                  :column="smAndLarger ? 2 : 1"
                  border
                >
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.Make?.description" label="相机品牌">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.Make?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.Model?.description" label="相机型号">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.Model?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.[`Bits Per Sample`]?.description" label="bit 位数">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.["Bits Per Sample"]?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.DateTime?.description" label="拍摄时间">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.DateTime?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.ExposureTime?.description" label="快门时间">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.ExposureTime?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.FNumber?.description" label="光圈">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.FNumber?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.ExposureProgram?.description" label="曝光模式">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.ExposureProgram?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.ISOSpeedRatings?.description" label="ISO">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.ISOSpeedRatings?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.FocalLength?.description" label="焦距">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.FocalLength?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.LensSpecification?.description" label="镜头规格">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.LensSpecification?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.LensModel?.description" label="镜头型号">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.LensModel?.description }}
                  </el-descriptions-item>
                  <el-descriptions-item v-if="dataList.find((item: any) => item.id === imgId)?.exif?.ExposureMode?.description" label="曝光模式">
                    {{ dataList.find((item: any) => item.id === imgId)?.exif?.ExposureMode?.description }}
                  </el-descriptions-item>
                </el-descriptions>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="mx-auto max-w-md rounded-lg bg-white dark:bg-gray-300 shadow-md w-full hover:-translate-y-1 hover:scale-105 hover:transition duration-300">
          <div class="p-4">
            <h3 class="flex justify-center items-center space-x-1 text-base text-center font-medium text-gray-900">
              <div i-carbon-camera />
              <p>相机</p>
            </h3>
            <p class="mt-1 text-gray-500 text-center">{{ dataList.find((item: any) => item.id === imgId)?.exif?.Model?.description || 'N&A' }}</p>
          </div>
        </div>
        <div class="mx-auto max-w-md rounded-lg bg-white dark:bg-gray-300 shadow-md w-full hover:-translate-y-1 hover:scale-105 hover:transition duration-300">
          <div class="p-4">
            <h3 class="flex justify-center items-center space-x-1 text-base text-center font-medium text-gray-900">
              <div i-carbon-txt />
              <p>相片描述</p>
            </h3>
            <p class="mt-1 text-gray-500 text-center">{{ dataList.find((item: any) => item.id === imgId)?.detail || 'N&A' }}</p>
          </div>
        </div>
        <div class="mx-auto max-w-md rounded-lg bg-white dark:bg-gray-300 shadow-md w-full hover:-translate-y-1 hover:scale-105 hover:transition duration-300">
          <div class="p-4">
            <h3 class="flex justify-center items-center space-x-1 text-base text-center font-medium text-gray-900">
              <div i-carbon-thumbs-up />
              <p>评分</p>
            </h3>
            <div flex justify-center>
              <el-rate
                v-model="rating"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value} 分"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>
