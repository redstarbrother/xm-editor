import { defineExtension } from '@/utils/extensionUtil'
import ImageExtension from './ImageExtension'
import { fixedMenu, slashMenu } from './menu'

export default defineExtension({
  name: 'image',
  type: 'node',
  extension: ImageExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
})
