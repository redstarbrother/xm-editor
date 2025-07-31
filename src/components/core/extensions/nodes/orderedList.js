import TiptapOrderedList from '@tiptap/extension-ordered-list'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/config/iconMap'

const OrderedList = TiptapOrderedList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap['orderedList'],
            isActive: () => editor.isActive('orderedList'),
            execute: () => editor.commands.toggleOrderedList(),
          },
        }
      },
    }
  },
})

export default OrderedList
