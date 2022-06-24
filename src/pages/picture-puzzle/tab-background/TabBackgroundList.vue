<!--
 * @Date: 2022-06-24 17:06:12
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 17:25:53
 * @FilePath: /shopify-management/src/pages/picture-puzzle/tab-background/TabBackgroundList.vue
-->
<template>
  <transition-group name="list-complete" tag="ul" class="background__list">
    <li v-for="(item, index) in list" :key="item" class="background__item">
      <TabBackgroundListCard :data="item" :index="index" v-bind="$attrs" />
    </li>
  </transition-group>
</template>

<script setup>
import TabBackgroundListCard from './TabBackgroundListCard.vue'

defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.background {
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
