<script setup lang="ts">
import { useUserStore } from '~/composables/user'

const user = useUserStore()
const fileUrl = ref('')
const fileList = ref([])

/** 自定义上传请求 */
const onRequestUpload = async (option: any) => {
  const file = option.file.file
  let formData = new FormData();
  formData.append('file', file);
  const { data, url } = await $fetch('/api/uploadFile', {
    method: 'post',
    headers: {
      Authorization: `${user.tokenName} ${user.token}`
    },
    body: formData,
  })
  console.log(url)
  if (data === 0) {
    fileUrl.value = url
  }
}

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div class="mt-16 w-full h-full md:max-w-7xl flex flex-col items-center justify-center mx-auto px-2">
    <div class="mx-auto w-full md:max-w-3xl rounded-md bg-white dark:bg-gray-800 shadow p-4">
      <n-upload
        multiple
        directory-dnd
        :custom-request="onRequestUpload"
        :max="1"
        :default-file-list="fileList"
      >
        <n-upload-dragger md:h-100 flex flex-col items-center justify-center>
          <div style="margin-bottom: 8px">
            <n-icon size="48" :depth="3">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M11 18l1.41 1.41L15 16.83V29h2V16.83l2.59 2.58L21 18l-5-5l-5 5z" fill="currentColor"></path><path d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22z" fill="currentColor"></path></svg>
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3">
            请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
          </n-p>
        </n-upload-dragger>
      </n-upload>
      <n-input
        type="text"
        size="small"
        :disabled="true"
        round
        v-model:value="fileUrl"
        v-if="fileUrl"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
