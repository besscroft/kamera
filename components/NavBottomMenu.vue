<script lang="ts" setup>
import { invoke } from '@vueuse/core'
import photosList from '~/constants/photos.json'

const modelValue = defineModel<boolean>({ required: true })
const drawerEl = ref<HTMLDivElement>()
const buttonEl = ref<HTMLDivElement>()
const route = useRoute()

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

function toggleVisible() {
  modelValue.value = !modelValue.value
}

function clickEvent(mouse: MouseEvent) {
  if (mouse.target && !buttonEl.value?.children[0].contains(mouse.target as any)) {
    if (modelValue.value) {
      document.removeEventListener('click', clickEvent)
      modelValue.value = false
    }
  }
}

// Pull down to close
const { dragging, dragDistance } = invoke(() => {
  const triggerDistance = 120

  let scrollTop = 0
  let beforeTouchPointY = 0

  const dragDistance = ref(0)
  const dragging = ref(false)

  useEventListener(drawerEl, 'scroll', (e: Event) => {
    scrollTop = (e.target as HTMLDivElement).scrollTop

    // Prevent the page from scrolling when the drawer is being dragged.
    if (dragDistance.value > 0)
      (e.target as HTMLDivElement).scrollTop = 0
  }, { passive: true })

  useEventListener(drawerEl, 'touchstart', (e: TouchEvent) => {
    if (!modelValue.value)
      return

    beforeTouchPointY = e.touches[0].pageY
    dragDistance.value = 0
  }, { passive: true })

  useEventListener(drawerEl, 'touchmove', (e: TouchEvent) => {
    if (!modelValue.value)
      return

    // Do not move the entire drawer when its contents are not scrolled to the top.
    if (scrollTop > 0 && dragDistance.value <= 0) {
      dragging.value = false
      beforeTouchPointY = e.touches[0].pageY
      return
    }

    const { pageY } = e.touches[0]

    // Calculate the drag distance.
    dragDistance.value += pageY - beforeTouchPointY
    if (dragDistance.value < 0)
      dragDistance.value = 0
    beforeTouchPointY = pageY

    // Marked as dragging.
    if (dragDistance.value > 1)
      dragging.value = true

    // Prevent the page from scrolling when the drawer is being dragged.
    if (dragDistance.value > 0) {
      if (e?.cancelable && e?.preventDefault)
        e.preventDefault()
      e?.stopPropagation()
    }
  }, { passive: true })

  useEventListener(drawerEl, 'touchend', () => {
    if (!modelValue.value)
      return

    if (dragDistance.value >= triggerDistance)
      modelValue.value = false

    dragging.value = false
    // code
  }, { passive: true })

  return {
    dragDistance,
    dragging,
  }
})

watch(modelValue, (val) => {
  if (val && typeof document !== 'undefined')
    document.addEventListener('click', clickEvent)
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

onBeforeUnmount(() => {
  document.removeEventListener('click', clickEvent)
  routeList.value = []
})
</script>

<template>
  <div ref="buttonEl" flex items-center>
    <slot :toggle-visible="toggleVisible" :show="modelValue" />
    <!-- Drawer -->
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0 children:(translate-y-full)"
      enter-to-class="opacity-100 children:(translate-y-0)"
      leave-active-class="transition duration-250 ease-in"
      leave-from-class="opacity-100 children:(translate-y-0)"
      leave-to-class="opacity-0 children:(translate-y-full)"
    >
      <div
        v-show="modelValue"
        absolute inset-x-0 top-auto bottom-full z-20 h-100vh
        flex items-end overflow-clip
        bg="black/50"
      >
        <div
          :style="{
            transform: dragging ? `translateY(${dragDistance}px)` : '',
          }"
          :class="{
            'duration-0': dragging,
            'duration-250': !dragging,
          }"
          transition="transform ease-in"
          flex-1 min-w-48 py-6 mb="-1px"
          of-y-auto scrollbar-hide overscroll-none max-h="[calc(100vh-200px)]"
          rounded-t-md bg="white/85 dark:neutral-900/85" backdrop-filter backdrop-blur-md
        >
          <div flex flex-col>
            <NuxtLink
              v-for="item in routeList"
              :key="item.to"
              :to="item.to"
              flex flex-row items-center
              block px-5 py-2 focus-blue w-full
              transition-colors duration-200 transform
              hover="bg-gray-100 dark:(bg-gray-700 text-white)"
              :class="route.path === item.to ? 'text-custom-green' : 'text-gray-700 dark:text-gray-200'"
              :aria-label="item.title"
            >
              <span :class="item.icon" text-xl me-4 />{{ item.title }}
            </NuxtLink>
          </div>
          <!-- Divider line -->
          <div border="neutral-300 dark:neutral-700 t-1" mx-3 my-2 />
          <div flex flex-col>
            <NuxtLink
              v-for="item in systemRouterList"
              :key="item.to"
              :to="item.to"
              flex flex-row items-center
              block px-5 py-2 focus-blue w-full
              transition-colors duration-200 transform
              hover="bg-gray-100 dark:(bg-gray-700 text-white)"
              :class="route.path === item.to ? 'text-custom-green' : 'text-gray-700 dark:text-gray-200'"
              :aria-label="item.title"
            >
              <span :class="item.icon" text-xl me-4 />{{ item.title }}
            </NuxtLink>
          </div>
          <!-- Divider line -->
          <div border="neutral-300 dark:neutral-700 t-1" mx-3 my-2 />
          <div flex flex-col>
            <ClientOnly>
              <DarkToggle />
            </ClientOnly>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
