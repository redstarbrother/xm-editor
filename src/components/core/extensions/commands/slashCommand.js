import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import renderSlashMenu from "./renderSlashMenu";

const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      items: [], // 默认空数组
      suggestion: {
        char: "/",
        items: function ({ query, editor }) {
          console.log("query: ", query);
          const slashExtension = editor.extensionManager.extensions.find(
            (ext) => ext.name === "slash-command"
          );
          const itemList = slashExtension.options.items;

          // 确保 items 是数组
          if (!Array.isArray(itemList)) {
            console.log("items is not an array:", itemList);
            return [];
          }

          return itemList.filter((item) => {
            return item.label.toLowerCase().includes(query.toLowerCase());
          });
        },
        render: renderSlashMenu,
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default SlashCommand;
