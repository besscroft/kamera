<script setup lang="ts">
import carouselList from 'assets/server/json/carousel.json'

const dataList = ref<Array<Object>>(carouselList)

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div h-full p2>
    <div flex justify-center>
      <el-carousel aspect-video max-h-180 w-full md:h-180 max-w-7xl shadow-2xl rounded-sm>
        <el-carousel-item v-for="item in dataList" :key="item" h-full>
          <img lazy :src="item.url" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div flex flex-col justify-center items-center mt4>
      <el-divider content-position="center" prose prose-slate mx-auto>精选图片</el-divider>
      <el-empty description="啊咧咧！照片太少了，挑不出精选图片...你可以随便看看，目前网站还在迭代中，图片也较少..." />
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
