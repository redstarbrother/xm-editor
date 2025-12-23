import TiptapItalic from '@tiptap/extension-italic'
import fixedConfig from "./fixed";
import bubbleConfig from "./bubble";


const Italic = TiptapItalic.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      fixed: fixedConfig,
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
