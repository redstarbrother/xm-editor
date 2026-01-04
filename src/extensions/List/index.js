import ListExtension from './ListExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  name: 'list',
  type: 'node',
  extension: ListExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
}
