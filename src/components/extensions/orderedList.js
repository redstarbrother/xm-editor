import TiptapOrderedList from '@tiptap/extension-ordered-list'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'

const OrderedList = TiptapOrderedList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
          componentProps: {
            name: 'orderedList',
            isActive: () => editor.isActive('orderedList'),
            execute: () => editor.commands.toggleOrderedList(),
          },
        }
      },
    }
  },
})

export default OrderedList
