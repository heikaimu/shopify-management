<!--
 * @Date: 2022-06-24 17:06:12
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 17:31:37
 * @FilePath: /shopify-management/src/pages/picture-puzzle/tab-background/TabBackground.vue
-->
<template>
  <div class="background">
    <TabBackgroundList :list="list" @edit="editCard(item, index)" @delete="deleteCard(item, index)" />
    <el-button class="fixed-button" type="success" :icon="Plus" circle />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import TabBackgroundList from './TabBackgroundList.vue'

const list = ref([1, 2, 3])

// 删除卡片
const deleteCard = (item, index) => {
  list.value.splice(index, 1)
}

// 编辑
const visible = ref(false)
const editItem = ref(null)

const editCard = (item, index) => {
  editItem.value = item
  visible.value = true
}

// // 新增
// const handleAddCard = () => {
//   editItem.value = null
//   visible.value = true
// }

// // 保存卡片
// const handleConfirmCard = (data) => {
//   const { id } = data
//   if (!id) {
//     // 新增
//     list.value.push({
//       ...data,
//       id: getRandomID()
//     })
//   } else {
//     // 编辑
//     editItem.value = Object.assign(editItem.value, data)
//   }
// }
</script>

<style lang="scss" scoped>
.background {
  height: 100%;
}

.fixed-button {
  position: fixed;
  right: 20px;
  top: 80px;
}
</style>
