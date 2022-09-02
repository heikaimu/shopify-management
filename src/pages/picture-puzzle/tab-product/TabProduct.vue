<!--
 * @Date: 2022-06-27 08:57:35
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 09:52:10
 * @FilePath: /shopify-management/src/pages/picture-puzzle/tab-product/TabProduct.vue
-->
<template>
  <div class="product-table">
    <TabProductList :list="list" @edit="editCard" @delete="deleteCard" />
    <ButtonCircleFixed @click="handleAdd" />
    <TabProductEdit v-model:visible="visible" :data="editItem" :background="background" @confirm="handleConfirm" />
  </div>
</template>

<script setup>
import TabProductList from './TabProductList.vue'
import TabProductEdit from './TabProductEdit.vue'
import ButtonCircleFixed from 'comp/ButtonCircleFixed.vue'
import { ref, watchEffect } from 'vue'
import { getRandomID } from '@/common/utils/util'

const props = defineProps({
  config: {
    type: Object,
    default: () => { }
  }
})

const list = ref([])
const background = ref([])

watchEffect(() => {
  list.value = props.config.product
  background.value = props.config.background.map(item => {
    return {
      name: item.name,
      id: item.id
    }
  })
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
.product-table {
  margin: 20px auto;
}
</style>
