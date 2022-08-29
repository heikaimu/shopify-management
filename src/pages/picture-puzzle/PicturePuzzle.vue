<!--
 * @Date: 2022-06-21 11:09:05
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-18 14:18:11
 * @FilePath: /shopify-management/src/pages/picture-puzzle/PicturePuzzle.vue
-->
<template>
  <div class="picture-puzzle">
    <div class="picture-puzzle__content">
      <el-tabs tab-position="left" class="tab-wrapper">
        <el-tab-pane label="背景" class="tab-pane">
          <TabBackground :config="config" />
        </el-tab-pane>
        <el-tab-pane label="排版" class="tab-pane">
          <TabComposing :config="config" />
        </el-tab-pane>
        <el-tab-pane label="尺寸" class="tab-pane">
          <TabSize :config="config" />
        </el-tab-pane>
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
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue'
import TabBackground from './tab-background/TabBackground.vue'
import TabComposing from './tab-composing/TabComposing.vue'
import TabSize from './tab-size/TabSize.vue'

const config = ref({
  background: [],
  composing: [],
  size: []
})

const size = computed(() => {
  return config.value.size
})
provide('size', size)

const composing = computed(() => {
  return config.value.composing
})
provide('composing', composing)

// 导入
const handleImport = (e) => {
  const file = e.target.files[0]
  if (!file) {
    return
  }

  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result)
    config.value.size = data.size
    config.value.composing = data.composing
    config.value.size = data.size
    config.value.background = data.background
  }
}

// 导出
const handleExport = () => {
  const link = document.createElement('a')
  link.download = '配置.json'
  link.style.display = 'none'
  const json = JSON.stringify(config.value)
  const blob = new Blob([json])
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

</script>

<style lang="scss" scoped>
@import "sass/variables";

.picture-puzzle {
  height: calc(100% - 55px);
  overflow-y: auto;

  &__content {
  }

  &__footer {
    padding: 10px 20px;
    border-top: 1px solid $color-grey-light-2;
    box-shadow: 0 0 14px $color-grey-light-1;
    background-color: $color-white;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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
