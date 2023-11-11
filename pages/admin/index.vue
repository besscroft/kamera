<script setup lang="ts">
import * as ExifReader from 'exifreader'
import { useUserStore } from '~/composables/user'
import { useMessage } from 'naive-ui'

const user = useUserStore()
const fileUrl = ref('')
const loading = ref<boolean>(false)
const message = useMessage()

const imgData = reactive({
  type: '',
  url: '',
  exif: {},
  detail: '',
  rating: ''
})

const options = ref([
  {
    label: 'Cosplay',
    value: 'cosplay',
  },
  {
    label: '集邮',
    value: 'tietie',
  },
  {
    label: '时光相册',
    value: 'timeline'
  },
])

/** 自定义上传请求 */
const onRequestUpload = async (option: any) => {
  const file = option.file.file
  let formData = new FormData();
  formData.append('file', file);
  const { data, url } = await $fetch('/api/uploadFile', {
    timeout: 60000,
    method: 'post',
    headers: {
      Authorization: `${user.tokenName} ${user.token}`
    },
    body: formData,
  })
  if (data === 0) {
    fileUrl.value = url
    const tags = await ExifReader.load(file)
    imgData.exif = tags
    imgData.url = url
  }
}

const submit = async () => {
  loading.value = true
  try {
    if (imgData.type === '') {
      message.error('请选择类型！')
      loading.value = false
      return
    }
    const { data } = await $fetch('/api/addImg', {
      timeout: 60000,
      method: 'post',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      },
      body: imgData,
    })
    if (data === 0) {
      message.success('上传成功！')
    } else {
      message.error('上传失败！')
    }
  } catch (e) {
    loading.value = false
  }
  loading.value = false
}

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div class="w-full h-full md:max-w-7xl flex flex-col items-center justify-center mx-auto px-2">
    <div class="my-16 mx-auto w-full md:max-w-3xl rounded-md bg-white dark:bg-gray-800 shadow p-2">
      <div flex items-center justify-center pb-2 space-x-2>
        <n-select v-model:value="imgData.type" :options="options" />
        <n-button v-if="fileUrl" :loading="loading" @click="submit">上传</n-button>
      </div>
      <n-upload
        multiple
        directory-dnd
        :custom-request="onRequestUpload"
        :max="1"
        show-remove-button
        :on-remove="() => {
          fileUrl = '';
          imgData.url = '';
          imgData.rating = 0;
          imgData.detail = '';
          imgData.exif = {};
          imgData.type = '';
        }"
        accept="image/jpg, image/jpeg, image/png, image/tiff, image/heic, image/heif, image/webp, image/avif"
      >
        <n-upload-dragger md:h-100 flex flex-col items-center justify-center>
          <div style="margin-bottom: 8px">
            <n-icon size="48" :depth="3">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M11 18l1.41 1.41L15 16.83V29h2V16.83l2.59 2.58L21 18l-5-5l-5 5z" fill="currentColor"></path><path d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22z" fill="currentColor"></path></svg>
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动图片到该区域来上传，关闭图片可重置
          </n-text>
          <n-p depth="3">
            同名文件会被替换，仅支持大多数图片类型，入 jpg、jpeg、png、tiff、heic、heif、webp 等。<br />
            受限于部署平台限制，如 Vercel，可能只允许免费用户传递 6M 内文件......<br />
            所以，如果你的平台受限，你要么换平台，要么压缩文件......
          </n-p>
        </n-upload-dragger>
      </n-upload>
      <div v-if="fileUrl" space-y-2>
        <p>图片地址：</p>
        <n-tag :bordered="false">
          {{ fileUrl }}
        </n-tag>
        <p>图片描述：</p>
        <n-input
          v-model:value="imgData.detail"
          type="textarea"
          placeholder="请输入图片描述！"
        />
        <div flex flex-row space-x-2>
          <p>评分：</p>
          <n-rate v-model:value="imgData.rating" />
        </div>
        <n-descriptions bordered label-placement="top" :title="Object.keys(imgData.exif).length === 0 ? 'EXIF 信息为空！' : 'EXIF'">
          <n-descriptions-item v-if="imgData.exif?.Make?.description" label="相机品牌">
            {{ imgData.exif?.Make?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.Model?.description" label="相机型号">
            {{ imgData.exif?.Model?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.[`Bits Per Sample`]?.description" label="bit 位数">
            {{ imgData.exif?.["Bits Per Sample"]?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.DateTime?.description" label="拍摄时间">
            {{ imgData.exif?.DateTime?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.ExposureTime?.description" label="快门时间">
            {{ imgData.exif?.ExposureTime?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.FNumber?.description" label="光圈">
            {{ imgData.exif?.FNumber?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.ExposureProgram?.description" label="曝光模式">
            {{ imgData.exif?.ExposureProgram?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.ISOSpeedRatings?.description" label="ISO">
            {{ imgData.exif?.ISOSpeedRatings?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.FocalLength?.description" label="焦距">
            {{ imgData.exif?.FocalLength?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.LensSpecification?.description" label="镜头规格">
            {{ imgData.exif?.LensSpecification?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.LensModel?.description" label="镜头型号">
            {{ imgData.exif?.LensModel?.description }}
          </n-descriptions-item>
          <n-descriptions-item v-if="imgData.exif?.ExposureMode?.description" label="曝光模式">
            {{ imgData.exif?.ExposureMode?.description }}
          </n-descriptions-item>
        </n-descriptions>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
