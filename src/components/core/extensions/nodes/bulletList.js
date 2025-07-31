import TiptapBulletList from '@tiptap/extension-bullet-list'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/config/iconMap'

const BulletList = TiptapBulletList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap['bulletList'],
            isActive: () => editor.isActive('bulletList'),
            execute: () => editor.commands.toggleBulletList(),
          },
        }
      },
    }
  },
})

export default BulletList
