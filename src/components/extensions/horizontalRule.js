import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule'
import XmBaseButton from '../XmBaseButton.vue'

const HorizontalRule = TiptapHorizontalRule.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
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
