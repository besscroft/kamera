<script setup lang="ts">
import photosList from '~/constants/photos.json'

const toast = useToast()
const user = useUserStore()
const loading = ref<boolean>(false)

const dataInfo = ref({})

const dataHandle = async () => {
  loading.value = true
  try {
    const { data } = await $fetch('/api/console', {
      timeout: 60000,
      method: 'get',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`,
      },
    })
    console.log(data)
    dataInfo.value = data
  } catch (e) {
    console.log(e)
    toast.add({ title: '数据获取失败！', timeout: 2000, color: 'red' })
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await dataHandle()
})
</script>

<template>
  <div p2 md:p8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-12>
    <el-card>
      <div flex flex-col h-48 p2 space-y-4>
        <span font-light>照片数据</span>
        <span text-xl font-semibold>{{ loading ? '获取中...' : dataInfo?.total?.total || 0 }} {{ loading ? '' : '张' }}</span>
        <span font-light>显示照片</span>
        <span text-xl font-semibold>{{ loading ? '获取中...' : dataInfo?.total?.show_total || 0 }} {{ loading ? '' : '张' }}</span>
      </div>
    </el-card>
    <el-card>
      <div h-48>
        <el-scrollbar>
          <div v-if="photosList && photosList.length > 0" grid grid-cols-2 gap-4 p2>
            <div flex flex-col space-y-4>
              <span font-light>首页精选</span>
              <span text-xl font-semibold>{{ loading ? '获取中...' : dataInfo?.typeTotal?.find(obj => obj.type === 'index').count || 0 }} {{ loading ? '' : '张' }}</span>
            </div>
            <div flex flex-col space-y-4 v-for="item in photosList" :key="item">
              <span font-light>{{ item.title }}</span>
              <span text-xl font-semibold>{{ loading ? '获取中...' : dataInfo?.typeTotal?.find(obj => obj.type === item.url.replace('/', '')).count || 0 }} {{ loading ? '' : '张' }}</span>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-card>
    <el-card>
      <div flex flex-col h-48 p2 space-y-4>
        <span class="flex items-center">
          <span class="pr-6">如果您觉得项目不错</span>
          <span class="h-px flex-1 bg-black"></span>
        </span>
        <NuxtLink to="https://github.com/besscroft/kamera" target="_blank">
          <UButton color="white" icon="i-carbon-star">Star</UButton>
        </NuxtLink>
        <span class="flex items-center">
          <span class="pr-6">如果您有 Bug 反馈和建议</span>
          <span class="h-px flex-1 bg-black"></span>
        </span>
        <NuxtLink to="https://github.com/besscroft/kamera/issues/new" target="_blank">
          <UButton color="white" icon="i-carbon-chat-bot">反馈 | 建议</UButton>
        </NuxtLink>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>
