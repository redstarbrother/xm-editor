import TiptapCode from '@tiptap/extension-code'

const CodeExtension = TiptapCode.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-code',
      },
    }
  },
})
export default CodeExtension
