<script setup lang="ts">
const markdown = ref<String>('#测试')

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div flex justify-center p2>
    <article class="prose prose-slate mx-auto lg:prose-lg dark:text-white">
      <h2 dark:text-white>关于页面</h2>
      <p class="lead">
        I'm Bess Croft , a full-time full-stack developer 👨‍💻
      </p>
      <p class="lead">
        我是云淑，在湖北武汉工作，是一名~~提瓦特区~~全栈开发工程师。
      </p>
      <p>
        我喜欢编程，这是我的兴趣爱好之一，我希望能够通过编程，创造一些有意思的东西。
      </p>
      <ol>
        <li>博客：https://besscroft.com</li>
        <li>鹤鸣工作室：https://heming.dev</li>
        <li>GitHub：https://github.com/besscroft</li>
        <li>我的书单：https://book.besscroft.com</li>
        <li>我的哔哩哔哩：https://space.bilibili.com/278038021</li>
      </ol>
      <h3 dark:text-white>
        联系我
      </h3>
      <p>
        - Email：besscroft#foxmail.com
      </p>
      <!-- ... -->
    </article>
  </div>
</template>

<style scoped>

</style>
