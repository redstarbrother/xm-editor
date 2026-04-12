import { Bold } from '@tiptap/extension-bold'

const BoldExtension = Bold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-bold',
      },
    }
  },
})
export default BoldExtension
