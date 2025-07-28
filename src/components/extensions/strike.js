import TiptapStrike from '@tiptap/extension-strike'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'
import { iconMap } from '@/config/iconMap'

const Strike = TiptapStrike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
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
