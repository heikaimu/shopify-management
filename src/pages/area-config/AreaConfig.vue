<!--
 * @Date: 2022-08-18 10:22:07
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-19 15:28:56
 * @FilePath: /shopify-management/src/pages/area-config/AreaConfig.vue
-->
<template>
  <div class="area-config">
    <div class="area-config__content">
      <el-table :data="config.country" border style="width: 100%">
        <el-table-column prop="area" label="地区" />
        <el-table-column label="时间范围">
          <template #default="scope">
            <span v-for="(item, index) in scope.row.date" :key="index">
              {{ item.label }}:
              <b>{{ item.min }}-{{ item.max }}天</b>
              <el-divider direction="vertical" />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <ButtonCircleFixed @click="handleAdd" />
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

    <AreaConfigEdit v-model:visible="editVisible" :data="editData" @confirm="handleConfirm" />
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import AreaConfigEdit from './AreaConfigEdit.vue'
import ButtonCircleFixed from 'comp/ButtonCircleFixed.vue'

const config = ref({
  country: [
    {
      area: '中华人民共和国',
      date: [
        {
          label: '普通',
          min: 3,
          max: 5
        },
        {
          label: '正常',
          min: 2,
          max: 6
        },
        {
          label: '特快',
          min: 2,
          max: 6
        }
      ]
    },
    {
      area: '日本',
      date: [
        {
          label: '普通',
          min: 3,
          max: 5
        },
        {
          label: '正常',
          min: 2,
          max: 6
        },
        {
          label: '特快',
          min: 2,
          max: 6
        }
      ]
    },
    {
      area: '美国',
      date: [
        {
          label: '普通',
          min: 3,
          max: 5
        },
        {
          label: '正常',
          min: 2,
          max: 6
        },
        {
          label: '特快',
          min: 2,
          max: 6
        }
      ]
    }
  ]
})

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
  if (type === 'add') {
    config.value.country.push(data)
  } else {
    editData.value.name = data.name
    editData.value.date = JSON.parse(JSON.stringify(data.date))
  }
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
    config.value = data
  }
}

// 导出
const handleExport = () => {
  const link = document.createElement('a')
  link.download = '地区配置.json'
  link.style.display = 'none'
  const json = JSON.stringify(config.value)
  const blob = new Blob([json])
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const tag = 'ptime-2-5'
const country = '日本'
function getDateInfo () {
  const list = toRaw(config.value.country)
  const curCountry = list.find(item => item.area === country)
  const timeReg = /ptime-(\d)-(\d)/
  const timeRes = tag.match(timeReg)
  if (timeRes) {
    const finalData = {
      area: curCountry.area,
      date: curCountry.date.map(item => {
        const { min, max, label } = item
        return {
          label,
          // eslint-disable-next-line no-undef
          start: dayjs(dayjs().add(Number(min) + Number(timeRes[1]), 'day')).format('DD/MM/YYYY'),
          // eslint-disable-next-line no-undef
          end: dayjs(dayjs().add(Number(max) + Number(timeRes[2]), 'day')).format('DD/MM/YYYY')
        }
      })
    }
    console.log(finalData)
  }
}

getDateInfo()
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
