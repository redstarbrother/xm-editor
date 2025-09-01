import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule'
import UniversalButton from '@/components/buttons/base/UniversalButton.vue'
import { iconMap } from '@/components/setting/iconMap'

const name = 'horizontalRule'

const HorizontalRule = TiptapHorizontalRule.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap[name],
            execute: () => editor.commands.setHorizontalRule(),
          },
        }
      },
      slash: () => ({
        label: "水平分割线",
        icon: iconMap[name],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
      }),
    }
  },
})

export default HorizontalRule
