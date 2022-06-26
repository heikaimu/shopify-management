<template>
  <el-select v-model="selectValue" placeholder="请选择" @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script setup>
import { inject, nextTick } from 'vue'
import { useVModel } from '@vueuse/core'
const props = defineProps({
  value: {
    type: String
  }
})

const emits = defineEmits({
  'update:value': null,
  change: null
})

const selectValue = useVModel(props, 'value', emits)

const options = inject('size')

const handleChange = () => {
  nextTick(() => {
    const curSize = options.find(item => item.id === selectValue.value)
    if (curSize) {
      emits('change', curSize)
    }
  })
}
</script>

<style lang="scss" scoped>

</style>
