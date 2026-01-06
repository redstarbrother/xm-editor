import { defineExtension } from '@/utils/extensionUtil'
import GlobalTabExtension from './GlobalTabExtension'

export default defineExtension({
  name: 'globalTab',
  type: 'shortcut',
  extension: GlobalTabExtension,
})
