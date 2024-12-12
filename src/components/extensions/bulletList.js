import TiptapBulletList from '@tiptap/extension-bullet-list'
import XmBaseButton from '../XmBaseButton.vue'

const BulletList = TiptapBulletList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
          componentProps: {
            name: 'bulletList',
            isActive: () => editor.isActive('bulletList'),
            execute: () => editor.commands.toggleBulletList(),
          },
        }
      },
    }
  },
})

export default BulletList
