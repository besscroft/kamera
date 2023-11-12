<script setup lang="ts">
import { useUserStore } from '~/composables/user'

const user = useUserStore()
const dataList = ref<Array<Object>>([])
const loading = ref<boolean>(false)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 12,
})

const play = (row: any) => {
  // message.info(`Play ${row.id}`)
}

const dataHandle = async () => {
  loading.value = true
  try {
    const { total, totalPage, pageNum, pageSize, data } = await $fetch('/api/getFileList', {
      timeout: 60000,
      method: 'post',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      },
      body: { pageNum: pageInfo.pageNum, pageSize: pageInfo.pageSize, type: '' },
    })
    dataList.value = data
    pageInfo.total = total
    pageInfo.totalPage = totalPage
    console.log(total)
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await dataHandle()
})

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div p2 md:p8>
    <el-table :data="dataList" :loading="loading" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="类型" prop="type" />
      <el-table-column label="评分" prop="rating" />
      <el-table-column label="描述" prop="detail" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button size="small" @click="play(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background mt1
      layout="total, sizes, prev, pager, next"
      :page-sizes="[10, 20, 50, 100]"
      :total="pageInfo.total"
      v-model:page-size="pageInfo.pageSize"
      v-model:current-page="pageInfo.pageNum"
      :page-count="pageInfo.totalPage"
      @size-change="(val: number) => { pageInfo.pageSize = val; dataHandle() }"
      @current-change="(val: number) => { pageInfo.pageNum = val; dataHandle() }"
    />
  </div>
</template>

<style scoped>

</style>
