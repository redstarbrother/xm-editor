import TiptapHighlight from "@tiptap/extension-highlight";
import fixedConfig from "./fixed";

const Highlight = TiptapHighlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      multicolor: true,
      fixed: fixedConfig,
    };
  },
});

export default Highlight;
