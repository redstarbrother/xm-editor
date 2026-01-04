import TextAlignExtension from './TextAlignExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  name: 'textAlign',
  type: 'mark',
  extension: TextAlignExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
}
