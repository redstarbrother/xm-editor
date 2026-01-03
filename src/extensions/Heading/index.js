import HeadingExtension from './HeadingExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  extension: HeadingExtension,
  manifest: {
    name: 'heading',
    title: 'Heading',
    fixedMenu,
    slashMenu
  }
}
