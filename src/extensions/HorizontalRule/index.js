import { defineExtension } from '@/utils/extensionUtil'
import HorizontalRuleExtension from './HorizontalRuleExtension'
import { fixedMenu, slashMenu } from './menu'

export default defineExtension({
  name: 'horizontalRule',
  type: 'node',
  extension: HorizontalRuleExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
})
