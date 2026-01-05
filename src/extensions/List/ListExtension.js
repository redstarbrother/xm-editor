import { Extension } from "@tiptap/core";
import { ListKit } from "@tiptap/extension-list";

const ListExtension = Extension.create({
  name: "list",
  addExtensions() {
    return [
      ListKit.configure({
        taskItem: {
          nested: true,
        },
      }),
    ];
  },
});

export default ListExtension;
