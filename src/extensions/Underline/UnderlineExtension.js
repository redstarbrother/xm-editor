import TiptapUnderline from '@tiptap/extension-underline'

const UnderlineExtension = TiptapUnderline.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-underline',
      },
    }
  },
})

export default UnderlineExtension;
