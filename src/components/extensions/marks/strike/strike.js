import TiptapStrike from '@tiptap/extension-strike'
import bubbleConfig from './bubble'
import fixedConfig from './fixed'

const Strike = TiptapStrike.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      fixed: fixedConfig,
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
