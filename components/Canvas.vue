<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps<{
  showModal?: boolean
  imgId: number
  dataList: {
    type: []
  }
}>()

const emit = defineEmits(['modalUpdate'])
const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
const show = ref(false)
const obj = ref({})
const defaultIndex = ref(0)
const items = [{
  slot: 'info',
  label: '信息',
}, {
  slot: 'other',
  label: '更多',
}]

const xClick = () => {
  props.imgId = 0
  props.dataList = []
  obj.value = {}
  show.value = false
  emit('modalUpdate', false)
}

watch(() => props.showModal, (val) => {
  defaultIndex.value = 0
  show.value = props.showModal
  obj.value = props.dataList?.find((item: any) => item.id === props.imgId)
})

onMounted(() => {
  obj.value = props.dataList?.find((item: any) => item.id === props.imgId)
})

onUnmounted(() => {
  defaultIndex.value = 0
  emit('modalUpdate')
})
</script>

<template>
  <el-dialog
    min-h-full w-full
    title="点击图片预览"
    v-model="show"
    align-center
    @close="() => xClick()"
  >
    <div h-full flex flex-col space-y-2 lg:grid lg:grid-cols-1 lg:gap-2 lg:grid-cols-3 xl:gap-4>
      <div lg:col-span-2 lg:max-h-full lg:flex lg:justify-center class="lg:h-[90vh]">
        <ClientOnly>
          <el-image
            class="lg:h-[85vh]"
            :src="obj?.url"
            :alt="obj?.detail"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[obj?.url]"
            :initial-index="1"
            fit="contain"
          />
        </ClientOnly>
      </div>
      <UTabs :items="items" v-model="defaultIndex" mt-8 w-full>
        <template #info="{ item }">
          <div flex flex-col space-y-2>
            <el-card class="box-card" mx-auto rounded-lg shadow-md w-full>
              <h3 flex justify-center items-center space-x-1 text-base text-center font-medium>
                <div i-carbon-camera />
                <p>相机</p>
              </h3>
              <p mt-1 text-center>{{ obj?.exif?.Model?.description || 'N&A' }}</p>
            </el-card>
            <el-card class="box-card" mx-auto rounded-lg shadow-md w-full>
              <h3 flex justify-center items-center space-x-1 text-base text-center font-medium>
                <div i-carbon-txt />
                <p>相片描述</p>
              </h3>
              <p mt-1 text-center>{{ obj?.detail || 'N&A' }}</p>
            </el-card>
            <el-card class="box-card" mx-auto rounded-lg shadow-md w-full>
              <h3 flex justify-center items-center space-x-1 text-base text-center font-medium>
                <div i-carbon-thumbs-up />
                <p>评分</p>
              </h3>
              <div flex justify-center>
                <el-rate
                  v-model="obj.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value} 分"
                />
              </div>
            </el-card>
          </div>
        </template>

        <template #other="{ item }">
          <el-card class="box-card" mx-auto rounded-lg shadow-md w-full>
            <h3 flex justify-center items-center space-x-1 text-base text-center font-medium>
              <div i-carbon-image-search />
              <p>EXIF</p>
            </h3>
            <UAlert
              v-if="Object.keys(obj?.exif).length === 0"
              description="这张图片似乎读取不到 EXIF 信息呢！"
              :avatar="{ src: '/112962239_p0.jpg' }"
              title="噔噔！"
              mt-2
            />
            <el-descriptions
              v-else
              direction="vertical"
              :column="smAndLarger ? 3 : 2"
              border mt-2
            >
              <el-descriptions-item v-if="obj?.exif?.Make?.description" label="相机品牌">
                {{ obj?.exif?.Make?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.Model?.description" label="相机型号">
                {{ obj?.exif?.Model?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.[`Bits Per Sample`]?.description" label="bit 位数">
                {{ obj?.exif?.["Bits Per Sample"]?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.DateTime?.description" label="拍摄时间">
                {{ obj?.exif?.DateTime?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.ExposureTime?.description" label="快门时间">
                {{ obj?.exif?.ExposureTime?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.FNumber?.description" label="光圈">
                {{ obj?.exif?.FNumber?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.ExposureProgram?.description" label="曝光程序">
                {{ obj?.exif?.ExposureProgram?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.ISOSpeedRatings?.description" label="ISO">
                {{ obj?.exif?.ISOSpeedRatings?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.FocalLength?.description" label="焦距">
                {{ obj?.exif?.FocalLength?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.LensSpecification?.description" label="镜头规格">
                {{ obj?.exif?.LensSpecification?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.LensModel?.description" label="镜头型号">
                {{ obj?.exif?.LensModel?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj?.exif?.ExposureMode?.description" label="曝光模式">
                {{ obj?.exif?.ExposureMode?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj.exif?.CFAPattern?.description" label="CFA 模式">
                {{ obj.exif?.CFAPattern?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj.exif?.ColorSpace?.description" label="色彩空间">
                {{ obj.exif?.ColorSpace?.description }}
              </el-descriptions-item>
              <el-descriptions-item v-if="obj.exif?.WhiteBalance?.description" label="白平衡">
                {{ obj.exif?.WhiteBalance?.description }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </template>
      </UTabs>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>
