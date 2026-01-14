import { defineExtension } from '@/utils/extensionUtil'
import LinkExtension from './LinkExtension'
import { fixedMenu } from './menu'

export default defineExtension({
  name: 'link',
  type: 'mark',
  extension: LinkExtension,
  manifest: {
    fixedMenu
  }
})
