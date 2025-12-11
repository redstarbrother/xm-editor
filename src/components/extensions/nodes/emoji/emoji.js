import TtEmoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import suggestion from "./suggestion";

const Emoji = TtEmoji.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      emojis: gitHubEmojis,
      enableEmoticons: true,
      suggestion,
    };
  },
});

export default Emoji;
