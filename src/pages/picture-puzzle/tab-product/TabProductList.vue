<template>
  <el-table :data="list" border>
    <el-table-column prop="productName" label="产品名称" width="200" />
    <el-table-column prop="productType" label="产品类名" width="200" />
    <el-table-column prop="background" label="所选背景" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
        <el-button link type="danger" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits({
  edit: null
})

const handleEdit = (item, index) => {
  emits('edit', item, index)
}

const handleDelete = (item, index) => {
  emits('delete', item, index)
}
</script>

<style lang="scss" scoped>

</style>
