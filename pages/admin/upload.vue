<script setup lang="ts">
import * as ExifReader from 'exifreader'
import photosList from '~/constants/photos.json'

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
  rating: 0,
})
const exif = reactive<any>({
  make: '',
  model: '',
  bits: '',
  data_time: '',
  exposure_time: '',
  f_number: '',
  exposure_program: '',
  iso_speed_rating: '',
  focal_length: '',
  lens_specification: '',
  lens_model: '',
  exposure_mode: '',
  cfa_pattern: '',
  color_space: '',
  white_balance: '',
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
  try {
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
      exif.make = tags?.Make?.description
      exif.model = tags?.Model?.description
      exif.bits = tags?.['Bits Per Sample']?.description
      exif.data_time = tags?.DateTime?.description
      exif.exposure_time = tags?.ExposureTime?.description
      exif.f_number = tags?.FNumber?.description
      exif.exposure_program = tags?.ExposureProgram?.description
      exif.iso_speed_rating = tags?.ISOSpeedRatings?.description
      exif.focal_length = tags?.FocalLength?.description
      exif.lens_specification = tags?.LensSpecification?.description
      exif.lens_model = tags?.LensModel?.description
      exif.exposure_mode = tags?.ExposureMode?.description
      exif.cfa_pattern = tags?.CFAPattern?.description
      exif.color_space = tags?.ColorSpace?.description
      exif.white_balance = tags?.WhiteBalance?.description
      imgData.exif = exif
      imgData.url = url
    }
  } catch (e) {
    if (e?.status === 413) {
      toast.add({ title: '上传文件大小超出限制！', timeout: 2000, color: 'red' })
    } else {
      toast.add({ title: '图片上传/解析失败！', timeout: 2000, color: 'red' })
    }
    option.file.abort()
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
    try {
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
      } else {
        toast.add({ title: '保存失败！', timeout: 2000, color: 'red' })
      }
    } catch (e) {
      toast.add({ title: '保存失败！', timeout: 2000, color: 'red' })
    }
  } finally {
    loading.value = false
  }
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

  exif.make = ''
  exif.model = ''
  exif.bits = ''
  exif.data_time = ''
  exif.exposure_time = ''
  exif.f_number = ''
  exif.exposure_program = ''
  exif.iso_speed_rating = ''
  exif.focal_length = ''
  exif.lens_specification = ''
  exif.lens_model = ''
  exif.exposure_mode = ''
  exif.cfa_pattern = ''
  exif.color_space = ''
  exif.white_balance = ''
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
      try {
        toast.add({ title: '正在获取 AList 挂载目录！', timeout: 2000 })
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
        mountSelectShow.value = true
      } catch (e) {
        toast.add({ title: 'AList 挂载目录获取失败！', timeout: 2000, color: 'red' })
      }
    }
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
  <div w-full max-h-full flex flex-col items-center justify-center mx-auto p2 md:p8 pb-20 class="md:w-4/5 lg:w-3/5">
    <div my-6 md:my-16 mx-auto w-full rounded-md bg-white dark:bg-gray-800 shadow p-2>
      <div flex items-center justify-center pb-2>
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
        <el-button v-if="fileUrl" round :loading="loading" @click="submit"> 保存 </el-button>
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
          <svg size-8 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M11 18l1.41 1.41L15 16.83V29h2V16.83l2.59 2.58L21 18l-5-5l-5 5z" fill="currentColor"></path><path d="M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22z" fill="currentColor"></path></svg>
        </div>
        <div class="el-upload__text">
          点击或者拖动图片到该区域来上传
        </div>
        <template #tip>
          <div class="el-upload__tip">
            点击图片右上角关闭图片重置上传；Vercel 等平台 Free 订阅限制上传大小 6M。
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
        <ImageExif :exif="imgData.exif" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
