import TtEmoji, { gitHubEmojis } from "@tiptap/extension-emoji";

const EmojiExtension = TtEmoji.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      emojis: gitHubEmojis,
      enableEmoticons: true,
    };
  },
});

export default EmojiExtension;
