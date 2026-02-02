import TiptapStrike from '@tiptap/extension-strike'

const StrikeExtension = TiptapStrike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-strike',
      },
    }
  },
})

export default StrikeExtension;
