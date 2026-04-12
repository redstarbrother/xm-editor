import TiptapHeading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

const HeadingExtension = TiptapHeading.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-heading',
      },
    }
  },
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level = hasLevel
      ? node.attrs.level
      : this.options.levels[0]

    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: `xm-h${level}` }), 0]
  },
});

export default HeadingExtension;
