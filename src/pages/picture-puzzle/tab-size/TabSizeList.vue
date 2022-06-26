<template>
  <el-table :data="list">
    <el-table-column prop="name" label="尺寸名称" />
    <el-table-column prop="width" label="宽度" />
    <el-table-column prop="height" label="高度" />
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
