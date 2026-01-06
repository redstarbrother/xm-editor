import { defineExtension } from '@/utils/extensionUtil'
import CodeExtension from './CodeExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default defineExtension({
  name: 'code',
  type: 'mark',
  extension: CodeExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
})
