import UnderlineExtension from './UnderlineExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  name: 'underline',
  type: 'mark',
  extension: UnderlineExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
}
