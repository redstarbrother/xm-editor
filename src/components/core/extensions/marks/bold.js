import TiptapBold from '@tiptap/extension-bold'
import { iconMap } from '@/components/setting/iconMap'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'

const Bold = TiptapBold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
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
