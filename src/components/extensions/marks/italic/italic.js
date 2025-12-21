import TiptapItalic from '@tiptap/extension-italic'
import bubbleConfig from './bubble'
import UniversalButton from '@/components/buttons/base/UniversalButton.vue'
import { iconMap } from '@/components/setting/iconMap'

const name = 'italic'

const Italic = TiptapItalic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap[name],
            isActive: () => editor.isActive(name),
            execute: () => editor.chain().focus().toggleItalic().run(),
          },
        }
      },
      bubble: bubbleConfig,
      // slash: () => ({
      //   label: "斜体",
      //   icon: iconMap[name],
      //   command: ({ editor, range }) => {
      //     editor.chain().focus().deleteRange(range).toggleItalic().run();
      //   },
      // }),
    }
  },
})

export default Italic
