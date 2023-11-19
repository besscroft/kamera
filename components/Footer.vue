<script setup lang="ts">
import { copyright } from '~/constants'
</script>

<template>
  <footer bg-white dark:bg-neutral-800 w-full object-bottom>
    <div mx-auto w-full px-4 pb-4 mt-8 pt-4 md:flex md:items-center md:justify-between>
      <div flex flex-col md:flex-row justify-center items-center md:ml-24 gap-4 text-xs md:justify-end>
        <p>Made with ❤ by <a text-sky-400 href="https://heming.dev" target="_blank">鹤鸣工作室</a>.</p>
        <p v-if="copyright">© 2023 {{ copyright }} 版权所有.</p>
      </div>

      <div mt-4 mr-2 flex justify-center gap-6 sm:mt-0 lg:justify-end>
        <a i-carbon-logo-github href="https://github.com/besscroft/kamera" target="_blank" title="GitHub" />
        <a i-carbon-mail-all href="mailto:besscroft@foxmail.com" title="邮件" />
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
