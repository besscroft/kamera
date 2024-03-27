<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { appName } from '~/constants/index'

const props = defineProps<{
  showModal?: boolean
  imgId: number
  dataList: {
    type: []
  }
}>()

const emit = defineEmits(['modalUpdate'])
const { share, isSupported } = useShare()
const source = ref('')
const show = ref(false)
const toast = useToast()
const obj = ref({})
const defaultIndex = ref(0)
const items = [{
  slot: 'info',
  label: '信息',
}, {
  slot: 'other',
  label: '更多',
}]

const shareHandle = (text, url) => {
  try {
    share({
      title: appName || '旅行足迹',
      text: text,
      url: url,
    })
  } catch (e) {
    toast.add({ title: '当前浏览器暂未支持！', timeout: 2000, color: 'red' })
  }
}

const copyHandle = (text) => {
  const { copy, isSupported } = useClipboard({ source })
  if (isSupported) {
    source.value = text
    copy(source.value)
  } else {
    toast.add({ title: '当前浏览器暂未支持！', timeout: 2000, color: 'red' })
  }
}

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
    v-model="show"
    w-full min-h-full
    align-center
    :show-close="false"
    @close="() => xClick()"
  >
    <template #header="{ close }">
      <div flex flex-row justify-between>
        <span aria-label="点击下方图片预览">点击图片预览</span>
        <div flex space-x-3>
          <ClientOnly>
            <UPopover mode="hover">
              <div i-carbon-overflow-menu-horizontal cursor-pointer aria-label="更多操作按钮" />
              <template #panel>
                <div p-2>
                  <div
                    v-if="isSupported"
                    flex flex-row items-center rounded-md
                    block px-5 py-2 focus-blue w-full
                    transition-colors duration-200 transform cursor-pointer
                    hover="bg-gray-100 dark:(bg-gray-700 text-white)"
                    @click="shareHandle(obj?.detail, obj?.url)"
                    aria-label="分享"
                  >
                    <span i-carbon-crowd-report text-xl me-4 />分享
                  </div>
                  <div
                    flex flex-row items-center rounded-md
                    block px-5 py-2 focus-blue w-full
                    transition-colors duration-200 transform cursor-pointer
                    hover="bg-gray-100 dark:(bg-gray-700 text-white)"
                    @click="copyHandle(obj?.url)"
                    aria-label="复制链接"
                  >
                    <span i-carbon-copy text-xl me-4 />复制链接
                  </div>
                </div>
              </template>
            </UPopover>
          </ClientOnly>

          <div i-carbon-close-large cursor-pointer @click="close" aria-label="关闭当前图片详情" />
        </div>
      </div>
    </template>
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
              <p mt-1 text-center>{{ obj?.exif?.model || 'N&A' }}</p>
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
            <ImageExif v-else :exif="obj.exif" />
          </el-card>
        </template>
      </UTabs>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>
