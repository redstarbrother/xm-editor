import ListExtension from './ListExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  extension: ListExtension,
  manifest: {
    name: 'list',
    title: 'List',
    fixedMenu,
    slashMenu
  }
}
