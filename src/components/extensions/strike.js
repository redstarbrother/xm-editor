import TiptapStrike from '@tiptap/extension-strike'
import XmBaseButton from '../XmBaseButton.vue'

const Strike = TiptapStrike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
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
