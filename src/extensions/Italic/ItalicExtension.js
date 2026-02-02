import { Italic } from '@tiptap/extension-italic'

const ItalicExtension = Italic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-italic',
      },
    }
  },
})
export default ItalicExtension
