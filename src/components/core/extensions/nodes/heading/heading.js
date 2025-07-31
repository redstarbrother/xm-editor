import TtHeading from '@tiptap/extension-heading'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/config/iconMap'

const Heading = TtHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
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
