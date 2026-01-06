import { defineExtension } from '@/utils/extensionUtil'
import TextAlignExtension from './TextAlignExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default defineExtension({
  name: 'textAlign',
  type: 'mark',
  extension: TextAlignExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
})
