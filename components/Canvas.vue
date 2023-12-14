<script setup lang="ts">
const props = defineProps<{
  showModal?: boolean
  imgId: number
  dataList: {
    type: []
  }
}>()

const emit = defineEmits(['modalUpdate'])
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
    v-model="show"
    w-full min-h-full
    title="点击图片预览"
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
            <ImageExif v-else :exif="obj.exif" />
          </el-card>
        </template>
      </UTabs>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>
