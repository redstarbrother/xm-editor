import HorizontalRuleExtension from './HorizontalRuleExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  extension: HorizontalRuleExtension,
  manifest: {
    name: 'horizontalRule',
    title: 'Horizontal Rule',
    fixedMenu,
    slashMenu
  }
}
