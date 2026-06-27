import { defineExtension } from '@/utils/extensionUtil'
import TableExtension from './TableExtension'
import TableContextMenu from './components/TableContextMenu.vue'
import TableToolbar from './components/TableToolbar.vue'
import { fixedMenu, slashMenu } from './menu'

export default defineExtension({
  name: 'table',
  type: 'node',
  extension: TableExtension,
  // 右键菜单组件（挂载在编辑器根层级）
  contextMenuComponent: TableContextMenu,
  // 表格浮动工具栏组件
  tableToolbarComponent: TableToolbar,
  manifest: {
    fixedMenu,
    slashMenu
  }
})
