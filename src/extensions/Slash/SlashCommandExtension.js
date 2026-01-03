import { Extension } from "@tiptap/core";
import { withSuggestion } from "@/components/menus/suggestion/withSuggestion";
import { slashSuggestionConfig } from "./slashSuggestionConfig";

const SlashCommandExtension = withSuggestion(Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      ...this.parent?.(),
      items: [], // 默认空数组
    };
  },
}), slashSuggestionConfig);

export default SlashCommandExtension;