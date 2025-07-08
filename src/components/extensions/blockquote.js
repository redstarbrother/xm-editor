import TiptapBlockquote from '@tiptap/extension-blockquote'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'

const Blockquote = TiptapBlockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
          componentProps: {
            name: 'blockquote',
            isActive: () => editor.isActive('blockquote'),
            execute: () => editor.commands.toggleBlockquote(),
          },
        }
      },
    }
  },
})

export default Blockquote
