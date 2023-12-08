<script setup lang="ts">
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'

const ap = ref<APlayer>()
const showMusic = ref(false)

const initPlayer = (dataList: Array<Object> | any) => {
  ap.value = new APlayer({
    container: document.getElementById('player'),
    mini: true,
    fixed: true,
    autoplay: false,
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
        cover: item.cover,
        url: item.url,
        name: item.fileName,
        artist: item.author,
      }
    }),
  })
}

onMounted(async () => {
  const data = await $fetch('/api/music', {
    method: 'post',
  })
  if (data.data && data.data.length > 0) {
    initPlayer(data.data)
    showMusic.value = true
  } else {
    showMusic.value = false
  }
})

onUnmounted(() => {
  ap.value?.destroy()
})
</script>

<template>
  <div v-show="showMusic" id="player" />
</template>

<style scoped>

</style>
