import { defineExtension } from '@/utils/extensionUtil'
import CodeBlockExtension from './CodeBlockExtension'
import { fixedMenu, slashMenu } from './menu'

export default defineExtension({
  name: 'codeBlock',
  type: 'node',
  extension: CodeBlockExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
})
