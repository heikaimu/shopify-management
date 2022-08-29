<!--
 * @Date: 2022-06-21 10:57:35
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-18 14:16:53
 * @FilePath: /shopify-management/src/App.vue
-->
<template>
  <div class="web">
    <div class="web__header">
      <WebHeader />
    </div>
    <div class="web__main">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import WebHeader from './components/WebHeader.vue'
</script>

<style lang="scss" scoped>
.web {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    flex: none;
  }

  &__main {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
