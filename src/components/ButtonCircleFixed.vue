<!--
 * @Date: 2022-06-27 08:57:35
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-18 14:41:45
 * @FilePath: /shopify-management/src/components/ButtonCircleFixed.vue
-->
<template>
  <el-button class="fixed-button" type="success" :icon="Plus" circle @click="handleClick" />
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'

const emits = defineEmits({
  click: null
})

const handleClick = () => {
  emits('click')
}
</script>

<style lang="scss" scoped>
.fixed-button {
  position: fixed;
  z-index: 9999;
  right: 20px;
  top: 80px;
}
</style>
