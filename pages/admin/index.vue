<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import * as ExifReader from 'exifreader'
import photosList from '~/constants/photos.json'
import { useUserStore } from '~/composables/user'

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')

const user = useUserStore()
const fileUrl = ref('')
const loading = ref<boolean>(false)
const toast = useToast()
const mountSelectShow = ref(false)

const storage = ref('')
const imgData = reactive({
  mountPath: '',
  type: '',
  url: '',
  exif: {},
  detail: '',
  rating: '',
})

const storageOptions = ref([
  {
    label: 'S3',
    value: 's3',
  },
  {
    label: 'AList',
    value: 'alist',
  },
])
const mountOptions = ref([
])
const imgTypeOptions = ref([
  {
    label: '首页精选',
    value: 'index',
  },
])

/** 自定义上传请求 */
async function onRequestUpload(option: any) {
  const file = option.file
  const formData = new FormData()
  formData.append('file', file)
  formData.append('storage', storage.value || '')
  formData.append('type', imgData.type || '')
  formData.append('mountPath', imgData.mountPath || '')
  const { data, url } = await $fetch('/api/uploadFile', {
    timeout: 60000,
    method: 'post',
    headers: {
      Authorization: `${user.tokenName} ${user.token}`,
    },
    body: formData,
  })
  if (data === 0) {
    fileUrl.value = url
    const tags = await ExifReader.load(file)
    if (tags?.Thumbnail && tags?.Thumbnail?.base64) {
      tags.Thumbnail.base64 = undefined
    }
    if (tags?.Thumbnail && tags?.Thumbnail?.image) {
      tags.Thumbnail.image = undefined
    }
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

async function submit() {
  loading.value = true
  try {
    if (storage.value === '') {
      toast.add({ title: '请选择存储！', timeout: 2000, color: 'red' })
      loading.value = false
      return
    }
    if (storage.value === 'alist' && imgData.mountPath === '') {
      toast.add({ title: '请选择挂载目录！', timeout: 2000, color: 'red' })
      loading.value = false
      return
    }
    if (imgData.type === '') {
      toast.add({ title: '请选择类型！', timeout: 2000, color: 'red' })
      loading.value = false
      return
    }
    const { data } = await $fetch('/api/addImg', {
      timeout: 60000,
      method: 'post',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`,
      },
      body: imgData,
    })
    if (data === 0) {
      toast.add({ title: '保存成功！', timeout: 2000 })
    }
    else {
      toast.add({ title: '保存失败！', timeout: 2000, color: 'red' })
    }
  }
  catch (e) {
    loading.value = false
  }
  loading.value = false
}

function removeFile() {
  mountOptions.value = []
  fileUrl.value = ''
  storage.value = ''
  imgData.mountPath = ''
  imgData.url = ''
  imgData.rating = 0
  imgData.detail = ''
  imgData.exif = {}
  imgData.type = ''
}

function onBeforeUpload(file: any) {
  if (!storage.value || storage.value === '') {
    toast.add({ title: '请先选择存储！', timeout: 2000, color: 'red' })
    file.abort()
  } else if (storage.value === 'alist' && (!imgData.mountPath || imgData.mountPath === '')) {
    toast.add({ title: '请先选择挂载目录！', timeout: 2000, color: 'red' })
    file.abort()
  } else if (!imgData.type || imgData.type === '') {
    toast.add({ title: '请先选择图片类别！', timeout: 2000, color: 'red' })
    file.abort()
  } else {
    toast.add({ title: '正在上传文件！', timeout: 1000 })
  }
}

const exceed = () => {
  toast.add({ title: '只能同时上传一张图片！', timeout: 2000, color: 'red' })
}

watch(storage, async (val) => {
  if (val === 'alist') {
    if (mountOptions.value.length === 0) {
      const { data } = await $fetch('/api/getStorageList', {
        timeout: 60000,
        method: 'get',
        headers: {
          Authorization: `${user.tokenName} ${user.token}`,
        },
      })
      if (data) {
        // 遍历数组，给 mountOptions 赋值
        data.forEach((item: any) => {
          if (item.status === 'work') {
            mountOptions.value.push({
              label: item.mount_path,
              value: item.mount_path,
            })
          }
        })
      }
    }
    mountSelectShow.value = true
  } else {
    mountSelectShow.value = false
  }
})

onBeforeMount(() => {
  if (photosList) {
    photosList?.forEach((photo: any) => {
      imgTypeOptions.value.push({
        label: photo.title,
        value: photo.url.replace('/', ''),
      })
    })
  }
})

onUnmounted(() => {
  removeFile()
})

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div w-full max-h-full md:max-w-7xl flex flex-col items-center justify-center mx-auto p2 md:p8 pb-20>
    <div my-6 md:my-16 mx-auto w-full md:max-w-4xl rounded-md bg-white dark:bg-gray-800 shadow p-2>
      <div flex items-center justify-center pb-2 space-x-2>
        <el-select v-model="storage" m-2 placeholder="请选择存储">
          <el-option
            v-for="item in storageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="imgData.type" m-2 placeholder="请选择图片类别">
          <el-option
            v-for="item in imgTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button round v-if="fileUrl" :loading="loading" @click="submit"> 保存 </el-button>
      </div>
      <div v-if="mountSelectShow && mountOptions.length > 0" flex items-center justify-center pb-2>
        <el-select v-model="imgData.mountPath" m-2 placeholder="请选择挂载目录">
          <el-option
            v-for="item in mountOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-upload
        class="upload-demo"
        drag
        :limit="1"
        :http-request="onRequestUpload"
        :before-upload="(file) => { onBeforeUpload(file) }"
        :on-success="() => { toast.add({ title: '文件上传成功！请编辑后保存！', timeout: 2000 }) }"
        :before-remove="removeFile"
        :on-exceed="exceed"
        list-type="picture"
        accept="image/jpg, image/jpeg, image/png, image/tiff, image/heic, image/heif, image/webp, image/avif"
      >
        <div flex justify-center items-center p2>
          <svg h-8 w-8 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M11 18l1.41 1.41L15 16.83V29h2V16.83l2.59 2.58L21 18l-5-5l-5 5z" fill="currentColor"></path><path d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22z" fill="currentColor"></path></svg>
        </div>
        <div class="el-upload__text">
          点击或者拖动图片到该区域来上传，关闭图片可重置
        </div>
        <template #tip>
          <div mt-4>
            <UAlert
              description="同类别同名文件会被覆盖，支持大多数图片类型。受限于部署平台限制，如 Vercel，可能只允许免费用户传递 6M 内文件..."
              :avatar="{ src: '/112962239_p0.jpg' }"
              title="噔噔！"
            />
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
          <el-descriptions-item v-if="imgData.exif?.ExposureProgram?.description" label="曝光程序">
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
          <el-descriptions-item v-if="imgData.exif?.CFAPattern?.description" label="CFA 模式">
            {{ imgData.exif?.CFAPattern?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.ColorSpace?.description" label="色彩空间">
            {{ imgData.exif?.ColorSpace?.description }}
          </el-descriptions-item>
          <el-descriptions-item v-if="imgData.exif?.WhiteBalance?.description" label="白平衡">
            {{ imgData.exif?.WhiteBalance?.description }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
