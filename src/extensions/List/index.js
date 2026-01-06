import { defineExtension } from '@/utils/extensionUtil'
import ListExtension from './ListExtension'
import { fixedMenu, slashMenu } from './menu'

export default defineExtension({
  name: 'list',
  type: 'node',
  extension: ListExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
})
