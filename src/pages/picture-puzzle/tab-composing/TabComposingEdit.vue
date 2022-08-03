<!--
 * @Date: 2022-06-21 14:47:46
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-07-06 15:37:31
 * @FilePath: /shopify-management/src/pages/picture-puzzle/tab-composing/TabComposingEdit.vue
-->
<template>
  <el-drawer v-model="isVisible" title="插件配置" :size="1000" @opened="opened">
    <template #default>
      <div class="custom-board">
        <div class="custom-board__left">
          <el-form
            ref="formEl" status-icon :model="form" :rules="rules" label-position="top"
            label-width="100px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="form.name" />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="标签" prop="tag">
                  <el-input v-model="form.tag" />
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="尺寸" prop="size">
                  <SelectorSize v-model:value="form.size" style="width:100%" @change="handleChangeSize" />
                </el-form-item>
              </el-col>
              <!-- <el-col v-show="form.size" :span="7">
                <el-form-item label="宽度" prop="width">
                  <el-input v-model="form.width" disabled />
                </el-form-item>
              </el-col>
              <el-col v-show="form.size" :span="7">
                <el-form-item label="高度" prop="height">
                  <el-input v-model="form.height" disabled />
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>

          <div class="custom-board__canvas-box">
            <div class="custom-board__canvas">
              <canvas id="customCanvas" />
            </div>
          </div>
        </div>
        <div class="custom-board__right">
          <TabComposingEditForm
            v-if="hasActiveObject" :data="objForm" :has-active-object="hasActiveObject"
            @order="handleOrder" @change="handleChangeForm" @rotate="handleChangeAngle" @delete="handleDeleteObject" />
          <p v-else class="custom-board__empty-text">请选选择一个图层</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="drawer-buttons">
        <div>
          <el-button type="warning" :icon="Plus" @click="handleAddBg">背景</el-button>
          <el-button type="warning" :icon="Plus" @click="handleAddRect">矩形</el-button>
          <el-button type="warning" :icon="Plus" @click="handleAddText">文字</el-button>
        </div>
        <div>
          <el-button type="primary" @click="handleConfirm">confirm</el-button>
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { nextTick, ref, shallowRef, toRaw } from 'vue'
import TabComposingEditForm from './TabComposingEditForm.vue'
import SelectorSize from 'comp/SelectorSize.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'
import Renderer from 'fabric-renderer'
// import { auxiliaryLine } from '@/common/utils/auxiliaryLine'

function useRenderer (props) {
  const hasActiveObject = ref(false)
  const activeObject = shallowRef({})
  const renderer = shallowRef({})
  const objForm = ref({})
  const formEl = ref(null)
  const backgroundColor = '#666666'
  const form = ref({
    name: '',
    tag: '',
    size: '',
    width: 0,
    height: 0
  })

  const rules = ref({
    name: [
      { required: true, message: '不能为空', trigger: 'blur' }
    ],
    tag: [
      { required: true, message: '不能为空', trigger: 'blur' }
    ],
    size: [
      { required: true, message: '不能为空', trigger: 'blur' }
    ],
    width: [
      { required: true, message: '不能为空', trigger: 'blur' }
    ],
    height: [
      { required: true, message: '不能为空', trigger: 'blur' }
    ]
  })
  const loading = ref(false)

  // 初始化
  const initialRenderer = () => {
    renderer.value = new Renderer('customCanvas', {
      width: form.value.width,
      height: form.value.height,
      scale: 1,
      configurable: true,
      backgroundColor
    })

    if (props.data) {
      loading.value = true
      renderer.value.loadFromJSON(props.data.json, () => { }, () => {
        loading.value = false
      })
    }
  }

  // 回填
  const fullbackJson = () => {
    if (props.data) {
      const { id, name, tag, size, width, height } = props.data
      form.value.id = id
      form.value.name = name
      form.value.tag = tag
      form.value.size = size
      form.value.width = width
      form.value.height = height
    }
  }

  // 点击
  const listenMouseDown = () => {
    renderer.value.instance.on('mouse:down', (e) => {
      if (e.target) {
        activeObject.value = e.target
        hasActiveObject.value = true
        const { selectable, originX, originY, globalCompositeOperation, type, left, top, scaleX, scaleY, angle } = e.target
        objForm.value.type = type
        objForm.value.selectable = selectable
        objForm.value.originX = originX
        objForm.value.originY = originY
        objForm.value.globalCompositeOperation = globalCompositeOperation
        objForm.value.left = Math.floor(left)
        objForm.value.top = Math.floor(top)
        objForm.value.scaleX = Number(scaleX.toFixed(2))
        objForm.value.scaleY = Number(scaleY.toFixed(2))
        objForm.value.angle = Math.floor(angle)

        if (['rect'].includes(type)) {
          objForm.value.fill = activeObject.value.get('fill')
          objForm.value.text = activeObject.value.get('text')
        }
        if (['text'].includes(type)) {
          objForm.value.text = activeObject.value.get('text')
        }
      } else {
        clearObject()
      }
    })
  }

  // 清空
  const clearObject = () => {
    hasActiveObject.value = false
    activeObject.value = {}
    objForm.value = {}
  }

  // 移动
  const listenMouseMove = () => {
    renderer.value.instance.on('mouse:move', (e) => {
      if (activeObject.value && e.target && toRaw(activeObject.value) === e.target) {
        const { left, top } = e.target
        objForm.value.left = Math.floor(left)
        objForm.value.top = Math.floor(top)
      }
    })
  }

  // 缩放
  const listenScale = () => {
    renderer.value.instance.on('object:scaling', (e) => {
      if (activeObject.value && e.target && toRaw(activeObject.value) === e.target) {
        const { scaleX, scaleY } = e.target
        objForm.value.scaleX = Number(scaleX.toFixed(2))
        objForm.value.scaleY = Number(scaleY.toFixed(2))
      }
    })
  }

  // 旋转
  const listenRotate = () => {
    renderer.value.instance.on('object:rotating', (e) => {
      if (activeObject.value && e.target && toRaw(activeObject.value) === e.target) {
        const { angle } = e.target
        objForm.value.angle = Math.floor(angle)
      }
    })
  }

  const listenSelect = () => {
    renderer.value.instance.on('selection:updated', (e) => {
      console.log(1)
    })
  }

  const opened = async () => {
    fullbackJson()
    await nextTick()
    initialRenderer()
    listenMouseDown()
    listenMouseMove()
    listenScale()
    listenRotate()
    listenSelect()
  }

  return {
    renderer,
    activeObject,
    hasActiveObject,
    form,
    formEl,
    rules,
    objForm,
    opened,
    clearObject
  }
}

