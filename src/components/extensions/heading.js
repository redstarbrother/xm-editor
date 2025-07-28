import TtHeading from '@tiptap/extension-heading'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'
import { iconMap } from '@/config/iconMap'

const Heading = TtHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
          componentProps: {
            icon: iconMap['heading'],
            isActive: () => editor.isActive('heading'),
          },
        }
      },
    }
  },
})

export default Heading
