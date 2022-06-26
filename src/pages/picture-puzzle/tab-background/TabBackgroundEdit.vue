<!--
 * @Date: 2022-06-21 14:47:46
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 15:02:48
 * @FilePath: /shopify-management/src/components/PicturePuzzleEdit.vue
-->
<template>
  <el-drawer v-model="isVisible" title="背景配置" :size="1000" @opened="opened">
    <template #default>
      <el-form
        ref="formEl" status-icon :model="form" :rules="rules" label-position="top"
        label-width="100px">
        <el-divider content-position="left">基础信息</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签" prop="name">
              <el-input v-model="form.tag" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">图片列表</el-divider>

        <el-form-item label="图片列表" prop="images" />
        <el-card v-for="(item, index) in form.images" :key="index" class="box-card" shadow="hover">
          <template #header>
            <div class="box-card__header">
              <span>尺寸#{{ index+1 }}</span>
              <el-button type="danger" @click="handleDelete(index)">删除</el-button>
            </div>
          </template>
          <el-row :span="24" :gutter="20">
            <el-col :span="18">
              <el-form-item label="图片地址" :prop="`images[${index}].url`" :rules="rules.url">
                <el-input v-model="item.url" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="尺寸" :prop="`images[${index}].size`" :rules="rules.url">
                <SelectorSize v-model:value="item.size" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>

        <el-button type="primary" :icon="Plus" @click="handleAdd">添加图片</el-button>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="handleConfirm">confirm</el-button>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, toRaw } from 'vue'
// import { ElMessage, ElMessageBox } from 'element-plus'\
import SelectorSize from 'comp/SelectorSize.vue'
import { Plus } from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'

// 这是分割线，主体业务
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => { }
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
  tag: '',
  images: []
})

const rules = ref({
  name: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  tag: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  images: [
    {
      type: 'array',
      required: true,
      message: '至少有一张图片',
      trigger: 'change'
    }
  ],
  url: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  size: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ]
})

const opened = () => {
  if (props.data) {
    form.value = JSON.parse(JSON.stringify(toRaw(props.data)))
  }
}

// 添加
const handleAdd = () => {
  form.value.images.push({
    url: '',
    size: ''
  })
}

// 删除
const handleDelete = (index) => {
  form.value.images.splice(index, 1)
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
.box-card {
  &:not(&:last-child) {
    margin-bottom: 20px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
