import TiptapUnderline from '@tiptap/extension-underline'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/components/setting/iconMap'

const Underline = TiptapUnderline.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
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
