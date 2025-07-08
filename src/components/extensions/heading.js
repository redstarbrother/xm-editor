import TtHeading from '@tiptap/extension-heading'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'

const Heading = TtHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
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
