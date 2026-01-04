import HighlightExtension from './HighlightExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  name: 'highlight',
  type: 'mark',
  extension: HighlightExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
}
