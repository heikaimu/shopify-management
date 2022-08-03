<!--
 * @Date: 2022-06-21 11:09:05
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 09:53:01
 * @FilePath: /shopify-management/src/pages/picture-puzzle/tab-composing/TabComposing.vue
-->
<template>
  <div class="composing">
    <TabComposingList :list="list" @edit="editCard" @delete="deleteCard" />
    <ButtonCircleFixed @click="handleAdd" />
    <TabComposingEdit v-if="visible" v-model:visible="visible" :data="editItem" @confirm="handleConfirmCard" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import TabComposingList from './TabComposingList.vue'
import TabComposingEdit from './TabComposingEdit.vue'
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
  list.value = props.config.composing
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
const handleConfirmCard = (data) => {
  const { id } = data
  if (!id) {
    // 新增
    list.value.push({
      ...data,
      id: getRandomID()
    })
  } else {
    // 编辑
    editItem.value = Object.assign(editItem.value, data)
  }
}
</script>

<style lang="scss" scoped>
@import "sass/variables";
.composing {
  height: 100%;
}
</style>
