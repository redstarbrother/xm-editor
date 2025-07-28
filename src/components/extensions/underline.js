import TiptapUnderline from '@tiptap/extension-underline'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'
import { iconMap } from '@/config/iconMap'

const Underline = TiptapUnderline.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
          componentProps: {
            icon: iconMap['underline'],
            isActive: () => editor.isActive('underline'),
            execute: () => editor.commands.toggleUnderline(),
          },
        }
      },
    }
  },
})

export default Underline
