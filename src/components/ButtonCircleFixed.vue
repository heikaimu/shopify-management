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
  right: 20px;
  top: 80px;
}
</style>
