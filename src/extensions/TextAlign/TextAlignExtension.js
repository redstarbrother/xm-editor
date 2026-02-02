import TiptapTextAlign from '@tiptap/extension-text-align'

const TextAlignExtension = TiptapTextAlign.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      types: ['heading', 'paragraph'],
      HTMLAttributes: {
        class: 'xm-text-align',
      },
    }
  },
})

export default TextAlignExtension
