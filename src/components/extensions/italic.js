import TiptapItalic from '@tiptap/extension-italic'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'

const Italic = TiptapItalic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
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
