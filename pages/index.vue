<script setup lang="ts">
import { useUserStore } from '~/composables/user'

const user = useUserStore()
const dataList = ref<Array<Object>>([])
const indexDataList = ref<Array<Object>>([])
const loading = ref<boolean>(false)
const indexLoading = ref<boolean>(false)
const imgId = ref<number>(0)
const showModal = ref<boolean>(false)
const handleButton = ref<boolean>(true)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 10,
})

const dataHandle = async () => {
  loading.value = true
  try {
    const { data } = await $fetch('/api/getImageList', {
      method: 'post',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      },
      body: { pageNum: 1, pageSize: 4, type: 'carousel' },
    })
    dataList.value = data
  } finally {
    loading.value = false
  }
}

const indexDataHandle = async () => {
  indexLoading.value = true
  try {
    const { total, totalPage, pageNum, pageSize, data } = await $fetch('/api/getImageList', {
      method: 'post',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      },
      body: { pageNum: pageInfo.pageNum, pageSize: pageInfo.pageSize, type: 'index' },
    })
    if (pageInfo.pageNum <= totalPage) {
      if (pageInfo.pageNum === totalPage) {
        handleButton.value = false
      }
      pageInfo.pageNum++
      if (indexDataList.value.length === 0) {
        indexDataList.value = data
      } else {
        indexDataList.value = indexDataList.value.concat(data)
      }
      pageInfo.total = total
      pageInfo.totalPage = totalPage
    }
  } finally {
    indexLoading.value = false
  }
}

const modalUpdate = () => {
  showModal.value = false
}

const clickImg = (id: number) => {
  imgId.value = id
  showModal.value = true
}

onUnmounted(() => {
  imgId.value = 0
  dataList.value = []
  indexDataList.value = []
  pageInfo.total = 0
  pageInfo.totalPage = 0
  pageInfo.pageNum = 1
})

onBeforeMount(async () => {
  await dataHandle()
  await indexDataHandle()
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div h-full p2>
    <div flex justify-center>
      <el-carousel v-if="dataList" aspect-video max-h-180 w-full md:h-180 max-w-7xl shadow-2xl rounded-sm>
        <el-carousel-item v-for="item in dataList" :key="item.id" h-full>
          <img lazy :src="item.url" :alt="item.detail" />
        </el-carousel-item>
      </el-carousel>
      <el-empty v-else-if="!loading" description="暂时没有图片可以用于轮播图，请在后台添加图片哦！" />
    </div>
    <div flex flex-col justify-center items-center mt4>
      <div
        v-if="indexDataList"
        flex flex-col justify-center items-center space-y-8
      >
        <div
          class="w-11/12 md:w-10/12"
          v-for="item in indexDataList"
          :key="item.id"
          shadow-xl border-4 bg-white
        >
          <img
            lazy cursor-pointer
            :src="item.url"
            :alt="item.detail"
            @click="clickImg(item.id)"
          />
        </div>
      </div>
      <el-empty v-else-if="!indexLoading" description="啊咧咧！照片太少了，挑不出精选图片...你可以随便看看，目前网站还在迭代中，图片也较少..." />
    </div>

    <Canvas :showModal="showModal" :dataList="indexDataList" :imgId="imgId" @modalUpdate="modalUpdate" />
    <div v-if="handleButton && indexDataList?.length !== 0" flex justify-center items-center w-full h-24>
      <el-button :loading="loading" @click="indexDataHandle">加载更多</el-button>
    </div>
  </div>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
