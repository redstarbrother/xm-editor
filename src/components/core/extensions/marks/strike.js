import TiptapStrike from '@tiptap/extension-strike'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/config/iconMap'

const Strike = TiptapStrike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap['strike'],
            isActive: () => editor.isActive('strike'),
            execute: () => editor.commands.toggleStrike(),
          },
        }
      },
    }
  },
})

export default Strike
