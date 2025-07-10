import TiptapImage from '@tiptap/extension-image'
import ImageButton from '@/components/menu/button/ImageButton.vue'

const Image = TiptapImage.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: ImageButton,
          componentProps: {
            name: 'image',
            execute: () => {},
            editor,
          },
        }
      },
    }
  },
})

export default Image
