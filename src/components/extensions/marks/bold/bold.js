import TiptapBold from "@tiptap/extension-bold";
import bubbleConfig from "./bubble";
import fixedConfig from "./fixed";

const Bold = TiptapBold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      fixed: fixedConfig,
      bubble: bubbleConfig,
    };
  },
});

export default Bold;
