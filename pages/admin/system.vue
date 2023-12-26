<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { FormError, FormSubmitEvent } from '#ui/types'

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
const toast = useToast()
const userLoading = ref<boolean>(false)
const storageLoading = ref<boolean>(false)
const storageInfo = ref()
const user = useUserStore()
const showS3Modal = ref<boolean>(false)
const showAListModal = ref<boolean>(false)
const defaultIndex = ref(0)
const items = [{
  slot: 'info',
  label: '系统',
}, {
  slot: 's3',
  label: 'S3',
}, {
  slot: 'alist',
  label: 'AList',
}]

const s3State = reactive({
  accesskeyId: undefined,
  accesskeySecret: undefined,
  region: undefined,
  endpoint: undefined,
  bucket: undefined,
  storageFolder: undefined,
  cdnUrl: undefined,
})
const alistState = reactive({
  alistUrl: undefined,
  alistToken: undefined,
})

const userValidate = (state: any): FormError[] => {
  const errors = []
  if (!state.oldPassword) {
    errors.push({ path: 'oldPassword', message: '旧密码必填！' })
  }
  if (!state.newPassword) {
    errors.push({ path: 'newPassword', message: '新密码必填！' })
  }
  if (state.oldPassword === state.newPassword) {
    errors.push({ path: 'newPassword', message: '密码不能一致！' })
  }
  return errors
}
const userState = reactive({
  oldPassword: undefined,
  newPassword: undefined,
})

const onSubmitUser = async (event: FormSubmitEvent<any>) => {
  userLoading.value = true
  try {
    const { data } = await $fetch('/api/updatePwd', {
      method: 'post',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`,
      },
      body: userState,
    })
    if (data === 0) {
      toast.add({ title: '更新成功！', timeout: 2000 })
    } else {
      toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
    }
  } catch (e) {
    toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
  } finally {
    userLoading.value = false
  }
}

const getStorageInfo = async () => {
  storageLoading.value = true
  try {
    const { data } = await $fetch('/api/getStorageInfo', {
      method: 'get',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`,
      },
    })
    storageInfo.value = data
  } catch (e) {
    console.log(e)
  } finally {
    storageLoading.value = false
  }
}

const openS3Model = () => {
  s3State.accesskeyId = storageInfo.value.accesskeyId
  s3State.accesskeySecret = storageInfo.value.accesskeySecret
  s3State.region = storageInfo.value.region
  s3State.endpoint = storageInfo.value.endpoint
  s3State.bucket = storageInfo.value.bucket
  s3State.storageFolder = storageInfo.value.storageFolder
  s3State.cdnUrl = storageInfo.value.cdnUrl
  showS3Modal.value = true
}

const openAListModel = () => {
  alistState.alistUrl = storageInfo.value.alistUrl
  alistState.alistToken = storageInfo.value.alistToken
  showAListModal.value = true
}

const xClick = async () => {
  showS3Modal.value = false
  showAListModal.value = false
  s3State.accesskeyId = undefined
  s3State.accesskeySecret = undefined
  s3State.region = undefined
  s3State.endpoint = undefined
  s3State.bucket = undefined
  s3State.storageFolder = undefined
  s3State.cdnUrl = undefined
  alistState.alistUrl = undefined
  alistState.alistToken = undefined
}

const updateS3 = async () => {
  try {
    const { data } = await $fetch('/api/updateS3Info', {
      method: 'put',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`,
      },
      body: s3State,
    })
    if (data === 0) {
      toast.add({ title: '更新成功！', timeout: 2000 })
      await xClick()
      await getStorageInfo()
    } else {
      toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
    }
  } catch (e) {
    console.log(e)
    toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
  }
}

const updateAlist = async () => {
  try {
    const { data } = await $fetch('/api/updateAListInfo', {
      method: 'put',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`,
      },
      body: alistState,
    })
    if (data === 0) {
      toast.add({ title: '更新成功！', timeout: 2000 })
      await xClick()
      await getStorageInfo()
    } else {
      toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
    }
  } catch (e) {
    console.log(e)
    toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
  }
}

