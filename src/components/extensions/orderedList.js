import TiptapOrderedList from '@tiptap/extension-ordered-list'
import XmBaseButton from '../XmBaseButton.vue'

const OrderedList = TiptapOrderedList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
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
