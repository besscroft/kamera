<script setup lang="ts">
import { NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { useUserStore } from '~/composables/user'

const message = useMessage()
const user = useUserStore()
const dataList = ref<Array<Object>>([])
const loading = ref<boolean>(false)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 10,
})

const play = (row: any) => {
  message.info(`Play ${row.id}`)
}

const createColumns = () : DataTableColumns<any> => {
  return [
    {
      title: 'id',
      key: 'id'
    },
    {
      title: '类型',
      key: 'type'
    },
    {
      title: '评分',
      key: 'rating'
    },
    {
      title: '描述',
      key: 'detail'
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
        return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => play(row)
            },
            { default: () => '查看' }
        )
      }
    }
  ]
}

const tableColumns = ref(createColumns())

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
    <n-data-table
      :columns="tableColumns"
      :data="dataList"
      :bordered="false"
      :loading="loading"
    />
    <n-pagination
      v-if="pageInfo.totalPage > 0"
      v-model:page="pageInfo.pageNum"
      v-model:page-size="pageInfo.pageSize"
      :page-count="pageInfo.totalPage"
      mt1
      @update:page="(current) => { pageInfo.pageNum = current; dataHandle() }"
    />
  </div>
</template>

<style scoped>

</style>
