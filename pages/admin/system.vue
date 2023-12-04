<script setup lang="ts">
import { useUserStore } from '~/composables/user'
import {
  ChatDotSquare,
  Star,
} from '@element-plus/icons-vue'

const toast = useToast()
const passwordStr = ref<string>('')
const hashPassword = ref<string>('')
const user = useUserStore()

const pwdHandle = async () => {
  try {
    const { data } = await $fetch('/api/getEncrypt', {
      method: 'post',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      },
      body: { password: passwordStr.value },
    })
    hashPassword.value = data
  } catch (e) {
    toast.add({ title: '生成失败！', timeout: 2000, color: 'red' })
  }
}

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div w-full max-h-full md:max-w-7xl flex flex-col items-center justify-center mx-auto p2 md:p8 pb-20 class="md:w-1/2">
    <el-card class="box-card" w-full>
      <template #header>
        <div class="card-header">
          <span>密码生成</span>
        </div>
      </template>
      <div space-y-2>
        <UAlert
          description="想要更多功能？可以反馈给开发者哦！"
          :avatar="{ src: '/112962239_p0.jpg' }"
          title="噔噔！"
        />
        <p text-sm>生成密码后，您可以替换环境变量，并重新部署后生效！</p>
        <el-input
          v-model="passwordStr"
          placeholder="请输入密码，并点击右侧按钮生成！"
          type="password"
          class="input-with-select"
          show-password
          clearable
        >
          <template #append>
            <div i-carbon-fingerprint-recognition cursor-pointer @click="pwdHandle" />
          </template>
        </el-input>
        <p break-words>密码：{{ hashPassword || 'N&A' }}</p>
      </div>
      <template #footer>
        <div space-x-2>
          <NuxtLink to="https://github.com/besscroft/kamera" target="_blank">
            <el-button :icon="Star">Star</el-button>
          </NuxtLink>
          <NuxtLink to="https://github.com/besscroft/kamera/issues/new" target="_blank">
            <el-button :icon="ChatDotSquare">反馈 | 建议</el-button>
          </NuxtLink>
        </div>
      </template>
    </el-card>
  </div>
</template>

<style scoped>

</style>
