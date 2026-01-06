import { defineExtension } from '@/utils/extensionUtil'
import BoldExtension from './BoldExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default defineExtension({
  name: 'bold',
  type: 'mark',
  extension: BoldExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
})
