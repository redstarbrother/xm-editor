import UnderlineExtension from './UnderlineExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  extension: UnderlineExtension,
  manifest: {
    name: 'underline',
    title: 'Underline',
    fixedMenu,
    bubbleMenu
  }
}
