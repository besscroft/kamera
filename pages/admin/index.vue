<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import * as ExifReader from 'exifreader'
import { useUserStore } from '~/composables/user'
import { ElMessage } from 'element-plus'

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')

const user = useUserStore()
const fileUrl = ref('')
const loading = ref<boolean>(false)

const imgData = reactive({
  type: '',
  url: '',
  exif: {},
  detail: '',
  rating: ''
})

const options = ref([
  {
    label: '首页轮播图',
    value: 'carousel',
  },
  {
    label: '首页精选',
    value: 'index',
  },
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
  const file = option.file
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
    if (tags?.Images) {
      imgData.exif.Images = tags?.Images?.map(({ base64, image, ...item }) => {
        return {
          ...item,
        }
      })
    }
    imgData.url = url
  }
}

const submit = async () => {
  loading.value = true
  try {
    if (imgData.type === '') {
      ElMessage.error('请选择类型！')
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
      ElMessage.success('上传成功！')
    } else {
      ElMessage.error('上传失败！')
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
  <div class="w-full max-h-full md:max-w-7xl flex flex-col items-center justify-center mx-auto p2 md:p8 pb-20">
    <div class="my-16 mx-auto w-full md:max-w-4xl rounded-md bg-white dark:bg-gray-800 shadow p-2">
      <div flex items-center justify-center pb-2 space-x-2>
        <el-select v-model="imgData.type" class="m-2" placeholder="请选择图片类别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button round v-if="fileUrl" :loading="loading" @click="submit">上传</el-button>
      </div>
      <el-upload
        class="upload-demo"
        drag
        :limit="1"
        :http-request="onRequestUpload"
        :before-remove="() => {
          fileUrl = '';
          imgData.url = '';
          imgData.rating = 0;
          imgData.detail = '';
          imgData.exif = {};
          imgData.type = '';
        }"
        accept="image/jpg, image/jpeg, image/png, image/tiff, image/heic, image/heif, image/webp, image/avif"
      >
        <div class="el-upload__text">
          点击或者拖动图片到该区域来上传，关闭图片可重置
        </div>
        <template #tip>
          <div class="el-upload__tip">
            同名文件会被替换，仅支持大多数图片类型，入 jpg、jpeg、png、tiff、heic、heif、webp 等。<br />
            受限于部署平台限制，如 Vercel，可能只允许免费用户传递 6M 内文件......<br />
            所以，如果你的平台受限，你要么换平台，要么压缩文件......
          </div>
        </template>
      </el-upload>
      <div v-if="fileUrl" space-y-2>
        <p break-words text-green-400>图片地址：{{ fileUrl }}</p>
        <p>图片描述：</p>
        <el-input
          v-model="imgData.detail"
          :rows="2"
          type="textarea"
          placeholder="请输入图片描述！"
        />
        <div flex flex-row space-x-2>
          <p>评分：</p>
          <el-rate v-model="imgData.rating" />
        </div>
        <el-descriptions
          :title="Object.keys(imgData.exif).length === 0 ? 'EXIF 信息为空！' : 'EXIF'"
          direction="vertical"
          :column="smAndLarger ? 4 : 2"
          border
        >
          <el-descriptions-item v-if="imgData.exif?.Make?.description" label="相机品牌">
            {{ imgData.exif?.Make?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.Model?.description" label="相机型号">
            {{ imgData.exif?.Model?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.[`Bits Per Sample`]?.description" label="bit 位数">
            {{ imgData.exif?.["Bits Per Sample"]?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.DateTime?.description" label="拍摄时间">
            {{ imgData.exif?.DateTime?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.ExposureTime?.description" label="快门时间">
            {{ imgData.exif?.ExposureTime?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.FNumber?.description" label="光圈">
            {{ imgData.exif?.FNumber?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.ExposureProgram?.description" label="曝光模式">
            {{ imgData.exif?.ExposureProgram?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.ISOSpeedRatings?.description" label="ISO">
            {{ imgData.exif?.ISOSpeedRatings?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.FocalLength?.description" label="焦距">
            {{ imgData.exif?.FocalLength?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.LensSpecification?.description" label="镜头规格">
            {{ imgData.exif?.LensSpecification?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.LensModel?.description" label="镜头型号">
            {{ imgData.exif?.LensModel?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.ExposureMode?.description" label="曝光模式">
            {{ imgData.exif?.ExposureMode?.description }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
