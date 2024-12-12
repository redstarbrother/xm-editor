import TtHeading from '@tiptap/extension-heading'
import XmBaseButton from '@/components/XmBaseButton.vue'

const Heading = TtHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
          componentProps: {
            name: 'heading',
            isActive: () => editor.isActive('heading'),
          },
        }
      },
    }
  },
})

export default Heading
