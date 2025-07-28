import TiptapBlockquote from '@tiptap/extension-blockquote'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'
import { iconMap } from '@/config/iconMap'

const Blockquote = TiptapBlockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
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
