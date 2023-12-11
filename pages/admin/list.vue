<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import photosList from '~/constants/photos.json'

const toast = useToast()
const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual('md')
const { isMobile } = useDevice()
const user = useUserStore()
const dataList = ref<Array<Object>>([])
const loading = ref<boolean>(false)
const showBtnLoading = ref<boolean>(false)
const rowInfo = ref()
const rating = ref(0)
const showModal = ref<boolean>(false)
const showUpdateModal = ref<boolean>(false)
const pageInfo = reactive({
  total: 0,
  totalPage: 0,
  pageNum: 1,
  pageSize: 10,
})
const objInfo = reactive({
  id: 0,
  type: '',
  rating: 0,
  detail: '',
  url: '',
  sort: 0,
})

const detail = (row: any) => {
  rowInfo.value = row
  rating.value = row.rating
  showModal.value = true
}

const update = (row: any) => {
  objInfo.id = row.id
  objInfo.type = row.type
  objInfo.rating = row.rating
  objInfo.detail = row.detail
  objInfo.url = row.url
  showUpdateModal.value = true
}

const xClick = async () => {
  rowInfo.value = {}
  rating.value = 0
  showModal.value = false
}

const uClick = async () => {
  objInfo.id = 0
  objInfo.type = ''
  objInfo.rating = 0
  objInfo.detail = ''
  objInfo.url = ''
  showUpdateModal.value = false
}

const dataHandle = async () => {
  loading.value = true
  try {
    const { total, totalPage, pageNum, pageSize, data } = await $fetch('/api/getFileList', {
      timeout: 60000,
      method: 'post',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      },
      body: { pageNum: pageInfo.pageNum, pageSize: pageInfo.pageSize, type: '' },
    })
    dataList.value = data
    pageInfo.total = total
    pageInfo.totalPage = totalPage
  } finally {
    loading.value = false
  }
}

const updateHandle = async () => {
  try {
    const { data } = await $fetch('/api/updateImgInfo', {
      timeout: 60000,
      method: 'put',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      },
      body: { id: objInfo.id, type: objInfo.type, rating: objInfo.rating, detail: objInfo.detail, url: objInfo.url, sort: objInfo.sort },
    })
    if (data === 0) {
      toast.add({ title: '更新成功！', timeout: 2000 })
      await uClick()
      await dataHandle()
    } else {
      toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
    }
  } catch (e) {
    console.log(e)
    toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
  }
}

const deleteHandle = async (id: number) => {
  try {
    const { data } = await $fetch('/api/deleteImg', {
      timeout: 60000,
      method: 'delete',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      },
      body: { id: id },
    })
    if (data === 0) {
      toast.add({ title: '删除成功！', timeout: 2000 })
      await dataHandle()
    } else {
      toast.add({ title: '删除失败！', timeout: 2000, color: 'red' })
    }
  } catch (e) {
    console.log(e)
    toast.add({ title: '删除失败！', timeout: 2000, color: 'red' })
  }
}

const updateShowHandle = async (val: number, id: number) => {
  showBtnLoading.value = true
  try {
    const { data } = await $fetch('/api/updateShow', {
      timeout: 60000,
      method: 'put',
      headers: {
        Authorization: `${user.tokenName} ${user.token}`
      },
      body: { id: id, show: val },
    })
    if (data === 0) {
      toast.add({ title: '更新成功！', timeout: 2000 })
      showBtnLoading.value = false
      await dataHandle()
    } else {
      toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
    }
    showBtnLoading.value = false
  } catch (e) {
    console.log(e)
    showBtnLoading.value = false
    toast.add({ title: '更新失败！', timeout: 2000, color: 'red' })
  }
}

const isDiyType = (type: string) => {
  return photosList.some(item => type === item.url.replace('/', ''));
}

const tagTitleHandle = (type: string) => {
  return photosList.find(item => type === item.url.replace('/', ''))?.title
}

