<script setup lang="ts">
import { useUserStore } from '~/composables/user'
import { useMessage } from 'naive-ui'

interface ModelType {
  username: string | null
  password: string | null
}

const message = useMessage()
const router = useRouter()
const user = useUserStore()
const loading = ref<boolean>(false)
const loginForm = reactive<ModelType>({
  username: '',
  password: '',
})

const handleSubmitClick = async () => {
  loading.value = true
  try {
    const { token, tokenName, name, avatar, roleCode, email } = await $fetch('/api/login', {
      method: 'post',
      body: { username: loginForm.username, password: loginForm.password },
    })
    user.setToken(token)
    user.setTokenName(tokenName)
    user.setAvatar(avatar)
    user.setRoleCode(roleCode)
    user.setEmail(email)
    user.setUserName(name)
    router.push('/admin')
    if (token) {
      message.success('登录成功！')
    } else {
      message.error('登录失败！')
    }
  } catch (e) {
    loading.value = false
    message.error('登录失败！')
  }
  loading.value = false
}

const keyDown = (e) => {
  if (e.keyCode === 13 || e.keyCode === 100) {
    handleSubmitClick()
  }
}

onMounted(() => {
  window.addEventListener('keydown', keyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keyDown, false)
})

definePageMeta({
  layout: 'none',
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900 w-full">
    <div class="flex justify-center h-screen">
      <div class="hidden bg-cover lg:block lg:w-2/3" style="background-image: url('/fufu.avif')">
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl text-white">旅行足迹</h2>

            <p text-sm text-gray-300 mt-4>
              鹤鸣工作室出品，一款基于 Nuxt3 构建的⌈相片集⌋。
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-4xl text-center text-gray-700 dark:text-white">旅行足迹</h2>

            <p class="mt-3 text-gray-500 dark:text-gray-300">登录你的帐号</p>
          </div>

          <div class="mt-8">
            <div>
              <label for="account" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">帐号</label>
              <input type="account" v-model="loginForm.username" name="account" id="account" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

            <div class="mt-6">
              <div class="flex justify-between mb-2">
                <label for="password" class="font-ark text-sm text-gray-600 dark:text-gray-200">密码</label>
              </div>

              <input type="password" v-model="loginForm.password" name="password" id="password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

            <div class="mt-6">
              <n-button
                  :loading="loading"
                  @click="handleSubmitClick"
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                登录
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
