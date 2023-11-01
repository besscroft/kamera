<script setup lang="ts">
const markdown = ref<String>('#测试')

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div flex flex-col justify-center p2>
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
    <n-divider prose prose-slate mx-auto title-placement="left">
      Q&A
    </n-divider>
    <n-collapse prose prose-slate mx-auto default-expanded-names="1" accordion>
      <n-collapse-item title="怎么不是原图？" name="1">
        <div>
          <p>1、原图体积太大，加载很慢！</p>
          <p>2、在 CDN 侧做了传输优化，即使上传原图也会被压缩！</p>
          <p>3、部分图片可能因为保存不当，未留下原图...</p>
          <p>4、全程使用内网传输，在本地对每张图片做了 75% 左右比率的压缩，然后才传到的存储桶公开访问。</p>
          <p>5、出于对 Coser 的尊重，只对 Coser 本人提供原图，如果您是 Coser 本人，可发邮箱联系我！</p>
        </div>
      </n-collapse-item>
      <n-collapse-item title="可以投稿吗？" name="2">
        <div>
          当然可以！投稿请联系邮箱！
        </div>
      </n-collapse-item>
      <n-collapse-item title="首页的轮播图要求？" name="3">
        <div>
          尽量长宽比在 16:9、16:10 这种区间，或者相机直出，不然放进去也会被裁剪！
        </div>
      </n-collapse-item>
      <n-collapse-item title="我觉得我的照片不好看，你可以下架吗？" name="4">
        <div>
          当然可以，我将在收到您的告知后第一时间移除图片，也可根据您的要求删除手中的底稿！
        </div>
      </n-collapse-item>
      <n-collapse-item title="为什么搭建这个网站？" name="5">
        <div>
          爱好吧，二次元真的很友好！
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style scoped>

</style>
