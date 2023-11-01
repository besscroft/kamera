<script setup lang="ts">
const dataList = ref<Array<Object>>([
  {
    "id": 27,
    "rating": 4,
    "url": "https://blog.besscroft.com/photos/2023/IMG_5895.jpeg",
    "device": "iPhone 12",
    "detail": "重游东湖4"
  },
  {
    "id": 19,
    "rating": 4,
    "url": "https://blog.besscroft.com/photos/2022/IMG_4208.jpeg",
    "device": "iPhone 12",
    "detail": "断桥"
  },
  {
    "id": 24,
    "rating": 4,
    "url": "https://blog.besscroft.com/photos/2023/IMG_5888.jpeg",
    "device": "iPhone 12",
    "detail": "重游东湖1"
  },
  {
    "id": 25,
    "rating": 4,
    "url": "https://blog.besscroft.com/photos/2023/IMG_5889.jpeg",
    "device": "iPhone 12",
    "detail": "重游东湖2"
  },
  {
    "id": 26,
    "rating": 4,
    "url": "https://blog.besscroft.com/photos/2023/IMG_5890.jpeg",
    "device": "iPhone 12",
    "detail": "重游东湖3"
  }
])

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div flex justify-center h-full p2>
    <n-carousel draggable aspect-video show-arrow autoplay dot-type="line" max-h-180 max-w-7xl shadow-2xl rounded-sm>
      <img
        v-for="item in dataList"
        :key="item.id"
        lazy
        :src="item.url"
      >
    </n-carousel>
  </div>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
