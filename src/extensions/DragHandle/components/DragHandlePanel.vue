<template>
  <DragHandle
    :editor="editor"
    :on-node-change="handleNodeChange"
    class="xm-drag-handle-wrapper"
  >
    <Transition name="xm-drag-handle-fade">
      <div
        v-if="!!currentNode && isNodeVisible"
        :key="currentNodePos"
        class="xm-drag-handle"
      >
        <!-- 块类型标识 -->
        <span class="xm-drag-handle-type" :title="typeTooltip">
          <!-- 标题类型：文本标签 -->
          <template v-if="currentNodeType === 'heading'">
            <span class="xm-drag-handle-heading-label">H<sub>{{ headingLevel }}</sub></span>
          </template>
          <!-- 其他类型：icon -->
          <template v-else>
            <component :is="typeIcon" :size="16" :stroke-width="2" />
          </template>
        </span>
        <!-- 拖拽手柄 -->
        <span class="xm-drag-handle-grip" title="拖拽移动">
          <GripVertical :size="16" :stroke-width="2" />
        </span>
      </div>
    </Transition>
  </DragHandle>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { DragHandle } from '@tiptap/extension-drag-handle-vue-3'
import {
  Pilcrow,
  Table2,
  Image,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  Minus,
  GripVertical,
  FileCode,
} from 'lucide-vue-next'

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
})

// ---- 状态 ----
const currentNode = ref(null)
const currentNodeType = ref('')
const currentNodeAttrs = ref({})
const currentNodePos = ref(null)
const isNodeVisible = ref(false)

// ---- 块类型 → 显示映射 ----

/**
 * 节点类型到 icon 组件 of the block
 */
const NODE_TYPE_ICON_MAP = {
  paragraph: Pilcrow,
  table: Table2,
  image: Image,
  codeBlock: FileCode,
  blockquote: Quote,
  bulletList: List,
  orderedList: ListOrdered,
  taskList: CheckSquare,
  horizontalRule: Minus,
}

/**
 * 节点类型到中文提示的映射
 */
const NODE_TYPE_TOOLTIP_MAP = {
  paragraph: '段落',
  heading: '标题',
  table: '表格',
  image: '图片',
  codeBlock: '代码块',
  blockquote: '引用',
  bulletList: '无序列表',
  orderedList: '有序列表',
  taskList: '任务列表',
  horizontalRule: '分割线',
}

// ---- 计算属性 ----

const headingLevel = computed(() => {
  if (currentNodeType.value === 'heading') {
    return currentNodeAttrs.value.level || 1
  }
  return 1
})

const typeIcon = computed(() => {
  return NODE_TYPE_ICON_MAP[currentNodeType.value] || Pilcrow
})

const typeTooltip = computed(() => {
  const base = NODE_TYPE_TOOLTIP_MAP[currentNodeType.value] || '段落'
  if (currentNodeType.value === 'heading') {
    return `${base} ${headingLevel.value}`
  }
  return base
})

// ---- 滚动与可见性检测逻辑 ----

let scrollContainer = null
let tick = false

function doUpdateVisibility() {
  if (!currentNode.value || currentNodePos.value === null || !props.editor || !props.editor.view) {
    isNodeVisible.value = false
    return
  }

  try {
    const dom = props.editor.view.nodeDOM(currentNodePos.value)
    if (!dom || typeof dom.getBoundingClientRect !== 'function') {
      isNodeVisible.value = false
      return
    }

    const container = props.editor.view.dom.closest('.editor-content')
    if (!container) {
      isNodeVisible.value = true
      return
    }

    const rect = dom.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    // 只有当块的顶部在编辑区域的可视范围内时才显示
    // (由于拖拽手柄定位在块顶部，如果顶部已滚出可视区，则应隐藏它，防止浮动在编辑器外部)
    isNodeVisible.value = rect.top >= containerRect.top && rect.top <= containerRect.bottom
  } catch (e) {
    isNodeVisible.value = false
  }
}

function updateVisibility() {
  if (tick) return
  tick = true
  requestAnimationFrame(() => {
    tick = false
    doUpdateVisibility()
  })
}

function setupScrollListener() {
  if (scrollContainer) return
  if (!props.editor || !props.editor.view || !props.editor.view.dom) return

  scrollContainer = props.editor.view.dom.closest('.editor-content')
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility, { passive: true })
  }
}

function removeScrollListener() {
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', updateVisibility)
    scrollContainer = null
  }
  window.removeEventListener('resize', updateVisibility)
}

onMounted(() => {
  setupScrollListener()
})

onBeforeUnmount(() => {
  removeScrollListener()
})

watch(() => props.editor, (newEditor) => {
  removeScrollListener()
  if (newEditor) {
    setupScrollListener()
  }
}, { immediate: true })

// ---- 事件处理 ----

function handleNodeChange({ node, editor, pos }) {
  if (!node) {
    currentNode.value = null
    currentNodeType.value = ''
    currentNodeAttrs.value = {}
    currentNodePos.value = null
    isNodeVisible.value = false
    return
  }

  currentNode.value = node
  currentNodeType.value = node.type.name
  currentNodeAttrs.value = node.attrs || {}
  currentNodePos.value = pos

  // 确保滚动监听已绑定
  setupScrollListener()

  doUpdateVisibility()
}
</script>

<style>
/* ============================================
   DragHandle 拖拽手柄样式
   ============================================ */

.xm-drag-handle-wrapper {
  /* floating-ui 自动定位到块左侧 */
  margin-left: -6px; /* 向左移动手柄组件，可以根据需要微调此数值 */
}

.xm-drag-handle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 4px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  user-select: none;
  transition: 
    border-color 0.15s ease, 
    box-shadow 0.15s ease;
}

.xm-drag-handle:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* Vue Transition 动画 */
.xm-drag-handle-fade-enter-active {
  transition: 
    opacity 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), 
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.xm-drag-handle-fade-enter-from {
  opacity: 0;
  transform: scale(0.85) translateX(-6px);
}

/* 离开时立刻隐藏，避免在旧的内容块位置留下重影 */
.xm-drag-handle-fade-leave-active {
  display: none;
}

/* 块类型标识容器 */
.xm-drag-handle-type {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: #22c55e;
  cursor: pointer;
  transition: all 0.15s ease;
}

.xm-drag-handle-type:hover {
  background-color: rgba(34, 197, 94, 0.08);
  color: #16a34a;
}

/* 标题标签特殊样式 */
.xm-drag-handle-heading-label {
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #22c55e;
  white-space: nowrap;
}

.xm-drag-handle-heading-label sub {
  font-size: 9px;
  font-weight: 600;
  vertical-align: baseline;
  position: relative;
  top: 1px;
}

/* 拖拽手柄 */
.xm-drag-handle-grip {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 24px;
  border-radius: 4px;
  color: #94a3b8;
  cursor: grab;
  transition: all 0.15s ease;
}

.xm-drag-handle-grip:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #64748b;
}

.xm-drag-handle-grip:active {
  cursor: grabbing;
  color: #475569;
}

/* 拖拽过程中的视觉反馈 */
.xm-drag-handle-wrapper.dragging .xm-drag-handle {
  opacity: 0.6;
}

/* ProseMirror 拖拽放置指示线 */
.ProseMirror-drop-target::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #1456f0;
  border-radius: 1px;
  z-index: 100;
}
</style>
