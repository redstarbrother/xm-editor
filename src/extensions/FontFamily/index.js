import { FontFamily } from '@tiptap/extension-text-style'
import { defineExtension } from '@/utils/extensionUtil'

export default defineExtension({
  name: 'fontFamily',
  type: 'extension',
  extension: FontFamily
})
