import TtEmoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import { withSuggestion } from "@/components/menus/suggestion/withSuggestion";
import { emojiSuggestionConfig } from "./utils";

const EmojiExtension = withSuggestion(TtEmoji.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      emojis: gitHubEmojis,
      enableEmoticons: true,
    };
  },
}), emojiSuggestionConfig);

export default EmojiExtension;
