import BlockquoteExtension from './BlockquoteExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  extension: BlockquoteExtension,
  manifest: {
    name: 'blockquote',
    title: 'Blockquote',
    fixedMenu,
    slashMenu
  }
}
