<!--
 * @Date: 2022-08-18 13:57:02
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-19 13:50:30
 * @FilePath: /shopify-management/src/components/WebHeader.vue
-->
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    @select="handleSelect"
  >
    <el-menu-item index="pluginConfig">插件配置</el-menu-item>
    <el-menu-item index="areaConfig">地区配置</el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const activeIndex = ref('')
const handleSelect = (key, keyPath) => {
  // console.log(key, keyPath)
}

const route = useRoute()
watch(route, (val) => {
  if (val.fullPath !== '/') {
    const curPath = route.fullPath.replace('/', '')
    activeIndex.value = curPath
  }
})

</script>

<style lang="scss" scoped>

</style>
