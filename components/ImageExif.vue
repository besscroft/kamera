<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps<{
  exif: any
}>()
const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')
</script>

<template>
  <el-descriptions
    :title="Object.keys(exif).length === 0 ? 'EXIF 信息为空！' : 'EXIF'"
    direction="vertical"
    :column="mdAndLarger ? 3 : 2"
    border
  >
    <el-descriptions-item v-if="exif.make" label="相机品牌">
      {{ exif.make }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.model" label="相机型号">
      {{ exif.model }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.bits" label="bit 位数">
      {{ exif.bits }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.data_time" label="拍摄时间">
      {{ exif.data_time }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.exposure_time" label="快门时间">
      {{ exif.exposure_time }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.f_number" label="光圈">
      {{ exif.f_number }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.exposure_program" label="曝光程序">
      {{ exif.exposure_program }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.iso_speed_rating" label="ISO">
      {{ exif.iso_speed_rating }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.focal_length" label="焦距">
      {{ exif.focal_length }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.lens_specification" label="镜头规格">
      {{ exif.lens_specification }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.lens_model" label="镜头型号">
      {{ exif.lens_model }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.exposure_mode" label="曝光模式">
      {{ exif.exposure_mode }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.cfa_pattern" label="CFA 模式">
      {{ exif.cfa_pattern }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.color_space" label="色彩空间">
      {{ exif.color_space }}
    </el-descriptions-item>
    <el-descriptions-item v-if="exif.white_balance" label="白平衡">
      {{ exif.white_balance }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>

</style>
