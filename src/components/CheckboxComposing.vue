<!--
 * @Date: 2022-06-27 08:57:35
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 10:41:25
 * @FilePath: /shopify-management/src/components/CheckboxComposing.vue
-->
<template>
  <el-checkbox-group v-model="selectValue" placeholder="请选择" @change="handleChange">
    <el-checkbox
      v-for="item in options"
      :key="item.id"
      :label="item.id"
    >
      {{ item.name }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup>
import { computed, inject, nextTick } from 'vue'
import { useVModel } from '@vueuse/core'
const props = defineProps({
  value: {
    type: Array
  },
  imageSize: {
    type: String
  }
})

const emits = defineEmits({
  'update:value': null,
  change: null
})

const selectValue = useVModel(props, 'value', emits)

const composing = inject('composing')

const options = computed(() => {
  if (!props.imageSize) {
    return []
  } else {
    return composing.value.filter(item => item.size === props.imageSize)
  }
})

const handleChange = () => {
  nextTick(() => {
    const curComposing = options.value.find(item => item.id === selectValue.value)
    if (curComposing) {
      emits('change', curComposing)
    }
  })
}
</script>

<style lang="scss" scoped>

</style>
