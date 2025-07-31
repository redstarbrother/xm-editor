import TiptapItalic from '@tiptap/extension-italic'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/config/iconMap'

const Italic = TiptapItalic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap['italic'],
            isActive: () => editor.isActive('italic'),
            execute: () => editor.commands.toggleItalic(),
          },
        }
      },
    }
  },
})

export default Italic
