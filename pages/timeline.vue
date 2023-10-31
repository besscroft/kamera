<script setup lang="ts">
const imgId = ref<number>(0)
const dataList = ref<Array<Object>>([])
const handleButton = ref<boolean>(true)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 10,
})

const clickImg = (id: Number) => {
  imgId.value = id
  const kamera_modal = document.getElementById('kamera_modal')
  kamera_modal.showModal()
}

const dataHandle = async () => {
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
    <div class="p-2 md:px-4 lg:px-8 xl:px-12 grid md:gap-2 lg:gap-4 xl:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div class="pt-2" v-for="item in dataList" :key="item.id">
        <img class="cursor-pointer" :src="item.url" @click="clickImg(item.id)" />
      </div>
    </div>

    <Canvas :dataList="dataList" :imgId="imgId" />
    <div v-if="handleButton" class="flex justify-center items-center w-full h-24">
      <button class="btn btn-outline" @click="dataHandle">加载更多</button>
    </div>
  </div>
</template>

<style scoped>

</style>
