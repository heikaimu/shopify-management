<!--
 * @Date: 2022-06-27 08:57:35
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 09:52:10
 * @FilePath: /shopify-management/src/pages/picture-puzzle/tab-size/TabSize.vue
-->
<template>
  <div class="size-table">
    <TabSizeList :list="list" @edit="editCard" @delete="deleteCard" />
    <ButtonCircleFixed @click="handleAdd" />
    <TabSizeEdit v-model:visible="visible" :data="editItem" @confirm="handleConfirm" />
  </div>
</template>

<script setup>
import TabSizeList from './TabSizeList.vue'
import TabSizeEdit from './TabSizeEdit.vue'
import ButtonCircleFixed from 'comp/ButtonCircleFixed.vue'
import { ref, watchEffect } from 'vue'
import { getRandomID } from '@/common/utils/util'

const props = defineProps({
  config: {
    type: Object,
    default: () => {}
  }
})

const list = ref([])

watchEffect(() => {
  list.value = props.config.size
})

// 删除卡片
const deleteCard = (item, index) => {
  list.value.splice(index, 1)
}

// 编辑
const visible = ref(false)
const editItem = ref(null)

const handleAdd = () => {
  editItem.value = null
  visible.value = true
}

const editCard = (item, index) => {
  editItem.value = item
  visible.value = true
}

const handleConfirm = (data) => {
  const { id } = data
  if (id && editItem.value) {
    editItem.value = Object.assign(editItem.value, data)
  } else {
    list.value.push({
      ...data,
      id: getRandomID()
    })
    console.log(list.value)
  }
}
</script>

<style lang="scss" scoped>
.size-table {
  width: 800px;
  margin: 20px auto;
}
</style>
