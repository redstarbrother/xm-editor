import TtEmoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import { withSuggestion } from "@/components/menus/suggestion/withSuggestion";
import { emojiSuggestionConfig } from "./suggestion";

const Emoji = withSuggestion(TtEmoji.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      emojis: gitHubEmojis,
      enableEmoticons: true,
    };
  },
}), emojiSuggestionConfig);

export default Emoji;
