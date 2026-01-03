import StrikeExtension from './StrikeExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  extension: StrikeExtension,
  manifest: {
    name: 'strike',
    title: 'Strike',
    fixedMenu,
    bubbleMenu
  }
}
