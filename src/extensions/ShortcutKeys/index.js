import { defineExtension } from '@/utils/extensionUtil'
import ShortcutKeyExtension from './ShortcutKeyExtension'

export default defineExtension({
  name: 'shortcutKey',
  type: 'functionality',
  extension: ShortcutKeyExtension,
})
