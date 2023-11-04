<script setup lang="ts">
const dataList = ref<Array<Object>>([])
const handleButton = ref<boolean>(true)
const loading = ref<boolean>(false)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 10,
})

const dataHandle = async () => {
  loading.value = true
  try {
    const { total, totalPage, pageNum, pageSize, data } = await $fetch('/api/tietie', {
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

onUnmounted(() => {
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
  <Waterfall :dataList="dataList" :loading="loading" :handleButton="handleButton" @dataHandle="dataHandle" />
</template>

<style scoped>

</style>
