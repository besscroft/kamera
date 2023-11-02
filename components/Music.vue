<script setup lang="ts">
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'

const ap = ref<APlayer>()

const initPlayer = (dataList: Array<Object> | any, cover: string) => {
  ap.value = new APlayer({
    container: document.getElementById('player'),
    mini: true,
    fixed: true,
    autoplay: true,
    theme: '#FADFA3',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: true,
    listMaxHeight: 50,
    audio: dataList.map(({ ...item }) => {
      // 替换 url 属性的值
      return {
        ...item,
        cover,
        url: item.url,
        name: item.fileName,
        artist: '陈致逸,HOYO-MiX'
      }
    }),
  })
}

onMounted(async () => {
  const data = await $fetch('/api/music', {
    method: 'post',
  })
  initPlayer(data.data ,'https://kamera-b2-s3-cdn.heming.dev/file/kamera-b2/music/%E5%8E%9F%E7%A5%9E-%E7%9A%8E%E6%9C%88%E4%BA%91%E9%97%B4%E4%B9%8B%E6%A2%A6+Jade+Moon+Upon+a+Sea+of+Clouds/Cover.jpg')
})

onUnmounted(() => {
  ap.value?.destroy()
})
</script>

<template>
  <div id="player" />
</template>

<style scoped>

</style>
