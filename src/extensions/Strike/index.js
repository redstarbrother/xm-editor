import StrikeExtension from './StrikeExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  name: 'strike',
  type: 'mark',
  extension: StrikeExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
}
