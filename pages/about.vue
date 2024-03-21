<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div flex flex-col justify-center items-center p2>
    <article class="prose prose-slate" mx-auto md:prose-md dark:text-white>
      <h2 dark:text-white>关于页面</h2>
      <!-- 如有需要，可以在此修改 -->
      <p>一款专供摄影佬使用的记录网站，支持常见的图片格式，可以读取 EXIF 信息，管理维护图片，瀑布流展示查看图片。</p>
      <p>兼容 S3 API、支持 CDN 配置。精品照片展示，子页分类展示等功能。</p>
      <p>基于 Nuxt3 开发，支持一键部署，无需单独后端。更多功能还在开发中~ 今天又是想当二次元摄影高手的一天呢！</p>
      <el-divider content-position="left" prose prose-slate mx-auto>怎么不是原图？</el-divider>
      <div>
        <p>1、原图体积太大，加载很慢！如有需要，以后会单独做一个原片下载功能，用以区分。</p>
        <p>2、在 CDN 侧做了传输优化，即使上传原图也会被压缩！如果您自己部署的话，CDN 优化需要自己配置规则。</p>
        <p>3、部分图片可能因为保存不当，未留下原图...</p>
        <p>4、在本地对每张图片做了 50~90% 左右比率的压缩，mozjpeg 格式，然后才传到的存储桶公开访问。</p>
        <p>5、出于对 Coser 的尊重，只对 Coser 本人提供原图，如果您是 Coser 本人，可发邮箱联系我！当然，非人像图片不考虑加载速度的话，我可能会提供原图。</p>
      </div>
      <el-divider content-position="left" prose prose-slate mx-auto>我觉得我的照片不好看，你可以下架吗？</el-divider>
      <div>
        当然可以，我将在收到您的告知后第一时间移除图片，也可根据您的要求删除手中的底稿！
      </div>
      <el-divider content-position="left" prose prose-slate mx-auto>我也想部署一个怎么做？</el-divider>
      <div>
        <p>您可以查看 <a href="https://github.com/besscroft/kamera" target="_blank" dark:text-white>Kamera</a> 仓库页面的部署指导来部署属于您的⌈相片集⌋</p>
      </div>
      <el-divider content-position="left" prose prose-slate mx-auto>隐私安全</el-divider>
      <div>
        <p>您使用本程序时，需要自己去维护各个平台的配置信息（毕竟跟咱没关系，需要在对应的平台配置），以及对象存储的读写权限、访问控制、防盗链、跨域设置、缓存策略和 CDN 等配置，以最大程度的避免天价账单。</p>
        <p>如您有更多疑问，可以提交 <a href="https://github.com/besscroft/kamera/issues/new" target="_blank" dark:text-white>Issue</a>。</p>
      </div>
    </article>
  </div>
</template>

<style scoped>

</style>
