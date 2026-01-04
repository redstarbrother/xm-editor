import BlockquoteExtension from './BlockquoteExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  name: 'blockquote',
  type: 'node',
  extension: BlockquoteExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
}
