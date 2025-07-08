import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'

const HorizontalRule = TiptapHorizontalRule.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
          componentProps: {
            name: 'horizontalrule',
            execute: () => editor.commands.setHorizontalRule(),
          },
        }
      },
    }
  },
})

export default HorizontalRule
