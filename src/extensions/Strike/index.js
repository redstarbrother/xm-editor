import { defineExtension } from '@/utils/extensionUtil'
import StrikeExtension from './StrikeExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default defineExtension({
  name: 'strike',
  type: 'mark',
  extension: StrikeExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
})
