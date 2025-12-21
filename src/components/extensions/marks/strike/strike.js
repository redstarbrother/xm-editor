import TiptapStrike from '@tiptap/extension-strike'
import bubbleConfig from './bubble'
import UniversalButton from '@/components/buttons/base/UniversalButton.vue'
import { iconMap } from '@/components/setting/iconMap'

const name = 'strike'

const Strike = TiptapStrike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap[name],
            isActive: () => editor.isActive(name),
            execute: () => editor.chain().focus().toggleStrike().run(),
          },
        }
      },
      bubble: bubbleConfig,
      // slash: () => ({
      //   label: "删除线",
      //   icon: iconMap[name],
      //   command: ({ editor, range }) => {
      //     editor.chain().focus().deleteRange(range).toggleStrike().run();
      //   },
      // }),
    }
  },
})

export default Strike
