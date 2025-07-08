import TiptapBold from '@tiptap/extension-bold'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'

const Bold = TiptapBold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
          componentProps: {
            name: 'bold',
            isActive: () => editor.isActive('bold'),
            execute: () => editor.commands.toggleBold(),
          },
        }
      },
    }
  },
})

export default Bold
