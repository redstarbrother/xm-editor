export const suggestionConfig = {
  char: "/",

  items: function ({ query, editor }) {
    const slashExtension = editor.extensionManager.extensions.find(
      (ext) => ext.name === "slash-menu"
    );

    if (!slashExtension) {
      console.log("slashExtension not found");
      return [];
    }

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

  command: ({ editor, range, props }) => {
    props.action({ editor, range });
  },
};