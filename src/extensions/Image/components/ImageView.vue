<template>
  <NodeViewWrapper class="image-view" :class="{ 'is-selected': selected, 'is-resizing': isResizing }">
    <div class="image-wrapper">
      <img
        ref="imageRef"
        :src="node.attrs.src"
        :style="{
          width: node.attrs.width,
          height: node.attrs.height,
        }"
        draggable="false"
      />

      <!-- Resize Handle -->
      <div
        v-if="selected || isResizing"
        class="resize-handle"
        @mousedown.prevent="startResize"
      ></div>

      <!-- Size Tooltip -->
      <div v-if="isResizing" class="size-tooltip">
        {{ currentWidth }} x {{ currentHeight }} px
      </div>
    </div>
  </NodeViewWrapper>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
  updateAttributes: {
    type: Function,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  editor: {
    type: Object,
  },
})

const imageRef = ref(null)
const isResizing = ref(false)
const isAspectLocked = ref(false)

// 拖拽起始快照
let startX = 0
let startY = 0
let startWidth = 0
let startHeight = 0
let naturalRatio = 1 // height / width

// Tooltip 显示
const currentWidth = ref(0)
const currentHeight = ref(0)

// 全局 Shift 状态跟踪
let shiftPressed = false

const onKeyDown = (e) => {
  if (e.key === 'Shift') {
    shiftPressed = true
    isAspectLocked.value = true
  }
}

const onKeyUp = (e) => {
  if (e.key === 'Shift') {
    shiftPressed = false
    isAspectLocked.value = false
  }
}

const startResize = (e) => {
  e.preventDefault()
  e.stopPropagation()

  if (!imageRef.value) return

  const rect = imageRef.value.getBoundingClientRect()
  startX = e.clientX
  startY = e.clientY
  startWidth = rect.width
  startHeight = rect.height
  naturalRatio = rect.height / rect.width

  currentWidth.value = Math.round(rect.width)
  currentHeight.value = Math.round(rect.height)

  isResizing.value = true
  shiftPressed = e.shiftKey
  isAspectLocked.value = e.shiftKey

  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('keyup', onKeyUp)
}

let rafId = null

const onResize = (e) => {
  if (rafId) cancelAnimationFrame(rafId)

  rafId = requestAnimationFrame(() => {
    const diffX = e.clientX - startX
    const diffY = e.clientY - startY

    if (shiftPressed) {
      // ── Shift 按下：锁定宽高比，仅根据 X 方向位移计算 ──
      const newWidth = Math.max(20, Math.round(startWidth + diffX))
      const newHeight = Math.max(20, Math.round(newWidth * naturalRatio))
      currentWidth.value = newWidth
      currentHeight.value = newHeight
      props.updateAttributes({
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      })
    } else {
      // ── 默认：宽高独立变化，X 控制宽度，Y 控制高度 ──
      const newWidth = Math.max(20, Math.round(startWidth + diffX))
      const newHeight = Math.max(20, Math.round(startHeight + diffY))
      currentWidth.value = newWidth
      currentHeight.value = newHeight
      props.updateAttributes({
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      })
    }
  })
}

const stopResize = () => {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  isResizing.value = false
  isAspectLocked.value = false
  shiftPressed = false

  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('keydown', onKeyDown)
  document.removeEventListener('keyup', onKeyUp)
}

onUnmounted(() => {
  stopResize()
})
</script>

<style lang="scss" scoped>
.image-view {
  display: inline-block;
  line-height: 0; // Fix extra space below image

  &.is-selected {
    .image-wrapper {
      outline: 2px solid #3b82f6;
      box-shadow: 0 0 8px #3b82f6;
    }
  }
}

.image-wrapper {
  position: relative;
  display: inline-block;

  img {
    display: block;
    max-width: 100%;
  }
}

.resize-handle {
  position: absolute;
  right: -5px;
  bottom: -5px;
  width: 12px;
  height: 12px;
  background-color: #3b82f6;
  border: 2px solid #fff;
  border-radius: 3px;
  cursor: se-resize;
  z-index: 10;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: scale(1.25);
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.5);
  }
}

.size-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  border-radius: 6px;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  text-align: center;
  line-height: 1.5;
  z-index: 20;
}


</style>
