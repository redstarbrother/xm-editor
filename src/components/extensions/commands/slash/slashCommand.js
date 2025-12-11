import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "@tiptap/pm/state";
import renderSlashMenu from "./renderSlashMenu";

const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      items: [], // 默认空数组
      suggestion: {
        pluginKey: new PluginKey('slashCommandSuggestion'),
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
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
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
