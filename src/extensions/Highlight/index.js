import HighlightExtension from './HighlightExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  extension: HighlightExtension,
  manifest: {
    name: 'highlight',
    title: 'Highlight',
    fixedMenu,
    bubbleMenu
  }
}
