<script setup lang="ts">
import { appName } from '~/constants'

interface ModelType {
  username: string | null
  password: string | null
}

const toast = useToast()
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
    const { token, tokenName } = await $fetch('/api/login', {
      method: 'post',
      body: { username: loginForm.username, password: loginForm.password },
    })
    user.setToken(token)
    user.setTokenName(tokenName)
    router.push('/admin')
    if (token) {
      toast.add({ title: '登录成功！', timeout: 2000 })
    } else {
      toast.add({ title: '登录失败！', timeout: 2000, color: 'red' })
    }
  } catch (e) {
    loading.value = false
    toast.add({ title: '登录失败！', timeout: 2000, color: 'red' })
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
  <div bg-white dark:bg-gray-900 w-full>
    <div flex justify-center h-screen>
      <div hidden bg-cover lg:block class="lg:w-2/3" style="background-image: url('/fufu.jpg')">
        <div flex items-center h-full px-20 bg-gray-900 bg-opacity-40>
          <div>
            <h2 text-4xl text-white>旅行足迹</h2>

            <p text-sm text-gray-300 mt-4>
              鹤鸣工作室出品，一款基于 Nuxt3 构建的⌈相片集⌋。
            </p>
          </div>
        </div>
      </div>

      <div flex items-center w-full max-w-md px-6 mx-auto class="lg:w-2/6">
        <div flex-1>
          <div text-center>
            <h2 text-4xl text-center text-gray-700 dark:text-white>{{ appName || '旅行足迹' }}</h2>

            <p mt-3 text-gray-500 dark:text-gray-300>登录你的帐号</p>
          </div>

          <div mt-8>
            <div>
              <label for="account" block mb-2 text-sm text-gray-600 dark:text-gray-200>帐号</label>
              <input type="account" v-model="loginForm.username" name="account" id="account" block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 />
            </div>

            <div mt-6>
              <div flex justify-between mb-2>
                <label for="password" font-ark text-sm text-gray-600 dark:text-gray-200>密码</label>
              </div>

              <input type="password" v-model="loginForm.password" name="password" id="password" block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 />
            </div>

            <div mt-6>
              <el-button
                :loading="loading"
                @click="handleSubmitClick"
                w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50
                type="primary"
              >登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
