import TiptapImage from '@tiptap/extension-image'
import ImageButton from '@/components/menu/button/ImageButton.vue'
import ImageView from '@/components/extensions/image/ImageView.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

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
    addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '300px',
      },
      height: {
        default: 'auto',
      },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageView)
  },
})

export default Image
