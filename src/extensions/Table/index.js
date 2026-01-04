import TableExtension from './TableExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  name: 'table',
  type: 'node',
  extension: TableExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
}
