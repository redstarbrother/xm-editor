import HorizontalRuleExtension from './HorizontalRuleExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  name: 'horizontalRule',
  type: 'node',
  extension: HorizontalRuleExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
}
