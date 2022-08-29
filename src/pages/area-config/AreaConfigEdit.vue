<!--
 * @Date: 2022-06-21 14:47:46
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-19 15:29:54
 * @FilePath: /shopify-management/src/pages/area-config/AreaConfigEdit.vue
-->
<template>
  <el-drawer v-model="isVisible" title="尺寸配置" :size="500" @opened="opened">
    <template #default>
      <el-form
        ref="formEl" status-icon :model="form" :rules="rules" label-position="top"
        label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="宽度" prop="width">
              <el-input-number v-model="form.width" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高度" prop="height">
              <el-input-number v-model="form.height" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template #footer>
      <el-button type="primary" @click="handleConfirm">confirm</el-button>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, toRaw } from 'vue'
// import { ElMessage, ElMessageBox } from 'element-plus'
import { useVModel } from '@vueuse/core'

// 这是分割线，主体业务
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object
  }
})

const emits = defineEmits({
  'update:visible': null,
  confirm: null
})

const isVisible = useVModel(props, 'visible', emits)

const formEl = ref(null)
const form = ref({
  area: '中华人民共和国',
  date1: '2016-05-03',
  date2: '2016-05-03'
})
const actionType = ref('add')

const rules = ref({
  name: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  width: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  height: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ]
})

const opened = () => {
  if (props.data) {
    form.value = { ...toRaw(props.data) }
    actionType.value = 'add'
  } else {
    form.value = {
      name: '',
      width: 500,
      height: 600
    }
    actionType.value = 'edit'
  }
}

// 确定
const handleConfirm = async () => {
  if (!formEl.value) return
  await formEl.value.validate((valid, fields) => {
    if (valid) {
      emits('confirm', { ...form.value }, actionType.value)
      isVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="scss" scoped>
</style>
