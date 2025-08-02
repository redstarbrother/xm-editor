import TtHeading from '@tiptap/extension-heading'
import HeadingButton from '@/components/core/menu/button/HeadingButton.vue'
import { iconMap } from '@/components/setting/iconMap'

const Heading = TtHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: HeadingButton,
          componentProps: {
            icon: iconMap['heading'],
            isActive: () => editor.isActive('heading'),
            editor: editor
          },
        }
      },
    }
  },
})

export default Heading
