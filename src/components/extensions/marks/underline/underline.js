import TiptapUnderline from '@tiptap/extension-underline'
import bubbleConfig from './bubble'
import fixedConfig from './fixed'

const Underline = TiptapUnderline.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      fixed: fixedConfig,
      bubble: bubbleConfig,
      // slash: () => ({
      //   label: "下划线",
      //   icon: iconMap[name],
      //   command: ({ editor, range }) => {
      //     editor.chain().focus().deleteRange(range).toggleUnderline().run();
      //   },
      // }),
    }
  },
})

export default Underline
