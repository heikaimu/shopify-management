<!--
 * @Date: 2022-06-21 13:50:03
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 13:57:34
 * @FilePath: /shopify-management/src/components/PicturePuzzleCard.vue
-->
<template>
  <el-card :body-style="{ padding: '0px' }">
    <div v-loading="loading" class="image">
      <img :src="url">
    </div>
    <div style="padding: 14px">
      <span>{{ data.name || '无标题' }}</span>
      <div class="bottom">
        <el-button text class="button" @click="handleEdit">编辑</el-button>
        <el-divider direction="vertical" />
        <el-button text class="button" @click="handleDelete">删除</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Renderer from 'fabric-renderer'

const props = defineProps({
  data: {
    type: [Object, Number],
    default: () => { }
  }
})

const emits = defineEmits({
  delete: null,
  edit: null
})

const loading = ref(false)
const url = ref('')
const generateURL = () => {
  const renderer = new Renderer('canvas', {
    width: props.data.width,
    height: props.data.height,
    scale: 1,
    completeCustom: true,
    backgroundColor: '#f2f2f2'
  })

  loading.value = true
  renderer.loadFromJSON(props.data.json, (instance, object) => { }, () => {
    url.value = renderer.toDataURL(1)
    loading.value = false
  })
}

watch(props.data, () => {
  generateURL()
}, {
  immediate: true
})

const handleDelete = () => {
  ElMessageBox.confirm(
    '是否确定删除？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    }
  )
    .then(() => {
      emits('delete')
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

const handleEdit = () => {
  emits('edit')
}
</script>

<style lang="scss" scoped>
@import "sass/variables";
@import "sass/mixins";

.image {
  width: 300px;
  height: 350px;
  background-color: $color-black;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.bottom {
  padding-top: 10px;
  text-align: center;
}
</style>
