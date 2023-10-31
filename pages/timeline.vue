<script setup lang="ts">
const imgId = ref<number>(0)
const dataList = ref<Array<Object>>([
  {
    id: 1,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/IMG_20180412_202141_HHT.jpg',
    device: 'MI6',
    detail: '夜晚的武汉东湖',
  },
  {
    id: 2,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/IMG_20180623_194042_HDR.jpg',
    device: 'MI6',
    detail: '夏天的机甲大圣'
  },
  {
    id: 3,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/IMG_20181230_164732.jpg',
    device: 'MI6',
    detail: '冬天的机甲大圣'
  },
  {
    id: 4,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_0974.JPG',
    device: 'iPhone 12',
    detail: '夜晚的闲林埠'
  },
  {
    id: 5,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_0985.JPG',
    device: 'iPhone 12',
    detail: '海狮1'
  },
  {
    id: 6,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_0983.JPG',
    device: 'iPhone 12',
    detail: '海狮2'
  },
  {
    id: 7,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_0979.JPG',
    device: 'iPhone 12',
    detail: '鹦鹉'
  },
  {
    id: 8,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_0989.JPG',
    device: 'iPhone 12',
    detail: '连长颈鹿都是一对啊'
  },
  {
    id: 9,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_1022.JPG',
    device: 'iPhone 12',
    detail: '夜晚的公园'
  },
  {
    id: 10,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_1307.JPG',
    device: 'iPhone 12',
    detail: '公司的六一活动'
  },
  {
    id: 11,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_1623.JPG',
    device: 'iPhone 12',
    detail: '空气真好'
  },
  {
    id: 12,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_1749.JPG',
    device: 'iPhone 12',
    detail: '若有所思'
  },
  {
    id: 13,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_2219.JPG',
    device: 'iPhone 12',
    detail: '真月亮与假月亮'
  },
  {
    id: 14,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_2934.JPG',
    device: 'iPhone 12',
    detail: 'kindle!'
  },
  {
    id: 15,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2021/IMG_2950.JPG',
    device: 'iPhone 12',
    detail: 'Google Devfest 2021 HangZhou'
  },
  {
    id: 16,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_3115.jpeg',
    device: 'iPhone 12',
    detail: '团圆饭'
  },
  {
    id: 17,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_3130.jpeg',
    device: 'iPhone 12',
    detail: '丰盛的一桌'
  },
  {
    id: 18,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_3405.jpeg',
    device: 'iPhone 12',
    detail: '换新皮肤啦'
  },
  {
    id: 19,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4208.jpeg',
    device: 'iPhone 12',
    detail: '断桥'
  },
  {
    id: 20,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4209.jpeg',
    device: 'iPhone 12',
    detail: '荷花池'
  },
  {
    id: 21,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2022/IMG_4210.jpeg',
    device: 'iPhone 12',
    detail: '楼外楼'
  },
  {
    id: 22,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2023/IMG_5412.jpeg',
    device: 'iPhone 12',
    detail: '过年时拍的'
  },
  {
    id: 23,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2023/IMG_5746.jpeg',
    device: 'iPhone 12',
    detail: '光谷广场喷泉'
  },
  {
    id: 24,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2023/IMG_5888.jpeg',
    device: 'iPhone 12',
    detail: '重游东湖1'
  },
  {
    id: 25,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2023/IMG_5889.jpeg',
    device: 'iPhone 12',
    detail: '重游东湖2'
  },
  {
    id: 26,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2023/IMG_5890.jpeg',
    device: 'iPhone 12',
    detail: '重游东湖3'
  },
  {
    id: 27,
    rating: 4,
    url: 'https://blog.besscroft.com/photos/2023/IMG_5895.jpeg',
    device: 'iPhone 12',
    detail: '重游东湖4'
  }
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
