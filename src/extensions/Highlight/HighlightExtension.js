import TiptapHighlight from "@tiptap/extension-highlight";

const HighlightExtension = TiptapHighlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
      HTMLAttributes: {
        class: 'xm-highlight',
      },
    };
  },
});

export default HighlightExtension;
