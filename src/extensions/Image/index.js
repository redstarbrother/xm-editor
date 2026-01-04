import ImageExtension from './ImageExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  name: 'image',
  type: 'node',
  extension: ImageExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
}
