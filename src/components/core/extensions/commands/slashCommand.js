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
        // 关键修改：使用闭包存储 items，而不是依赖 this
        items: function ({ query, editor }) {
          console.log("editor: ", editor);
          const slashExtension = editor.extensionManager.extensions.find(ext => ext.name === 'slash-command');
          const itemList = slashExtension.options.items
          console.log("slashExtension", JSON.stringify(slashExtension));
          console.log("itemList", JSON.stringify(itemList));
          

          
          // 直接从 SlashCommand.options 获取 items
          // const currentItems = SlashCommand.options.items || [];
          const currentItems = [
            {
              label: "blockquote",
              command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setBlockquote().run();
              },
            },
            {
              label: "code",
              command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setCode().run();
              },
            },
            {
              label: "heading",
              command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
              },
            },
          ];

          // 确保 items 是数组
          if (!Array.isArray(currentItems)) {
            console.log("items is not an array:", currentItems);
            return [];
          }

          // 过滤 items
          // return currentItems.filter(item => {
          //   return item && item.label && typeof item.label === 'string' &&
          //          item.label.toLowerCase().includes(query.toLowerCase());
          // });
          return itemList;
        },
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
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
