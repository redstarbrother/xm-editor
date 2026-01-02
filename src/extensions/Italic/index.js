import ItalicExtension from './ItalicExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default {
  extension: ItalicExtension,
  manifest: {
    name: 'italic',
    title: 'Italic',
    fixedMenu,
    bubbleMenu
  }
}
