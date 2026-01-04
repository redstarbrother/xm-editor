import ItalicExtension from './ItalicExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  name: 'italic',
  type: 'mark',
  extension: ItalicExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
}
