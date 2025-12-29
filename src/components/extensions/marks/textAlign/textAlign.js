import TiptapTextAlign from '@tiptap/extension-text-align'
import fixedConfig from './fixed'

const TextAlign = TiptapTextAlign.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      types: ['heading', 'paragraph'],
      fixed: fixedConfig,
    }
  },
})

export default TextAlign
