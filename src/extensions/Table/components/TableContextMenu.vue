<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="table-context-menu-overlay"
      @click.self="close"
      @contextmenu.prevent="close"
    >
      <div
        class="table-context-menu"
        :style="{ top: position.y + 'px', left: position.x + 'px' }"
        ref="menuRef"
      >
        <!-- 行操作 -->
        <div class="menu-group">
          <div class="menu-group-title">行</div>
          <div
            v-for="cmd in rowCmds"
            :key="cmd.id"
            class="menu-item"
            :class="{ disabled: !cmd.enabled, danger: cmd.danger }"
            @click="execute(cmd)"
          >
            <component :is="getIcon(cmd.icon)" :size="15" :stroke-width="1.8" />
            <span>{{ cmd.label }}</span>
          </div>
        </div>

        <div class="menu-divider" />

        <!-- 列操作 -->
        <div class="menu-group">
          <div class="menu-group-title">列</div>
          <div
            v-for="cmd in colCmds"
            :key="cmd.id"
            class="menu-item"
            :class="{ disabled: !cmd.enabled, danger: cmd.danger }"
            @click="execute(cmd)"
          >
            <component :is="getIcon(cmd.icon)" :size="15" :stroke-width="1.8" />
            <span>{{ cmd.label }}</span>
          </div>
        </div>

        <div class="menu-divider" />

        <!-- 单元格操作 -->
        <div class="menu-group">
          <div class="menu-group-title">单元格</div>
          <div
            v-for="cmd in cellCmds"
            :key="cmd.id"
            class="menu-item"
            :class="{ disabled: !cmd.enabled }"
            @click="execute(cmd)"
          >
            <component :is="getIcon(cmd.icon)" :size="15" :stroke-width="1.8" />
            <span>{{ cmd.label }}</span>
          </div>

          <!-- 背景色子菜单触发器 -->
          <div
            class="menu-item has-submenu"
            @mouseenter="showColorPicker = true"
            @mouseleave="showColorPicker = false"
          >
            <component :is="getIcon('Palette')" :size="15" :stroke-width="1.8" />
            <span>单元格背景色</span>
            <component :is="getIcon('ChevronRight')" :size="13" :stroke-width="1.8" class="submenu-arrow" />
            <div v-show="showColorPicker" class="submenu-panel" @click.stop>
              <CellColorPicker :editor="editor" @select="close" @close="close" />
            </div>
          </div>
        </div>

        <div class="menu-divider" />

        <!-- 表格操作 -->
        <div class="menu-group">
          <div class="menu-group-title">表格</div>
          <div
            v-for="cmd in tableCmds"
            :key="cmd.id"
            class="menu-item"
            :class="{ disabled: !cmd.enabled, danger: cmd.danger }"
            @click="execute(cmd)"
          >
            <component :is="getIcon(cmd.icon)" :size="15" :stroke-width="1.8" />
            <span>{{ cmd.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import * as LucideIcons from 'lucide-vue-next'
import CellColorPicker from './CellColorPicker.vue'
import { rowCommands, columnCommands, cellCommands, tableCommands } from '../tableCommands'

const props = defineProps({
  editor: { type: Object, required: true },
})

const visible = ref(false)
const position = ref({ x: 0, y: 0 })
const showColorPicker = ref(false)
const menuRef = ref(null)

// 获取 lucide 图标组件
const getIcon = (name) => LucideIcons[name] || LucideIcons['Circle']

// 为命令添加 enabled 状态
const mapCommands = (cmds) =>
  cmds.map((cmd) => ({
    ...cmd,
    enabled: cmd.canExecute({ editor: props.editor }),
  }))

// 使用 ref 而非 computed，因为 props.editor 引用不变导致 computed 缓存不会失效
// 在每次菜单打开时手动刷新命令状态
const rowCmds = ref([])
const colCmds = ref([])
const cellCmds = ref([])
const tableCmds = ref([])

const refreshCommands = () => {
  rowCmds.value = mapCommands(rowCommands)
  colCmds.value = mapCommands(columnCommands)
  cellCmds.value = mapCommands(cellCommands)
  tableCmds.value = mapCommands(tableCommands)
}

const execute = (cmd) => {
  if (!cmd.enabled) return
  cmd.action({ editor: props.editor })
  close()
}

const close = () => {
  visible.value = false
  showColorPicker.value = false
}

// 修正菜单位置，确保不超出视窗
const adjustPosition = async () => {
  await nextTick()
  if (!menuRef.value) return

  const menu = menuRef.value
  const rect = menu.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  if (rect.right > vw) {
    position.value.x = vw - rect.width - 8
  }
  if (rect.bottom > vh) {
    position.value.y = vh - rect.height - 8
  }
}

const handleContextMenu = (event) => {
  const target = event.target
  const table = target.closest?.('table')
  if (!table) return
  // 确保是在编辑器内的表格
  const editorEl = props.editor?.view?.dom
  if (!editorEl || !editorEl.contains(table)) return

  event.preventDefault()
  position.value = { x: event.clientX, y: event.clientY }
  visible.value = true
  refreshCommands()
  adjustPosition()
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && visible.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('contextmenu', handleContextMenu)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('contextmenu', handleContextMenu)
  document.removeEventListener('keydown', handleKeydown)
})

// 监听 visible 变化时重新计算命令启用状态
watch(visible, (val) => {
  if (val) {
    adjustPosition()
  }
})
</script>

<style scoped>
.table-context-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.table-context-menu {
  position: fixed;
  z-index: 10000;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 4px;
  min-width: 200px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  animation: contextMenuFadeIn 0.12s ease-out;
}

@keyframes contextMenuFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.menu-group-title {
  font-size: 11px;
  color: #9ca3af;
  padding: 4px 10px 2px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  transition: background-color 0.1s;
  position: relative;
  user-select: none;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.menu-item.disabled:hover {
  background-color: transparent;
}

.menu-item.danger {
  color: #ef4444;
}

.menu-item.danger:hover {
  background-color: #fef2f2;
}

.menu-divider {
  height: 1px;
  background-color: #f3f4f6;
  margin: 3px 6px;
}

.has-submenu {
  position: relative;
}

.submenu-arrow {
  margin-left: auto;
  color: #9ca3af;
}

.submenu-panel {
  position: absolute;
  left: 100%;
  top: -4px;
  margin-left: 4px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 10001;
}
</style>