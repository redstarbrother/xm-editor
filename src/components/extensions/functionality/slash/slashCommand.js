import { Extension } from "@tiptap/core";
import { withSuggestion } from "@/components/menus/suggestion/withSuggestion";
import { slashSuggestionConfig } from "./suggestion";

const SlashCommand = withSuggestion(Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      ...this.parent?.(),
      items: [], // 默认空数组
    };
  },
}), slashSuggestionConfig);

export default SlashCommand;