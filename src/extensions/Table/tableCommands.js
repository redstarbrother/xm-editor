/**
 * 表格命令集中管理
 * 将所有表格相关操作统一封装，便于右键菜单、工具栏等复用
 */

// ========== 行操作 ==========
export const rowCommands = [
  {
    id: 'addRowBefore',
    label: '在上方插入行',
    icon: 'ArrowUpToLine',
    action: ({ editor }) => editor.chain().focus().addRowBefore().run(),
    canExecute: ({ editor }) => editor.can().addRowBefore(),
  },
  {
    id: 'addRowAfter',
    label: '在下方插入行',
    icon: 'ArrowDownToLine',
    action: ({ editor }) => editor.chain().focus().addRowAfter().run(),
    canExecute: ({ editor }) => editor.can().addRowAfter(),
  },
  {
    id: 'deleteRow',
    label: '删除当前行',
    icon: 'Trash2',
    danger: true,
    action: ({ editor }) => editor.chain().focus().deleteRow().run(),
    canExecute: ({ editor }) => editor.can().deleteRow(),
  },
]

// ========== 列操作 ==========
export const columnCommands = [
  {
    id: 'addColumnBefore',
    label: '在左侧插入列',
    icon: 'ArrowLeftToLine',
    action: ({ editor }) => editor.chain().focus().addColumnBefore().run(),
    canExecute: ({ editor }) => editor.can().addColumnBefore(),
  },
  {
    id: 'addColumnAfter',
    label: '在右侧插入列',
    icon: 'ArrowRightToLine',
    action: ({ editor }) => editor.chain().focus().addColumnAfter().run(),
    canExecute: ({ editor }) => editor.can().addColumnAfter(),
  },
  {
    id: 'deleteColumn',
    label: '删除当前列',
    icon: 'Trash2',
    danger: true,
    action: ({ editor }) => editor.chain().focus().deleteColumn().run(),
    canExecute: ({ editor }) => editor.can().deleteColumn(),
  },
]

// ========== 单元格操作 ==========
export const cellCommands = [
  {
    id: 'mergeCells',
    label: '合并单元格',
    icon: 'Merge',
    action: ({ editor }) => editor.chain().focus().mergeCells().run(),
    canExecute: ({ editor }) => editor.can().mergeCells(),
  },
  {
    id: 'splitCell',
    label: '拆分单元格',
    icon: 'Split',
    action: ({ editor }) => editor.chain().focus().splitCell().run(),
    canExecute: ({ editor }) => editor.can().splitCell(),
  },
]

// ========== 表格操作 ==========
export const tableCommands = [
  {
    id: 'toggleHeaderRow',
    label: '切换表头行',
    icon: 'PanelTop',
    action: ({ editor }) => editor.chain().focus().toggleHeaderRow().run(),
    canExecute: ({ editor }) => editor.can().toggleHeaderRow(),
  },
  {
    id: 'toggleHeaderColumn',
    label: '切换表头列',
    icon: 'PanelLeft',
    action: ({ editor }) => editor.chain().focus().toggleHeaderColumn().run(),
    canExecute: ({ editor }) => editor.can().toggleHeaderColumn(),
  },
  {
    id: 'deleteTable',
    label: '删除表格',
    icon: 'Trash2',
    danger: true,
    action: ({ editor }) => editor.chain().focus().deleteTable().run(),
    canExecute: ({ editor }) => editor.can().deleteTable(),
  },
]

// 预定义单元格背景色
export const cellColors = [
  { name: '无色', value: null },
  { name: '浅灰', value: '#f1f3f5' },
  { name: '浅棕', value: '#fdf0e2' },
  { name: '浅橙', value: '#fee8d0' },
  { name: '浅黄', value: '#fef6d0' },
  { name: '浅绿', value: '#d9f5e0' },
  { name: '浅蓝', value: '#d6ebff' },
  { name: '浅紫', value: '#ece4fe' },
  { name: '浅粉', value: '#fde4ee' },
  { name: '浅红', value: '#ffe0e0' },
]