onBeforeMount(async () => {
  await dataHandle()
})

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div>
    <div p2 md:p8 pb-20>
      <el-table
        :data="dataList"
        v-loading="loading"
        stripe
        style="width: 100%"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="类型" prop="type">
          <template #default="scope">
            <el-tag v-if="scope.row.type === 'index'">首页精选</el-tag>
            <el-tag v-else-if="isDiyType(scope.row.type)">
              {{ tagTitleHandle(scope.row.type) || '错误类型' }}
            </el-tag>
            <el-tag v-else type="danger">错误类型</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="评分" prop="rating" />
        <el-table-column label="是否显示" prop="type">
          <template #default="scope">
            <el-switch
              v-model="scope.row.show"
              inline-prompt
              active-text="是"
              inactive-text="否"
              :active-value="0"
              :inactive-value="1"
              :loading="showBtnLoading"
              @change="(val) => { updateShowHandle(val, scope.row.id) }"
            />
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" />
        <el-table-column label="描述" prop="detail" />
        <el-table-column align="right" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="detail(scope.row)">查看</el-button>
            <el-button size="small" @click="() => { objInfo.sort = scope.row.sort ;update(scope.row) }">维护</el-button>
            <el-popconfirm title="确定删除？" @confirm="deleteHandle(scope.row.id)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div flex items-center space-x-1 text-sm mt1>
        <p v-if="pageInfo.total > 0">共 {{ pageInfo.total }} 条</p>
        <el-pagination
          background
          layout="sizes, prev, pager, next"
          :page-sizes="[10, 20, 50, 100]"
          :total="pageInfo.total"
          v-model:page-size="pageInfo.pageSize"
          v-model:current-page="pageInfo.pageNum"
          :page-count="pageInfo.totalPage"
          @size-change="(val: number) => { pageInfo.pageSize = val; dataHandle() }"
          @current-change="(val: number) => { pageInfo.pageNum = val; dataHandle() }"
        />
      </div>
    </div>
    <el-drawer
      v-model="showUpdateModal"
      title="维护"
      :direction="!isMobile || smAndLarger ? 'ltr' : 'btt'"
      @close="() => uClick()"
      :size="!isMobile || smAndLarger ? '50%' : '80%'"
    >
      <div space-y-2>
        <p>图片地址：</p>
        <el-input
          v-model="objInfo.url"
          :rows="2"
          type="textarea"
          placeholder="请输入图片地址！"
        />
        <p>图片描述：</p>
        <el-input
          v-model="objInfo.detail"
          :rows="2"
          type="textarea"
          placeholder="请输入图片描述！"
        />
        <div flex flex-row space-x-2>
          <p>评分：</p>
          <el-rate v-model="objInfo.rating" />
        </div>
        <div flex flex-row space-x-2>
          <p>排序：</p>
          <el-input-number v-model="objInfo.sort" :min="0" :max="32767" />
        </div>
        <el-popconfirm title="确定更新？" @confirm="updateHandle()">
          <template #reference>
            <el-button size="small">保存</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-drawer>
    <el-drawer
      v-model="showModal"
      title="详情"
      :direction="!isMobile || smAndLarger ? 'ltr' : 'btt'"
      @close="() => xClick()"
      :size="!isMobile || smAndLarger ? '50%' : '80%'"
    >
      <el-image
        lazy shadow-xl border-4
        :src="rowInfo.url"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        fit="cover"
      >
        <template #placeholder>
          <div class="image-slot">加载中<span class="dot">...</span></div>
        </template>
      </el-image>
      <div flex flex-row space-x-2>
        <p break-words>图片描述：{{ rowInfo.detail }}</p>
      </div>
      <div flex flex-row space-x-2>
        <p>评分：</p>
        <el-rate
          v-model="rating"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value} 分"
        />
      </div>
      <div flex flex-row space-x-2>
        <p>排序：</p>
        <el-tag class="ml-2" type="success">{{ objInfo.sort || 0 }}</el-tag>
      </div>
      <el-descriptions
        v-if="rowInfo.exif && Object.keys(rowInfo.exif).length > 0"
        :title="Object.keys(rowInfo.exif).length === 0 ? 'EXIF 信息为空！' : 'EXIF'"
        direction="vertical"
        :column="smAndLarger ? 4 : 2"
        border
      >
        <el-descriptions-item v-if="rowInfo.exif?.Make?.description" label="相机品牌">
          {{ rowInfo.exif?.Make?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.Model?.description" label="相机型号">
          {{ rowInfo.exif?.Model?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.[`Bits Per Sample`]?.description" label="bit 位数">
          {{ rowInfo.exif?.["Bits Per Sample"]?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.DateTime?.description" label="拍摄时间">
          {{ rowInfo.exif?.DateTime?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.ExposureTime?.description" label="快门时间">
          {{ rowInfo.exif?.ExposureTime?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.FNumber?.description" label="光圈">
          {{ rowInfo.exif?.FNumber?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.ExposureProgram?.description" label="曝光程序">
          {{ rowInfo.exif?.ExposureProgram?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.ISOSpeedRatings?.description" label="ISO">
          {{ rowInfo.exif?.ISOSpeedRatings?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.FocalLength?.description" label="焦距">
          {{ rowInfo.exif?.FocalLength?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.LensSpecification?.description" label="镜头规格">
          {{ rowInfo.exif?.LensSpecification?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.LensModel?.description" label="镜头型号">
          {{ rowInfo.exif?.LensModel?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.ExposureMode?.description" label="曝光模式">
          {{ rowInfo.exif?.ExposureMode?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.CFAPattern?.description" label="CFA 模式">
          {{ rowInfo.exif?.CFAPattern?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.ColorSpace?.description" label="色彩空间">
          {{ rowInfo.exif?.ColorSpace?.description }}
        </el-descriptions-item>
        <el-descriptions-item v-if="rowInfo.exif?.WhiteBalance?.description" label="白平衡">
          {{ rowInfo.exif?.WhiteBalance?.description }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<style scoped>

</style>
