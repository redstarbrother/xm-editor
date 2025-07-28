import TiptapOrderedList from '@tiptap/extension-ordered-list'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'
import { iconMap } from '@/config/iconMap'

const OrderedList = TiptapOrderedList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
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
