<script setup lang="ts">
const imgId = ref<number>(0)
const dataList = ref<Array<Object>>([])
const handleButton = ref<boolean>(true)
const loading = ref<boolean>(false)
const showModal = ref<boolean>(false)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 10,
})

const modalUpdate = () => {
  showModal.value = false
}

const clickImg = (id: Number) => {
  imgId.value = id
  showModal.value = true
}

const dataHandle = async () => {
  loading.value = true
  try {
    const { total, totalPage, pageNum, pageSize, data } = await $fetch('/api/timeline', {
      method: 'post',
      body: { pageNum: pageInfo.pageNum, pageSize: pageInfo.pageSize },
    })
    console.log(total, totalPage, pageNum, pageSize, data)
    if (pageInfo.pageNum <= totalPage) {
      if (pageInfo.pageNum === totalPage) {
        handleButton.value = false
      }
      pageInfo.pageNum++
      if (dataList.value.length === 0) {
        dataList.value = data
      } else {
        dataList.value = dataList.value.concat(data)
      }
      pageInfo.total = total
      pageInfo.totalPage = totalPage
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await dataHandle()
})

onUnmounted(() => {
  imgId.value = 0
  dataList.value = []
  pageInfo.total = 0
  pageInfo.totalPage = 0
  pageInfo.pageNum = 1
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div>
    <div v-auto-animate p-1 md:px-4 lg:px-8 xl:px-12 grid md:gap-2 lg:gap-4 xl:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4>
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

    <Canvas :showModal="showModal" :dataList="dataList" :imgId="imgId" @modalUpdate="modalUpdate" />
    <div v-if="handleButton" flex justify-center items-center w-full h-24>
      <n-button :loading="loading" @click="dataHandle">
        加载更多
      </n-button>
    </div>
  </div>
</template>
