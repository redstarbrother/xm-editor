import { LineHeight } from '@tiptap/extension-text-style'
import { defineExtension } from '@/utils/extensionUtil'

export default defineExtension({
  name: 'lineHeight',
  type: 'extension',
  extension: LineHeight
})
