<template>
  <div class="xm-toc-panel" :class="{ 'xm-toc-collapsed': isCollapsed }">
    <!-- 折叠/展开按钮 -->
    <div class="xm-toc-header" @click="toggleCollapse">
      <template v-if="!isCollapsed">
        <span class="xm-toc-title">{{ panelTitle }}</span>
        <span class="xm-toc-toggle" :class="{ 'xm-toc-toggle-left': isLeftPosition }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </template>
      <template v-else>
        <span class="xm-toc-collapsed-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </span>
      </template>
    </div>

    <!-- 目录列表 -->
    <div ref="tocBodyRef" class="xm-toc-body" v-show="!isCollapsed">
      <!-- 空文档占位提示 -->
      <div v-if="tocItems.length === 0" class="xm-toc-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span>添加标题以生成目录</span>
      </div>

      <!-- 目录项列表 -->
      <nav class="xm-toc-nav" v-else>
        <a v-for="(item, index) in tocItems" :key="item.id + '-' + index" class="xm-toc-item"
          :ref="el => { if (item.isActive) activeItemRef = el }"
          :class="[
            `xm-toc-level-${item.level}`,
            { 'xm-toc-active': item.isActive }
          ]"
          :title="item.text"
          @click.prevent="handleClick(item)">
          <span class="xm-toc-indicator"></span>
          <span class="xm-toc-text">{{ item.text || '空标题' }}</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { extractHeadings, scrollToHeading } from '../tocUtils'

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
})

// 目录配置
const panelTitle = ref(props.editor?.storage?.toc?.title || props.options.title || '目录')
const isCollapsed = ref(props.options.collapsed || false)
const levels = computed(() => props.options.levels || [1, 2, 3])
const isLeftPosition = computed(() => props.options?.position === 'left')

// 目录数据
const tocItems = ref([])

// DOM refs
const tocBodyRef = ref(null)
const activeItemRef = ref(null)

/**
 * 从 editor storage 读取 tocItems 和 activeId，同步到组件本地状态
 */
function syncFromStorage() {
  if (!props.editor) return

  const storage = props.editor.storage.toc
  if (!storage) return

  if (storage.title) {
    panelTitle.value = storage.title
  }

  const items = storage.tocItems || []
  const activeId = storage.activeId

  tocItems.value = items.map(item => ({
    ...item,
    isActive: item.id === activeId,
  }))
}

/**
 * 从编辑器状态中提取标题（初始化 & docChanged 时用）
 */
function updateToc() {
  if (!props.editor) return
  const headings = extractHeadings(props.editor.state.doc, levels.value)

  const storage = props.editor.storage.toc
  const activeId = storage?.activeId || null

  if (storage && storage.title) {
    panelTitle.value = storage.title
  }

  tocItems.value = headings.map(item => ({
    ...item,
    isActive: item.id === activeId,
  }))
}

/**
 * 点击目录项 → 跳转到对应标题
 */
function handleClick(item) {
  if (!props.editor) return
  scrollToHeading(props.editor, item.id, { smooth: true, focus: false })

  // 通知 Extension 层更新 activeId
  const storage = props.editor.storage.toc
  if (storage?.highlighter) {
    storage.highlighter.setActiveId(item.id)
  }

  // 立即同步本地状态
  syncFromStorage()
}

/**
 * 切换折叠/展开
 */
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

/**
 * 滚动目录面板，确保激活项可见
 */
function scrollActiveItemIntoView() {
  nextTick(() => {
    if (!activeItemRef.value || !tocBodyRef.value) return

    const activeRect = activeItemRef.value.getBoundingClientRect()
    const bodyRect = tocBodyRef.value.getBoundingClientRect()

    if (activeRect.top < bodyRect.top || activeRect.bottom > bodyRect.bottom) {
      activeItemRef.value.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  })
}

// 编辑器 transaction 监听
let transactionHandler = null

onMounted(() => {
  if (props.editor) {
    // 初始提取
    updateToc()

    // 监听编辑器 transaction
    transactionHandler = ({ transaction }) => {
      if (transaction.docChanged) {
        // 文档变化时重新提取标题
        updateToc()
      } else {
        // 非文档变化的 transaction（可能是 storage 更新），同步 activeId
        syncFromStorage()
        scrollActiveItemIntoView()
      }
    }
    props.editor.on('transaction', transactionHandler)

    // 也监听 storage 变化——当 Extension 层 scroll 检测更新 activeId 时
    // 因为 storage 更新不一定触发 transaction，额外用定时器兜底
    const storagePoller = setInterval(() => {
      const storage = props.editor?.storage?.toc
      if (!storage) return

      const currentActiveId = tocItems.value.find(i => i.isActive)?.id
      if (storage.activeId !== currentActiveId) {
        syncFromStorage()
        scrollActiveItemIntoView()
      }
    }, 150)

    // 清理
    onUnmounted(() => {
      clearInterval(storagePoller)
    })
  }
})

onUnmounted(() => {
  if (props.editor && transactionHandler) {
    props.editor.off('transaction', transactionHandler)
  }
})

// 如果 editor 变化，重新初始化
watch(() => props.editor, (newEditor) => {
  if (newEditor) {
    updateToc()
  }
})
</script>

<style>
.xm-toc-panel {
  width: 200px;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s ease;
  flex-shrink: 0;
}

.xm-toc-panel.xm-toc-collapsed {
  width: 40px;
  min-width: 40px;
  background-color: transparent;
}

.xm-toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s;
}

.xm-toc-header:hover {
  background-color: #f0f2f5;
}

.xm-toc-collapsed .xm-toc-header {
  justify-content: center;
  padding: 10px 8px;
}

.xm-toc-title {
  font-size: 12px;
  font-weight: 600;
  color: #57606a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
}

.xm-toc-collapsed .xm-toc-title {
  display: none;
}

.xm-toc-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b949e;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.xm-toc-toggle-left {
  transform: rotate(180deg);
}

.xm-toc-collapsed-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #57606a;
  flex-shrink: 0;
  padding: 4px;
}

.xm-toc-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 0;
}

.xm-toc-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px 16px;
  color: #8b949e;
  font-size: 12px;
  text-align: center;
}

.xm-toc-nav {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.xm-toc-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  cursor: pointer;
  text-decoration: none;
  color: #57606a;
  font-size: 13px;
  line-height: 1.4;
  border-radius: 0;
  transition: all 0.15s ease;
  position: relative;
}

.xm-toc-item:hover {
  background-color: #f0f2f5;
  color: #24292f;
}

.xm-toc-item.xm-toc-active {
  color: #0969da;
}

/* 层级缩进 */
.xm-toc-item.xm-toc-level-1 {
  padding-left: 12px;
  font-weight: 600;
  font-size: 13px;
}

.xm-toc-item.xm-toc-level-2 {
  padding-left: 24px;
  font-weight: 500;
  font-size: 12.5px;
}

.xm-toc-item.xm-toc-level-3 {
  padding-left: 36px;
  font-weight: 400;
  font-size: 12px;
  color: #6e7781;
}

.xm-toc-item.xm-toc-level-3.xm-toc-active {
  color: #0969da;
}

.xm-toc-indicator {
  display: none;
}

.xm-toc-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

/* 滚动条样式 */
.xm-toc-body::-webkit-scrollbar {
  width: 4px;
}

.xm-toc-body::-webkit-scrollbar-track {
  background: transparent;
}

.xm-toc-body::-webkit-scrollbar-thumb {
  background-color: #d0d7de;
  border-radius: 4px;
}

.xm-toc-body::-webkit-scrollbar-thumb:hover {
  background-color: #afb8c1;
}
</style>
