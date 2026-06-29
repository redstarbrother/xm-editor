import { TextStyle } from '@tiptap/extension-text-style'
import { defineExtension } from '@/utils/extensionUtil'

export default defineExtension({
  name: 'textStyle',
  type: 'extension',
  extension: TextStyle
})
