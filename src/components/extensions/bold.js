import TiptapBold from '@tiptap/extension-bold'
import XmBaseButton from '../XmBaseButton.vue'

const Bold = TiptapBold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
          componentProps: {
            name: 'bold',
            isActive: () => editor.isActive('bold'),
            execute: () => editor.commands.toggleBold(),
          },
        }
      },
    }
  },
})

export default Bold
