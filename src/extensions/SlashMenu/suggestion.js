export const suggestionConfig = {
  char: "/",

  items: function ({ query, editor }) {
    const slashExtension = editor.extensionManager.extensions.find(
      (ext) => ext.name === "slash-menu"
    );

    if (!slashExtension) {
      console.log("slashExtension not found");
      return [{ label: "DEBUG: slashExtension not found", id: "debug" }];
    }

    const itemList = slashExtension.options.items;

    if (!Array.isArray(itemList)) {
      console.log("items is not an array:", itemList);
      return [{ label: "DEBUG: not array", id: "debug" }];
    }

    if (itemList.length === 0) {
      return [{ label: "DEBUG: empty list", id: "debug", category: "调试" }];
    }

    return itemList.filter((item) => {
      return item.label.toLowerCase().includes(query.toLowerCase());
    });
  },

  command: ({ editor, range, props }) => {
    props.action({ editor, range });
  },
};