import { defineExtension } from '@/utils/extensionUtil'
import UnderlineExtension from './UnderlineExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default defineExtension({
  name: 'underline',
  type: 'mark',
  extension: UnderlineExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
})
