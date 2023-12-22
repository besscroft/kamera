<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
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

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) {
    errors.push({ path: 'username', message: '用户名必填！' })
  }
  if (!state.password) {
    errors.push({ path: 'password', message: '密码必填！' })
  }
  return errors
}

async function handleSubmitClick(event: FormSubmitEvent<any>) {
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
    }
    else {
      toast.add({ title: '登录失败！', timeout: 2000, color: 'red' })
    }
  }
  catch (e) {
    toast.add({ title: '登录失败！', timeout: 2000, color: 'red' })
  }
  finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'none',
})
</script>

<template>
  <div flex items-center justify-center w-full h-full style="background-image: url('/fufu.jpg'); background-size: cover;"
    md:grid md:grid-cols-10 md:gap-4
  >
    <div md:col-span-5></div>
    <div
      h-108 w-full mx-2 md:max-w-xl bg-white dark:bg-black rounded-md shadow-md md:col-span-4
    >
      <div h-full flex flex-col items-center>
        <div flex items-center justify-center justify-between w-full px-4 mt-4>
          <div text-left>
            <div i-carbon-arrow-left cursor-pointer @click="router.push('/')" />
          </div>
          <ClientOnly>
            <div text-right>
              <DarkToggle />
            </div>
          </ClientOnly>
        </div>

        <h2 text-center text-3xl mt-4>
          {{ appName || '旅行足迹' }}
        </h2>

        <UForm :validate="validate" :state="loginForm" class="space-y-6 w-2/3 mt-6" @submit="handleSubmitClick">
          <UFormGroup label="用户名" name="username">
            <UInput v-model="loginForm.username" />
          </UFormGroup>

          <UFormGroup label="密码" name="password">
            <UInput v-model="loginForm.password" type="password" />
          </UFormGroup>

          <UButton type="submit" color="white" :loading="loading">
            登录
          </UButton>
        </UForm>

        <p text-sm text-gray-400 mt-4>
          鹤鸣工作室出品，一款基于 Nuxt3 构建的⌈相片集⌋。
        </p>
      </div>
    </div>
    <div md:col-span-1></div>
  </div>
</template>

<style scoped>

</style>
