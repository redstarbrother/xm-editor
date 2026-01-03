import TextAlignExtension from './TextAlignExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  extension: TextAlignExtension,
  manifest: {
    name: 'textAlign',
    title: 'Text Align',
    fixedMenu,
    bubbleMenu
  }
}
