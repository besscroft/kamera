<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const isOpen = ref(false)

watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-20 bg-white dark:bg-gray-900">
    <nav class="relative bg-white dark:bg-gray-900">
      <div class="flex container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between w-full md:w-36 max-w-xs">
          <a class="btn btn-ghost normal-case text-xl bg-rose-300 hover:bg-red-300 z-20" @click="router.push('/')">云淑故事集</a>

          <!-- Mobile menu button -->
          <div class="flex md:hidden z-50">
            <button @click="isOpen = !isOpen" type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
              <svg v-show="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
              </svg>

              <svg v-show="isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                   stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div :class="[isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full']" class="absolute inset-x-0 z-40 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center">
          <div class="flex flex-col md:flex-row md:mx-6">
            <a :class="route.path === '/' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'" class="font-xihei my-2 transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 cursor-pointer" @click="router.push('/')">首页</a>
            <a :class="route.path === '/cosplay' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'" class="font-xihei my-2 transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 cursor-pointer" @click="router.push('/cosplay')">Cosplay</a>
            <a :class="route.path === '/tietie' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'" class="font-xihei my-2 transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 cursor-pointer" @click="router.push('/tietie')">集邮</a>
            <a :class="route.path === '/timeline' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'" class="font-xihei my-2 transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 cursor-pointer" @click="router.push('/timeline')">时光相册</a>
            <a :class="route.path === '/about' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'" class="font-xihei my-2 transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 cursor-pointer" @click="router.push('/about')">关于</a>
          </div>
        </div>

        <DarkToggle pl-2 />
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
