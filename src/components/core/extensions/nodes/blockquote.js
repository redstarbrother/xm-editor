import TiptapBlockquote from '@tiptap/extension-blockquote'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/config/iconMap'

const Blockquote = TiptapBlockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap['blockquote'],
            isActive: () => editor.isActive('blockquote'),
            execute: () => editor.commands.toggleBlockquote(),
          },
        }
      },
    }
  },
})

export default Blockquote
