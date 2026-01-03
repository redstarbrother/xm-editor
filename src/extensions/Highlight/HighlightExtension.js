import TiptapHighlight from "@tiptap/extension-highlight";

const HighlightExtension = TiptapHighlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
    };
  },
});

export default HighlightExtension;
