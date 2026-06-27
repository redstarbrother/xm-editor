<template>
  <div class="table-toolbar" v-if="isInTable">
    <!-- 行操作 -->
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        title="在上方插入行"
        :disabled="!canAddRowBefore"
        @click="exec('addRowBefore')"
      >
        <component :is="icons.ArrowUpToLine" :size="15" :stroke-width="1.8" />
      </button>
      <button
        class="toolbar-btn"
        title="在下方插入行"
        :disabled="!canAddRowAfter"
        @click="exec('addRowAfter')"
      >
        <component :is="icons.ArrowDownToLine" :size="15" :stroke-width="1.8" />
      </button>
      <button
        class="toolbar-btn"
        title="删除当前行"
        :disabled="!canDeleteRow"
        @click="exec('deleteRow')"
      >
        <component :is="icons.RowsIcon" :size="15" :stroke-width="1.8" />
        <component :is="icons.X" :size="10" :stroke-width="2.5" class="mini-badge" />
      </button>
    </div>

    <div class="toolbar-separator" />

    <!-- 列操作 -->
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        title="在左侧插入列"
        :disabled="!canAddColBefore"
        @click="exec('addColumnBefore')"
      >
        <component :is="icons.ArrowLeftToLine" :size="15" :stroke-width="1.8" />
      </button>
      <button
        class="toolbar-btn"
        title="在右侧插入列"
        :disabled="!canAddColAfter"
        @click="exec('addColumnAfter')"
      >
        <component :is="icons.ArrowRightToLine" :size="15" :stroke-width="1.8" />
      </button>
      <button
        class="toolbar-btn"
        title="删除当前列"
        :disabled="!canDeleteCol"
        @click="exec('deleteColumn')"
      >
        <component :is="icons.ColumnsIcon" :size="15" :stroke-width="1.8" />
        <component :is="icons.X" :size="10" :stroke-width="2.5" class="mini-badge" />
      </button>
    </div>

    <div class="toolbar-separator" />

    <!-- 合并/拆分 -->
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        title="合并单元格"
        :disabled="!canMerge"
        @click="exec('mergeCells')"
      >
        <component :is="icons.Merge" :size="15" :stroke-width="1.8" />
      </button>
      <button
        class="toolbar-btn"
        title="拆分单元格"
        :disabled="!canSplit"
        @click="exec('splitCell')"
      >
        <component :is="icons.Split" :size="15" :stroke-width="1.8" />
      </button>
    </div>

    <div class="toolbar-separator" />

    <!-- 背景色 -->
    <div class="toolbar-group">
      <div class="toolbar-btn-wrapper" ref="colorBtnRef">
        <button
          class="toolbar-btn"
          title="单元格背景色"
          @click="toggleColorPicker"
        >
          <component :is="icons.Palette" :size="15" :stroke-width="1.8" />
        </button>
        <div v-if="showColorPicker" class="color-picker-dropdown">
          <CellColorPicker
            :editor="editor"
            @select="showColorPicker = false"
            @close="showColorPicker = false"
          />
        </div>
      </div>
    </div>

    <div class="toolbar-separator" />

    <!-- 表头切换 & 删除表格 -->
    <div class="toolbar-group">
      <button
        class="toolbar-btn"
        title="切换表头行"
        :disabled="!canToggleHeaderRow"
        @click="exec('toggleHeaderRow')"
      >
        <component :is="icons.PanelTop" :size="15" :stroke-width="1.8" />
      </button>
      <button
        class="toolbar-btn danger"
        title="删除表格"
        @click="exec('deleteTable')"
      >
        <component :is="icons.Trash2" :size="15" :stroke-width="1.8" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, markRaw } from 'vue'
import * as LucideIcons from 'lucide-vue-next'
import CellColorPicker from './CellColorPicker.vue'
import { useEditorTransaction } from '@/hooks/useEditorMenu'

const props = defineProps({
  editor: { type: Object, required: true },
})

const showColorPicker = ref(false)
const colorBtnRef = ref(null)

const icons = {
  ArrowUpToLine: markRaw(LucideIcons.ArrowUpToLine),
  ArrowDownToLine: markRaw(LucideIcons.ArrowDownToLine),
  ArrowLeftToLine: markRaw(LucideIcons.ArrowLeftToLine),
  ArrowRightToLine: markRaw(LucideIcons.ArrowRightToLine),
  RowsIcon: markRaw(LucideIcons.Rows3),
  ColumnsIcon: markRaw(LucideIcons.Columns3),
  X: markRaw(LucideIcons.X),
  Merge: markRaw(LucideIcons.Merge),
  Split: markRaw(LucideIcons.Split),
  Palette: markRaw(LucideIcons.Palette),
  PanelTop: markRaw(LucideIcons.PanelTop),
  Trash2: markRaw(LucideIcons.Trash2),
}

// 监听 editor transaction 事件，使 computed 响应编辑器状态变化
const tick = useEditorTransaction(props.editor)

const isInTable = computed(() => { tick.value; return props.editor?.isActive('table') })

const canAddRowBefore = computed(() => { tick.value; return props.editor?.can().addRowBefore() })
const canAddRowAfter = computed(() => { tick.value; return props.editor?.can().addRowAfter() })
const canDeleteRow = computed(() => { tick.value; return props.editor?.can().deleteRow() })
const canAddColBefore = computed(() => { tick.value; return props.editor?.can().addColumnBefore() })
const canAddColAfter = computed(() => { tick.value; return props.editor?.can().addColumnAfter() })
const canDeleteCol = computed(() => { tick.value; return props.editor?.can().deleteColumn() })
const canMerge = computed(() => { tick.value; return props.editor?.can().mergeCells() })
const canSplit = computed(() => { tick.value; return props.editor?.can().splitCell() })
const canToggleHeaderRow = computed(() => { tick.value; return props.editor?.can().toggleHeaderRow() })

const exec = (command) => {
  props.editor?.chain().focus()[command]().run()
}

const toggleColorPicker = () => {
  showColorPicker.value = !showColorPicker.value
}
</script>

<style scoped>
.table-toolbar {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.05);
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 1px;
}

.toolbar-separator {
  width: 1px;
  height: 18px;
  background-color: #e5e7eb;
  margin: 0 2px;
}

.toolbar-btn-wrapper {
  position: relative;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.15s;
}

.toolbar-btn:hover:not(:disabled) {
  background-color: #f3f4f6;
  color: #1f2937;
}

.toolbar-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.toolbar-btn.danger:hover:not(:disabled) {
  background-color: #fef2f2;
  color: #ef4444;
}

.mini-badge {
  position: absolute;
  right: 2px;
  bottom: 2px;
  color: #9ca3af;
}

.toolbar-btn:hover .mini-badge {
  color: #ef4444;
}

.color-picker-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 100;
}
</style>
