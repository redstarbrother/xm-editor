import BoldExtension from './BoldExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  name: 'bold',
  type: 'mark',
  extension: BoldExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
}