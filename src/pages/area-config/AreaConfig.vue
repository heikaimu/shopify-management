<!--
 * @Date: 2022-08-18 10:22:07
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-19 15:28:56
 * @FilePath: /shopify-management/src/pages/area-config/AreaConfig.vue
-->
<template>
  <div class="area-config">
    <div class="area-config__content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="area" label="地区" />
        <el-table-column prop="date1" label="发货时间" />
        <el-table-column prop="date2" label="到达时间" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleEdit">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <ButtonCircleFixed @click="handleAdd" @confirm="handleConfirm" />
    </div>
    <div class="area-config__footer">
      <div class="footer__left">
        <label for="file" class="el-button el-button--primary">
          导入配置文件
          <input id="file" type="file" style="display:none" @change="handleImport">
        </label>
        <el-button type="primary" @click="handleExport">导出配置</el-button>
      </div>
    </div>

    <AreaConfigEdit v-model:visible="editVisible" :data="editData" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AreaConfigEdit from './AreaConfigEdit.vue'
import ButtonCircleFixed from 'comp/ButtonCircleFixed.vue'

const config = ref({})

const tableData = ref([
  {
    area: '中华人民共和国',
    date1: '2016-05-03',
    date2: '2016-05-03'
  },
  {
    area: '日本',
    date1: '2016-05-03',
    date2: '2016-05-03'
  },
  {
    area: '韩国',
    date1: '2016-05-03',
    date2: '2016-05-03'
  }
])

const editVisible = ref(false)
const editData = ref(null)

// 添加
function handleAdd () {
  editVisible.value = true
  editData.value = null
}

// 编辑
function handleEdit (item) {
  editVisible.value = true
  editData.value = item
}

// 保存编辑
function handleConfirm (data, type) {
  console.log(data, type)
}

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
.area-config {
  height: calc(100% - 55px);
  overflow-y: auto;

  &__content {}

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
}
</style>
