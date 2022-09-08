<!--
 * @Date: 2022-06-21 14:47:46
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-19 15:29:54
 * @FilePath: /shopify-management/src/pages/area-config/AreaConfigEdit.vue
-->
<template>
  <el-drawer v-model="isVisible" :title="title" :size="500" @opened="opened">
    <template #default>
      <el-form
        ref="formEl" status-icon :model="form" :rules="rules" label-position="top"
        label-width="100px">
        <el-form-item label="名称" prop="area">
          <el-input v-model="form.area" />
        </el-form-item>
        <el-form-item label="时间范围">
          <el-row v-for="(item, index) in form.date" :key="index" :gutter="20">
            <el-col :span="10">
              <el-form-item label="物流类型" :prop="`date[${index}].label`" :rules="rules.label">
                <el-input v-model="item.label" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="最小天数" :prop="`date[${index}].min`" :rules="rules.min">
                <el-input v-model="item.min" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="最大天数" :prop="`date[${index}].max`" :rules="rules.max">
                <el-input v-model="item.max" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="操作">
                <el-button type="danger" @click="handleRemove()">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddDate">添加日期</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <el-button type="primary" @click="handleConfirm">confirm</el-button>
    </template>
  </el-drawer>
</template>

<script setup>
import { computed, ref, toRaw } from 'vue'
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
  area: '',
  date: []
})
const actionType = ref('add')

const title = computed(() => {
  const map = {
    add: '新增国家',
    edit: '编辑国家'
  }
  return map[actionType.value]
})

const rules = ref({
  name: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  label: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  min: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  max: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ]
})

const opened = () => {
  if (props.data) {
    form.value = { ...toRaw(props.data) }
    actionType.value = 'edit'
  } else {
    form.value = {
      area: '',
      date: []
    }

    actionType.value = 'add'
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

const handleAddDate = () => {
  form.value.date.push({
    label: '普通',
    min: 3,
    max: 5
  })
}

</script>

<style lang="scss" scoped>
.mt-10 {
  margin-top: 10px;
}
</style>
