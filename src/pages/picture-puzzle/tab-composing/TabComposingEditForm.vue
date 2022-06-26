<!--
 * @Date: 2022-06-22 14:26:59
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 11:29:07
 * @FilePath: /shopify-management/src/components/PicturePuzzleForm.vue
-->
<template>
  <div class="custom-form">
    <div class="custom-form__item">
      <el-divider content-position="left">锁定</el-divider>
      <el-switch
        v-model="form.selectable" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        active-text="活动" inactive-text="锁定" @change="handleChangeForm" />
    </div>

    <!-- 文字独有 -->
    <div v-if="['text'].includes(form.type)" class="custom-form__item">
      <el-divider content-position="left">文字</el-divider>
      <el-input v-model="form.text" @input="handleChangeForm" />
    </div>

    <div v-if="['text', 'rect'].includes(form.type)" class="custom-form__item">
      <el-divider content-position="left">色彩</el-divider>
      <el-radio-group v-model="form.fill" @change="handleChangeForm">
        <el-radio v-for="item in colorsList" :key="item.label" :label="item.value" size="large">
          {{
            item.label
          }}
        </el-radio>
      </el-radio-group>
    </div>

    <div class="custom-form__item">
      <el-divider content-position="left">移动</el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="X轴">
            <el-input-number v-model="form.left" label="Left" @change="handleChangeForm" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Y轴">
            <el-input-number v-model="form.top" label="Top" @change="handleChangeForm" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="custom-form__item">
      <el-divider content-position="left">缩放</el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="X轴">
            <el-input-number v-model="form.scaleX" label="X" :step="0.01" @change="handleChangeForm" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Y轴">
            <el-input-number v-model="form.scaleY" label="Y" :step="0.01" @change="handleChangeForm" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="custom-form__item">
      <el-divider content-position="left">旋转</el-divider>
      <div>
        <el-slider v-model="form.angle" show-input :min="0" :max="360" @change="handleRotate" />
      </div>
    </div>
    <div class="custom-form__item">
      <el-divider content-position="left">层级</el-divider>
      <el-button type="primary" plain @click="handleOrder('bringForward')">上层</el-button>
      <el-button type="primary" plain @click="handleOrder('sendBackwards')">下层</el-button>
      <el-button type="primary" plain @click="handleOrder('bringToFront')">顶层</el-button>
      <el-button type="primary" plain @click="handleOrder('sendToBack')">底层</el-button>
    </div>
    <div class="custom-form__item">
      <el-divider content-position="left">X 中轴</el-divider>
      <el-radio-group v-model="form.originX" class="ml-4" @change="handleChangeForm">
        <el-radio v-for="item in originXList" :key="item.label" :label="item.value" size="large">
          {{
            item.label
          }}
        </el-radio>
      </el-radio-group>
    </div>
    <!-- <div class="custom-form__item">
      <el-divider content-position="left">Y 中轴</el-divider>
      <el-radio-group v-model="form.originY" class="ml-4" @change="handleChangeForm">
        <el-radio v-for="item in originYList" :key="item.label" :label="item.value" size="large">
          {{
            item.label
          }}
        </el-radio>
      </el-radio-group>
    </div> -->
    <!-- <div class="custom-form__item">
      <el-divider content-position="left">图层叠加</el-divider>
      <el-radio-group v-model="form.globalCompositeOperation" class="ml-4" @change="handleChangeForm">
        <el-radio v-for="item in globalCompositeOperationOptions" :key="item.label" :label="item.value" size="large">
          {{
            item.label
          }}
        </el-radio>
      </el-radio-group>
    </div> -->
  </div>
</template>

<script setup>
import { ref, watch, toRaw, nextTick } from 'vue'
import {
  // globalCompositeOperation,
  originX,
  // originY,
  colors
} from '@/config'

const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  }
})

const emits = defineEmits({
  order: null,
  changeForm: null,
  rotate: null
})

const form = ref({
  originX: '',
  originY: '',
  selectable: true,
  globalCompositeOperation: ''
})

watch(props.data, (val) => {
  form.value = toRaw(val)
}, {
  immediate: true
})

// const globalCompositeOperationOptions = ref(globalCompositeOperation)
const originXList = ref(originX)
// const originYList = ref(originY)
const colorsList = ref(colors)

const handleOrder = (action) => {
  emits('order', action)
}

const handleChangeForm = () => {
  nextTick(() => {
    emits('changeForm', form.value)
  })
}

const handleRotate = () => {
  nextTick(() => {
    emits('rotate', form.value.angle)
  })
}
</script>

<style lang="scss" scoped>
</style>