// 这是分割线，主体业务
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => { }
  }
})

const emits = defineEmits({
  'update:visible': null,
  confirm: null
})

const isVisible = useVModel(props, 'visible', emits)

const { renderer, hasActiveObject, activeObject, formEl, form, rules, objForm, opened, clearObject } = useRenderer(props)

// 排序
const handleOrder = (action) => {
  if (!activeObject.value) {
    return
  }
  activeObject.value[action]()
}

// 属性修改
const handleChangeForm = (data) => {
  if (!activeObject.value) {
    return
  }

  const options = {
    ...data
  }
  delete options.angle
  activeObject.value.set(options)

  // 设置为激活，则自动选择
  if (data.selectable) {
    renderer.value.instance.setActiveObject(activeObject.value).renderAll()
  } else {
    // 设置为非激活
    renderer.value.instance.discardActiveObject().renderAll()
  }
}

// 修改角度
const handleChangeAngle = (angle) => {
  if (!activeObject.value) {
    return
  }

  activeObject.value.rotate(angle)
  renderer.value.instance.renderAll()
}

// 删除图层
const handleDeleteObject = () => {
  if (!activeObject.value) {
    return
  }

  renderer.value.instance.remove(activeObject.value)
  clearObject()
}

// 添加背景
const handleAddBg = () => {
  ElMessageBox.prompt('请输入背景图片地址', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '不能为空'
  }).then(({ value }) => {
    renderer.value.addBackground(value)
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
  })
}

// 添加矩形
const handleAddRect = () => {
  renderer.value.addRect({
    centeredRotation: true
  })
}

// 添加文字
const handleAddText = () => {
  renderer.value.addText('testtset', {
    customType: 'text',
    customActive: true,
    customTL: 'delete',
    fill: '#111111'
  })
}

// 修改尺寸
const handleChangeSize = ({ width, height }) => {
  form.value.width = width
  form.value.height = height
  renderer.value.instance.setDimensions({ width, height }).renderAll()
}

// 确定
const handleConfirm = async () => {
  if (!formEl.value) return
  await formEl.value.validate((valid, fields) => {
    if (valid) {
      const json = renderer.value.toJSON()
      if (json.objects.length === 0) {
        ElMessage({
          type: 'warning',
          message: '至少添加一个图层'
        })
        return
      }

      const data = {
        ...form.value,
        json
      }
      emits('confirm', data)
      isVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style lang="scss" scoped>
.custom-board {
  display: flex;
  height: 100%;

  &__left {
    flex: 1;
  }

  &__canvas-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__canvas {
    border: 1px solid #e7e7e7;
  }

  &__right {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    padding-left: 30px;
  }

  &__empty-text {
    padding-top: 200px;
    font-size: 14px;
    color: #666666;
    text-align: center;
  }
}

.drawer-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
