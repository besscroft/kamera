<script setup lang="ts">
import photosList from '~/constants/photos.json'

const toast = useToast()
const user = useUserStore()
const route = useRoute()
const dataList = ref<Array<Object>>([])
const loading = ref<boolean>(false)
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
    const { total, totalPage, pageNum, pageSize, data } = await $fetch('/api/getImageList', {
      method: 'post',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`,
      },
      body: { pageNum: pageInfo.pageNum, pageSize: pageInfo.pageSize, type: route.path.replace('/', '') },
    })
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
  } catch (e) {
    toast.add({ title: '加载失败！', timeout: 2000, color: 'red' })
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
  validate: async (route) => {
    try {
      if (photosList.some(i => i.url === route.path)) {
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  },
})
</script>

<template>
  <Waterfall :dataList="dataList" :loading="loading" :handleButton="handleButton" @dataHandle="dataHandle" />
</template>
