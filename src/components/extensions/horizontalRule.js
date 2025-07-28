import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'
import { iconMap } from '@/config/iconMap'

const HorizontalRule = TiptapHorizontalRule.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
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
