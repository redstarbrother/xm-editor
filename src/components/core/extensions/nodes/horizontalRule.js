import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/components/setting/iconMap'

const HorizontalRule = TiptapHorizontalRule.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap['horizontalRule'],
            execute: () => editor.commands.setHorizontalRule(),
          },
        }
      },
    }
  },
})

export default HorizontalRule
