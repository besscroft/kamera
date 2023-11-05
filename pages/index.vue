<script setup lang="ts">
import carouselList from '~/assets/json/carousel.json'

const dataList = ref<Array<Object>>(carouselList)

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div h-full p2>
    <div flex justify-center>
      <n-carousel draggable aspect-video show-arrow autoplay dot-type="line" max-h-180 max-w-7xl shadow-2xl rounded-sm>
        <img
          v-for="item in dataList"
          :key="item.id"
          lazy
          :src="item.url"
        >
      </n-carousel>
    </div>
    <div flex flex-col justify-center items-center>
      <n-divider w-full md:w-160 title-placement="center">
        精选图片
      </n-divider>
      <n-empty p2 description="啊咧咧！照片太少了，挑不出精选图片...">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 10h2v2h-2z" fill="currentColor"></path><path d="M12 10h2v2h-2z" fill="currentColor"></path><path d="M26 20h-5v-2h1a2.002 2.002 0 0 0 2-2v-4h2v-2h-2V8a2.002 2.002 0 0 0-2-2h-2V2h-2v4h-4V2h-2v4h-2a2.002 2.002 0 0 0-2 2v2H6v2h2v4a2.002 2.002 0 0 0 2 2h1v2H6a2.002 2.002 0 0 0-2 2v8h2v-8h20v8h2v-8a2.002 2.002 0 0 0-2-2zM10 8h12v8H10zm3 10h6v2h-6z" fill="currentColor"></path></svg>
          </n-icon>
        </template>
      </n-empty>
      <div flex flex-col justify-center items-center h-48 mt-16 px-8>
        <p>欢迎访问~</p>
        <p>你可以随便看看，目前网站还在迭代中，图片也较少...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
