import TtEmoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import { withSuggestion } from "@/components/menus/suggestion/withSuggestion";
import { emojiSuggestion } from "./suggestion";

const Emoji = withSuggestion(TtEmoji.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      emojis: gitHubEmojis,
      enableEmoticons: true,
    };
  },
}), emojiSuggestion);

export default Emoji;
