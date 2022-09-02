<!--
 * @Date: 2022-06-21 14:47:46
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 15:02:48
 * @FilePath: /shopify-management/src/components/PicturePuzzleEdit.vue
-->
<template>
  <el-drawer v-model="isVisible" title="尺寸配置" :size="500" @opened="opened">
    <template #default>
      <el-form
        ref="formEl" status-icon :model="form" :rules="rules" label-position="top"
        label-width="100px">
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="form.productName" />
        </el-form-item>
        <el-form-item label="产品类名" prop="productType">
          <el-input v-model="form.productType" />
        </el-form-item>
        <el-form-item label="背景" prop="background">
          <el-checkbox-group v-model="form.background">
            <el-checkbox v-for="item in background" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
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
  },
  background: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits({
  'update:visible': null,
  confirm: null
})

const isVisible = useVModel(props, 'visible', emits)

const formEl = ref(null)
const form = ref({
  name: '',
  width: 500,
  height: 600
})

const rules = ref({
  productType: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  background: [
    {
      type: 'array',
      required: true,
      message: '至少选择一个背景',
      trigger: 'change'
    }
  ]
})

const opened = () => {
  if (props.data) {
    form.value = { ...toRaw(props.data) }
  } else {
    form.value = {
      name: '',
      width: 500,
      height: 600
    }
  }
}

// 确定
const handleConfirm = async () => {
  if (!formEl.value) return
  await formEl.value.validate((valid, fields) => {
    if (valid) {
      emits('confirm', { ...form.value })
      isVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="scss" scoped>
</style>
