<script setup lang="ts">
const markdown = ref<String>('#测试')

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div flex justify-center p2>
    <article class="prose lg:prose-xl">
      <h1>关于页面</h1>
      <p>
        这里主要展示我拍过的一些照片~
      </p>
      <!-- ... -->
    </article>
  </div>
</template>

<style scoped>

</style>
