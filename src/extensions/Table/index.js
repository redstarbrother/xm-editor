import TableExtension from './TableExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  extension: TableExtension,
  manifest: {
    name: 'table',
    title: 'Table',
    fixedMenu,
    slashMenu
  }
}
