import TiptapBlockquote from '@tiptap/extension-blockquote'
import XmBaseButton from '../XmBaseButton.vue'

const Blockquote = TiptapBlockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
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
