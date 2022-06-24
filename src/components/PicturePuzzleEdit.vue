<!--
 * @Date: 2022-06-21 14:47:46
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 15:02:48
 * @FilePath: /shopify-management/src/components/PicturePuzzleEdit.vue
-->
<template>
  <el-drawer v-model="isVisible" title="插件配置" :size="1000" @opened="opened">
    <template #default>
      <div class="custom-board">
        <div class="custom-board__left">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="名称">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标签">
                <el-input v-model="form.tag" />
              </el-form-item>
            </el-col>
          </el-row>

          <canvas id="customCanvas" />
        </div>
        <div class="custom-board__right">
          <PicturePuzzleForm
            v-if="hasActiveObject" :data="objForm" :has-active-object="hasActiveObject"
            @order="handleOrder" @changeForm="handleChangeForm" @rotate="handleChangeAngle" />
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
import { ref, shallowRef, toRaw } from 'vue'
import PicturePuzzleForm from './PicturePuzzleForm.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useVModel } from '@vueuse/core'
import Renderer from 'fabric-renderer'
import { WIDTH, HEIGHT } from '@/config'
// import { auxiliaryLine } from '@/common/utils/auxiliaryLine'

function useRenderer (props) {
  const hasActiveObject = ref(false)
  const activeObject = shallowRef({})
  const renderer = shallowRef({})
  const objForm = ref({})
  const form = ref({
    name: '',
    tag: ''
  })
  const loading = ref(false)

  // 初始化
  const initialRenderer = () => {
    renderer.value = new Renderer('customCanvas', {
      width: WIDTH,
      height: HEIGHT,
      scale: 1,
      configurable: true,
      backgroundColor: '#f2f2f2'
    })
    // auxiliaryLine(renderer.value.instance)
  }

  // 回填
  const fullbackJson = () => {
    if (props.data) {
      const { id, name, tag, json } = props.data
      form.value.id = id
      form.value.name = name
      form.value.tag = tag
      loading.value = true
      renderer.value.loadFromJSON(json, () => { }, () => {
        loading.value = false
      })
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
        hasActiveObject.value = false
        activeObject.value = {}
        objForm.value = {}
      }
    })
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

  const opened = () => {
    initialRenderer()
    fullbackJson()
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
    objForm,
    opened
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

const { renderer, hasActiveObject, activeObject, form, objForm, opened } = useRenderer(props)

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

// 确定
const handleConfirm = () => {
  if (!form.value.name) {
    ElMessage({
      type: 'warning',
      message: '名称不能为空'
    })
    return
  }

  if (!form.value.tag) {
    ElMessage({
      type: 'warning',
      message: '标签不能为空'
    })
    return
  }

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
}

</script>

<style lang="scss" scoped>
.custom-board {
  display: flex;
  height: 100%;

  &__left {
    flex: 1;
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
