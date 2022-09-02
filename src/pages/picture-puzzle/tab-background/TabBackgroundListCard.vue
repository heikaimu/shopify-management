<!--
 * @Date: 2022-06-21 13:50:03
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 14:38:41
 * @FilePath: /shopify-management/src/pages/picture-puzzle/tab-background/TabBackgroundListCard.vue
-->
<template>
  <el-card :body-style="{ padding: '0px' }">
    <div v-loading="loading" class="image" :style="cardStyle">
      <img v-if="cover" :src="cover">
    </div>
    <div style="padding: 14px">
      <h2 class="title">{{ data.name || '无标题' }}</h2>
      <div class="tags">
        <el-tag v-for="item in data.list" :key="item.size">{{ sizeLabel(item.size) }}({{ item.images.length }})</el-tag>
      </div>
      <div class="bottom">
        <el-button text class="button" @click="handleEdit">编辑</el-button>
        <el-divider direction="vertical" />
        <el-button text class="button" @click="handleDelete">删除</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed, inject, ref, watchEffect } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  data: {
    type: [Object, Number],
    default: () => { }
  },
  index: {
    type: Number,
    default: -1
  }
})

const emits = defineEmits({
  delete: null,
  edit: null
})

const size = inject('size')
const sizeLabel = computed(() => {
  return (id) => {
    const curSize = size.value.find(item => item.id === id)
    return curSize ? curSize.name : id
  }
})

const loading = ref(false)
const cover = ref('')

watchEffect(() => {
  cover.value = props.data.list[0].images[0].url
})

const cardStyle = computed(() => {
  return {
    backgroundColor: props.data.list[0].images[0].color
  }
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
  emits('edit', props.data, props.index)
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

.title {
  font-size: 16px;
  color: #333333;
  margin: 0;
}

.tags {
  padding-top: 8px;

  &>* {
    margin-right: 5px;
  }
}

.bottom {
  padding-top: 10px;
  text-align: center;
}
</style>
