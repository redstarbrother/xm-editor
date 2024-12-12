import TiptapItalic from '@tiptap/extension-italic'
import XmBaseButton from '../XmBaseButton.vue'

const Italic = TiptapItalic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
          componentProps: {
            name: 'italic',
            isActive: () => editor.isActive('italic'),
            execute: () => editor.commands.toggleItalic(),
          },
        }
      },
    }
  },
})

export default Italic
