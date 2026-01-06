import { defineExtension } from '@/utils/extensionUtil'
import TableExtension from './TableExtension'
import { fixedMenu, slashMenu } from './menu'

export default defineExtension({
  name: 'table',
  type: 'node',
  extension: TableExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
})
