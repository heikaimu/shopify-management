<!--
 * @Date: 2022-06-21 11:09:05
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 17:09:44
 * @FilePath: /shopify-management/src/pages/picture-puzzle/PicturePuzzle.vue
-->
<template>
  <div class="picture-puzzle">
    <div class="picture-puzzle__header">
      <h2 class="picture-puzzle__heading">Plugin Config</h2>
    </div>
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
import { ref, provide } from 'vue'
import TabBackground from './tab-background/TabBackground.vue'
import TabComposing from './tab-composing/TabComposing.vue'
import TabSize from './tab-size/TabSize.vue'

const config = ref({
  background: [
    {
      id: 'dwadaw',
      name: 'background name',
      tag: 'test tag',
      images: [
        {
          url: 'https://cdn.shopifycdn.net/s/files/1/0343/0275/4948/files/2_48f88b4b-e0f2-41b3-91c5-933da593b129.jpg?v=1654594018',
          size: 'dwada1'
        },
        {
          url: 'https://cdn.shopifycdn.net/s/files/1/0343/0275/4948/files/2_48f88b4b-e0f2-41b3-91c5-933da593b129.jpg?v=1654594018',
          size: 'dwada2'
        },
        {
          url: 'https://cdn.shopifycdn.net/s/files/1/0343/0275/4948/files/2_48f88b4b-e0f2-41b3-91c5-933da593b129.jpg?v=1654594018',
          size: 'dwada3'
        }
      ]
    }
  ],
  composing: [],
  size: [
    {
      id: '121xsda',
      name: 'blanket size 1',
      width: 500,
      height: 500
    },
    {
      id: '121xsddaa',
      name: 'blanket size 2',
      width: 400,
      height: 700
    }
  ]
})

provide('size', config.value.size)
provide('composing', config.value.composing)

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

</script>

<style lang="scss" scoped>
@import "sass/variables";

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
