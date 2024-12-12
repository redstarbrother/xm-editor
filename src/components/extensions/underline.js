import TiptapUnderline from '@tiptap/extension-underline'
import XmBaseButton from '../XmBaseButton.vue'

const Underline = TiptapUnderline.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
          componentProps: {
            name: 'underline',
            isActive: () => editor.isActive('underline'),
            execute: () => editor.commands.toggleUnderline(),
          },
        }
      },
    }
  },
})

export default Underline
