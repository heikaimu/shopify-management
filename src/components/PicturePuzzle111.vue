<!--
 * @Date: 2022-06-21 11:09:05
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 16:38:28
 * @FilePath: /shopify-management/src/components/PicturePuzzle.vue
-->
<template>
  <div class="picture-puzzle">
    <div class="picture-puzzle__header">
      <h2 class="picture-puzzle__heading">Plugin Config</h2>
    </div>
    <div class="picture-puzzle__content">
      <el-tabs tab-position="left" class="tab-wrapper">
        <el-tab-pane label="用户管理" class="tab-pane">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" class="tab-pane">配置管理</el-tab-pane>
      </el-tabs>
    </div>
    <div class="picture-puzzle__footer">
      <div class="footer__left">
        <label for="file" class="el-button el-button--warning">
          导入配置文件
          <input id="file" type="file" style="display:none" @change="handleImport">
        </label>
        <el-button type="warning" @click="handleExport">导出配置</el-button>
      </div>

      <el-button type="primary" :icon="Plus" @click="handleAddCard">添加新配置</el-button>
    </div>
  </div>

  <PicturePuzzleEdit v-if="visible" v-model:visible="visible" :data="editItem" @confirm="handleConfirmCard" />
</template>

<script setup>
import { ref } from 'vue'
import PicturePuzzleEdit from './PicturePuzzleEdit.vue'
import { Plus } from '@element-plus/icons-vue'

// 编辑
const visible = ref(false)
const editItem = ref(null)

// 导入
const handleImport = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = (e) => {
    // const res = e.target.result
  }
}

// 导出
const handleExport = () => {
  const link = document.createElement('a')
  link.download = '配置.json'
  link.style.display = 'none'
  const json = JSON.stringify({
  })
  const blob = new Blob([json])
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 临时缓存
// const cacheConfig = () => {

// }
</script>

<style lang="scss" scoped>
@import "../common/sass/variables";

.picture-puzzle {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__header {
    flex: none;
    padding: 0 20px;
    border-bottom: 1px solid $color-grey-light-2;
    box-shadow: 0 0 14px $color-grey-light-1;
  }

  &__content {
    flex: 1;
    overflow: hidden;
    background-color: $color-grey-light-1;
  }

  &__footer {
    flex: none;
    padding: 10px 20px;
    border-top: 1px solid $color-grey-light-2;
    box-shadow: 0 0 14px $color-grey-light-1;
    display: flex;
    justify-content: space-between;
  }

  &__heading {
    font-size: 20px;
    color: $color-black;
  }

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
