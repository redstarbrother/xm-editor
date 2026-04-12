import TtEmoji, { gitHubEmojis } from "@tiptap/extension-emoji";

const EmojiExtension = TtEmoji.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      emojis: gitHubEmojis,
      enableEmoticons: true,
      HTMLAttributes: {
        class: 'xm-emoji',
      },
    };
  },
});

export default EmojiExtension;
