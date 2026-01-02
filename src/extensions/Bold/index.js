import BoldExtension from './BoldExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  extension: BoldExtension,
  manifest: {
    name: 'bold',
    title: 'Bold',
    fixedMenu,
    bubbleMenu
  }
}