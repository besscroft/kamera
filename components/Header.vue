<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import photosList from '~/constants/photos.json'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const isOpen = ref(false)

const routeList = ref<Array<Object>>([])
const systemRouterList = ref([
  {
    title: '控制台',
    to: '/admin',
    icon: 'i-carbon-earth-southeast-asia-filled',
  },
  {
    title: '上传',
    to: '/admin/upload',
    icon: 'i-carbon-send-alt',
  },
  {
    title: '维护',
    to: '/admin/list',
    icon: 'i-carbon-cics-sit-overrides',
  },
  {
    title: '系统',
    to: '/admin/system',
    icon: 'i-carbon-cloud-alerting',
  },
])

watch(() => route.path, () => {
  isOpen.value = false
})

onBeforeMount(() => {
  routeList.value.push({
    title: '首页',
    to: '/',
    icon: 'i-carbon-aperture',
  })
  if (photosList && photosList?.length > 0) {
    photosList.forEach((item) => {
      routeList.value.push({
        title: item.title,
        to: item.url,
        icon: item.icon && item.icon !== '' ? item.icon : 'i-carbon-debug',
      })
    })
  }
  routeList.value.push({
    title: '关于',
    to: '/about',
    icon: 'i-carbon-warning',
  })
})

const logout = () => {
  user.setToken('')
  user.setTokenName('')
  router.push('/')
}

onBeforeUnmount(() => {
  routeList.value = []
})
</script>

<template>
  <header sticky top-0 z-20 bg-white dark:bg-custom-black>
    <nav relative bg-white dark:bg-custom-black>
      <div flex container px-6 py-4 mx-auto md:flex md:justify-between md:items-center>
        <div flex items-center justify-between w-full md:w-36>
          <img class="h-8 w-auto" src="/maskable-icon.png" cursor-pointer @click="router.push('/')" alt="logo">
        </div>

        <div v-if="mdAndLarger" flex items-center justify-center space-x-3>
          <ClientOnly>
            <DarkToggle />
          </ClientOnly>
          <UPopover mode="hover">
            <UButton color="white" trailing-icon="i-carbon-app" />

            <template #panel>
              <div p-2>
                <NuxtLink
                  v-for="item in routeList"
                  :key="item.to"
                  :to="item.to"
                  flex flex-row items-center rounded-md
                  block px-5 py-2 focus-blue w-full
                  transition-colors duration-200 transform
                  hover="bg-gray-100 dark:(bg-gray-700 text-white)"
                  :class="route.path === item.to ? 'text-custom-green' : 'text-gray-700 dark:text-gray-200'"
                  :aria-label="item.title"
                >
                  <span :class="item.icon" text-xl me-4 />{{ item.title }}
                </NuxtLink>
                <div border="neutral-300 dark:neutral-700 t-1" mx-3 my-2 />
                <NuxtLink
                  v-for="item in systemRouterList"
                  :key="item.to"
                  :to="item.to"
                  flex flex-row items-center rounded-md
                  block px-5 py-2 focus-blue w-full
                  transition-colors duration-200 transform
                  hover="bg-gray-100 dark:(bg-gray-700 text-white)"
                  :class="route.path === item.to ? 'text-custom-green' : 'text-gray-700 dark:text-gray-200'"
                  :aria-label="item.title"
                >
                  <span :class="item.icon" text-xl me-4 />{{ item.title }}
                </NuxtLink>
              </div>
            </template>
          </UPopover>
          <UButton v-if="!user.token" color="white" label="登录" @click="router.push('/login')" />
          <UButton v-if="user.token && route.path.startsWith('/admin')" color="white" label="注销" @click="logout" />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
