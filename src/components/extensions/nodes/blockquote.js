import TiptapBlockquote from '@tiptap/extension-blockquote'
import UniversalButton from '@/components/buttons/base/UniversalButton.vue'
import { iconMap } from '@/components/setting/iconMap'

const name = 'blockquote'

const Blockquote = TiptapBlockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap[name],
            isActive: () => editor.isActive(name),
            execute: () => editor.chain().focus().toggleBlockquote().run(),
          },
        }
      },
      slash: () => ({
        label: "引用",
        icon: iconMap[name],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
      }),
    }
  },
})

export default Blockquote
