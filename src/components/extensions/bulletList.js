import TiptapBulletList from '@tiptap/extension-bullet-list'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'
import { iconMap } from '@/config/iconMap'

const BulletList = TiptapBulletList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
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
