import { defineExtension } from '@/utils/extensionUtil'
import BlockquoteExtension from './BlockquoteExtension'
import { fixedMenu, slashMenu } from './menu'

export default defineExtension({
  name: 'blockquote',
  type: 'node',
  extension: BlockquoteExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
})
