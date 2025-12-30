export const slashSuggestionConfig = {
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
    console.log("itemList:", itemList);

    return itemList.filter((item) => {
      return item.label.toLowerCase().includes(query.toLowerCase());
    });
  },

  command: ({ editor, range, props }) => {
    props.command({ editor, range });
  },
};
