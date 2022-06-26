<!--
 * @Date: 2022-06-21 11:09:05
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 15:19:08
 * @FilePath: /shopify-management/src/components/TabComposing.vue
-->
<template>
  <TabComposingList :list="list" @edit="editCard" @delete="deleteCard" />
  <ButtonCircleFixed @click="handleAdd" />
  <TabComposingEdit v-if="visible" v-model:visible="visible" :data="editItem" @confirm="handleConfirmCard" />
</template>

<script setup>
import { ref } from 'vue'
import TabComposingList from './TabComposingList.vue'
import TabComposingEdit from './TabComposingEdit.vue'
import ButtonCircleFixed from 'comp/ButtonCircleFixed.vue'
import { getRandomID } from '@/common/utils/util'

const list = ref([])

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

.picture-puzzle {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__header {
    flex: none;
    padding: 0 20px;
    border-bottom: 1px solid $color-grey-light-2;
    box-shadow: 0 0 14px $color-grey-light-1;
  }

  &__content {
    flex: 1;
    overflow: hidden;
    background-color: $color-grey-light-1;
  }

  &__footer {
    flex: none;
    padding: 10px 20px;
    border-top: 1px solid $color-grey-light-2;
    box-shadow: 0 0 14px $color-grey-light-1;
    display: flex;
    justify-content: space-between;
  }

  &__heading {
    font-size: 20px;
    color: $color-black;
  }

}
</style>
