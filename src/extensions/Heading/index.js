import { defineExtension } from '@/utils/extensionUtil'
import HeadingExtension from './HeadingExtension'
import { fixedMenu, slashMenu } from './menu'

export default defineExtension({
  name: 'heading',
  type: 'node',
  extension: HeadingExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
})
