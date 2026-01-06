import { defineExtension } from '@/utils/extensionUtil'
import ItalicExtension from './ItalicExtension'
import { fixedMenu, bubbleMenu } from './menu'

export default defineExtension({
  name: 'italic',
  type: 'mark',
  extension: ItalicExtension,
  manifest: {
    fixedMenu,
    bubbleMenu
  }
})
