<template>
  <el-scrollbar height="100%">
    <transition-group name="list-complete" tag="ul" class="composing__list">
      <li v-for="(item, index) in list" :key="item" class="composing__item">
        <TabComposingListCard :data="item" @edit="handleEdit(item, index)" @delete="handleDelete(item, index)" />
      </li>
    </transition-group>
  </el-scrollbar>
</template>

<script setup>
import TabComposingListCard from './TabComposingListCard.vue'

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
.composing {
  &__list {
    list-style: none;
    padding: 20px;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    margin: 10px;
    transition: all 0.8s ease;
  }
}
</style>
