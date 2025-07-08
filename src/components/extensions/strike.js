import TiptapStrike from '@tiptap/extension-strike'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'

const Strike = TiptapStrike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
          componentProps: {
            name: 'strike',
            isActive: () => editor.isActive('strike'),
            execute: () => editor.commands.toggleStrike(),
          },
        }
      },
    }
  },
})

export default Strike
