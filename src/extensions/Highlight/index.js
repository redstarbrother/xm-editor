import { defineExtension } from '@/utils/extensionUtil'
import HighlightExtension from './HighlightExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default defineExtension({
  name: 'highlight',
  type: 'mark',
  extension: HighlightExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
})
