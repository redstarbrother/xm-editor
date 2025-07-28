import TiptapBold from '@tiptap/extension-bold'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'
import { iconMap } from '@/config/iconMap'

const Bold = TiptapBold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
          componentProps: {
            icon: iconMap['bold'],
            isActive: () => editor.isActive('bold'),
            execute: () => editor.commands.toggleBold(),
          },
        }
      },
    }
  },
})

export default Bold
