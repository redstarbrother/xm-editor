import ImageExtension from './ImageExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  extension: ImageExtension,
  manifest: {
    name: 'image',
    title: 'Image',
    fixedMenu,
    slashMenu
  }
}
