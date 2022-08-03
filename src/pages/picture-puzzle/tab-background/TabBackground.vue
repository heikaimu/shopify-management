<!--
 * @Date: 2022-06-24 17:06:12
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 09:59:11
 * @FilePath: /shopify-management/src/pages/picture-puzzle/tab-background/TabBackground.vue
-->
<template>
  <div class="background">
    <TabBackgroundList :list="list" @edit="editCard" @delete="deleteCard" />
    <ButtonCircleFixed @click="handleAdd" />
    <TabBackgroundEdit v-model:visible="visible" :data="editItem" @confirm="handleConfirm" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import TabBackgroundList from './TabBackgroundList.vue'
import TabBackgroundEdit from './TabBackgroundEdit.vue'
import ButtonCircleFixed from 'comp/ButtonCircleFixed.vue'
import { getRandomID } from '@/common/utils/util'

const props = defineProps({
  config: {
    type: Object,
    default: () => {}
  }
})

const list = ref([])

watchEffect(() => {
  list.value = props.config.background
})

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

// 新增
const handleAdd = () => {
  editItem.value = null
  visible.value = true
}

// 保存卡片
const handleConfirm = (data) => {
  console.log(data)
  const { id } = data
  if (id) {
    editItem.value = Object.assign(editItem.value, data)
  } else {
    list.value.push({
      ...data,
      id: getRandomID()
    })
  }
}
</script>

<style lang="scss" scoped>
.background {
  height: 100%;
}
</style>