onMounted(async () => {
  await getStorageInfo()
})

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div w-full max-h-full flex flex-col items-center justify-center mx-auto p2 md:p8 pb-20 class="md:w-4/5 lg:w-3/5">
    <UTabs :items="items" v-model="defaultIndex" mt-8 w-full>
      <template #info="{ item }">
        <div flex flex-col space-y-2>
          <el-card mx-auto rounded-lg shadow-md w-full>
            <h3 flex justify-center items-center space-x-1 text-base text-center font-medium>
              <div i-carbon-password />
              <p>密码修改</p>
            </h3>
            <div mt-1 text-center>
              <UForm :validate="userValidate" :state="userState" class="space-y-4" @submit="onSubmitUser">
                <UFormGroup label="旧密码" name="oldPassword">
                  <UInput v-model="userState.oldPassword" type="password" />
                </UFormGroup>

                <UFormGroup label="新密码" name="newPassword">
                  <UInput v-model="userState.newPassword" type="password" />
                </UFormGroup>

                <UButton type="submit" color="white" :loading="userLoading">
                  更新
                </UButton>
              </UForm>
            </div>
          </el-card>
        </div>
      </template>

      <template #s3="{ item }">
        <el-card mx-auto rounded-lg shadow-md w-full>
          <template #header>
            <div flex justify-between items-center>
              <span>S3 配置信息</span>
              <UButton color="white" variant="solid" @click="openS3Model()">编辑</UButton>
            </div>
          </template>
          <el-descriptions
            direction="vertical"
            :column="smAndLarger ? 3 : 2"
            border
          >
            <el-descriptions-item label="AccessKey_ID">
              <el-text class="w-100px" truncated>
                {{ storageInfo?.accesskeyId }}
              </el-text>
            </el-descriptions-item>
            <el-descriptions-item label="AccessKey_Secret">
              <el-text class="w-100px" truncated>
                {{ storageInfo?.accesskeySecret }}
              </el-text>
            </el-descriptions-item>
            <el-descriptions-item label="Region 地域">{{ storageInfo?.region }}</el-descriptions-item>
            <el-descriptions-item label="Endpoint 地域节点">{{ storageInfo?.endpoint }}</el-descriptions-item>
            <el-descriptions-item label="Bucket 存储桶">{{ storageInfo?.bucket }}</el-descriptions-item>
            <el-descriptions-item label="存储文件夹(S3)">{{ storageInfo?.storageFolder }}</el-descriptions-item>
            <el-descriptions-item label="CDN 域名（仅 S3）">{{ storageInfo?.cdnUrl }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>

      <template #alist="{ item }">
        <el-card mx-auto rounded-lg shadow-md w-full>
          <template #header>
            <div flex justify-between items-center>
              <span>AList 配置信息</span>
              <UButton color="white" variant="solid" @click="openAListModel()">编辑</UButton>
            </div>
          </template>
          <el-descriptions
            direction="vertical"
            border
          >
            <el-descriptions-item label="AList 地址">{{ storageInfo?.alistUrl }}</el-descriptions-item>
            <el-descriptions-item label="AList 令牌">
              <el-text class="w-100px" truncated>
                {{ storageInfo?.alistToken }}
              </el-text>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </template>
    </UTabs>

    <el-drawer
      v-model="showS3Modal"
      title="S3 配置信息维护"
      :direction="smAndLarger ? 'ltr' : 'btt'"
      @close="() => xClick()"
      :size="smAndLarger ? '50%' : '80%'"
    >
      <div space-y-2>
        <p>阿里 OSS / AWS S3 AccessKey_ID：</p>
        <el-input
          v-model="s3State.accesskeyId"
          placeholder="请输入 AccessKey_ID"
        />
        <p>阿里 OSS / AWS S3 AccessKey_Secret：</p>
        <el-input
          v-model="s3State.accesskeySecret"
          placeholder="请输入 AccessKey_Secret"
        />
        <p>阿里 OSS / AWS S3 Region 地域，如：oss-cn-hongkong：</p>
        <el-input
          v-model="s3State.region"
          placeholder="请输入 Region"
        />
        <p>阿里 OSS / AWS S3 Endpoint 地域节点，如：oss-cn-hongkong.aliyuncs.com：</p>
        <el-input
          v-model="s3State.endpoint"
          placeholder="请输入 Endpoint"
        />
        <p>阿里 OSS / AWS S3 Bucket 存储桶名称，如：kamera：</p>
        <el-input
          v-model="s3State.bucket"
          placeholder="请输入 Bucket"
        />
        <p>存储文件夹(S3)，严格格式，如：kamera 或 kamera/images ，填 / 或者不填表示根路径：</p>
        <el-input
          v-model="s3State.storageFolder"
          placeholder="请输入存储文件夹"
        />
        <p>CDN 域名（仅 S3），请严格按照 example.com 格式，不需要添加 https:// 会自动补充，如：kamera-s3-cdn.heming.dev，CDN 以兼容阿里云 OSS 为主，理论上适配大多数存储。：</p>
        <el-input
          v-model="s3State.cdnUrl"
          placeholder="请输入 CDN 域名"
        />
        <el-popconfirm title="确定更新？" @confirm="updateS3()">
          <template #reference>
            <el-button size="small">保存</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-drawer>

    <el-drawer
      v-model="showAListModal"
      title="AList 配置信息维护"
      :direction="smAndLarger ? 'ltr' : 'btt'"
      @close="() => xClick()"
      :size="smAndLarger ? '50%' : '80%'"
    >
      <div space-y-2>
        <p>AList 地址：</p>
        <el-input
          v-model="alistState.alistUrl"
          placeholder="请输入 AList 地址"
        />
        <p>alist 令牌：</p>
        <el-input
          v-model="alistState.alistToken"
          :rows="2"
          type="textarea"
          placeholder="请输入 alist 令牌"
        />
        <el-popconfirm title="确定更新？" @confirm="updateAlist()">
          <template #reference>
            <el-button size="small">保存</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped>

</style>
