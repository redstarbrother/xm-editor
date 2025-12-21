import TtEmoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import { withSuggestion } from "@/components/menus/suggestion/withSuggestion";
import { emojiSuggestionConfig } from "./suggestion";


// TODO 使用defineAsyncComponent异步加载组件
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
