<script setup lang="ts">
const imgId = ref<number>(0)
const dataList = ref<Array<Object>>([
  {
    id: 1,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4208.jpeg',
    device: 'MI6 / iPhone 12',
    detail: '断桥',
  },
  {
    id: 2,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4209.jpeg',
    device: 'MI6 / iPhone 12',
    detail: '荷花池'
  },
  {
    id: 3,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/IMG_20181230_164732.jpg',
    device: 'MI6 / iPhone 12',
    detail: '东湖河畔机甲大圣'
  },
  {
    id: 4,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4208.jpeg',
    device: 'MI6 / iPhone 12',
    detail: '断桥'
  },
  {
    id: 5,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4209.jpeg',
    device: 'MI6 / iPhone 12',
    detail: '荷花池'
  },
  {
    id: 6,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/IMG_20181230_164732.jpg',
    device: 'MI6 / iPhone 12',
    detail: '东湖河畔机甲大圣'
  },
  {
    id: 7,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_1749.JPG',
    device: 'MI6 / iPhone 12',
    detail: '若有所思'
  },
  {
    id: 8,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4208.jpeg',
    device: 'MI6 / iPhone 12',
    detail: '断桥'
  },
  {
    id: 9,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4209.jpeg',
    device: 'MI6 / iPhone 12',
    detail: '荷花池'
  },
  {
    id: 10,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/IMG_20181230_164732.jpg',
    device: 'MI6 / iPhone 12',
    detail: '东湖河畔机甲大圣'
  },
  {
    id: 11,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4208.jpeg',
    device: 'MI6 / iPhone 12',
    detail: '断桥'
  },
  {
    id: 12,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4209.jpeg',
    device: 'MI6 / iPhone 12',
    detail: '荷花池'
  },
  {
    id: 13,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/IMG_20181230_164732.jpg',
    device: 'MI6 / iPhone 12',
    detail: '东湖河畔机甲大圣'
  },
  {
    id: 14,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_1749.JPG',
    device: 'MI6 / iPhone 12',
    detail: '若有所思'
  },
])

const clickImg = (id: Number) => {
  imgId.value = id
  const kamera_modal = document.getElementById('kamera_modal')
  kamera_modal.showModal()
}

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div>
    <div class="p-2 md:px-4 lg:px-8 xl:px-12 grid md:gap-2 lg:gap-4 xl:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div class="pt-2" v-for="item in dataList" :key="item.id">
        <img class="cursor-pointer" :src="item.url" @click="clickImg(item.id)" />
      </div>
    </div>

    <Canvas :dataList="dataList" :imgId="imgId" />
  </div>
</template>

<style scoped>

</style>
