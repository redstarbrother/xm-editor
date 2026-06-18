import { defineExtension } from '@/utils/extensionUtil'
import DragHandlePanel from './components/DragHandlePanel.vue'

/**
 * DragHandle 拖拽手柄扩展
 * 
 * 在编辑器块级节点左侧显示：
 * 1. 块类型 icon（H1、H2、表格、图片等）
 * 2. 拖拽手柄图标（六点网格）
 * 
 * 参考飞书文档编辑器的交互效果。
 * 
 * 使用方式：
 * 
 * // 基本用法
 * Extensions.DragHandle
 * 
 * @example
 * import { Extensions } from '@putanut/xm-editor'
 * 
 * const config = Presets.NotionLike.configure({
 *   extensions: [
 *     Extensions.DragHandle,
 *   ]
 * })
 */
export default defineExtension({
  name: 'drag-handle',
  type: 'panel',
  extension: null,       // DragHandle Vue 组件自带 ProseMirror Plugin
  component: DragHandlePanel,
})
