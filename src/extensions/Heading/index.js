import HeadingExtension from './HeadingExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  name: 'heading',
  type: 'node',
  extension: HeadingExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
}
