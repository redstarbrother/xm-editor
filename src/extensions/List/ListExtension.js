import { Extension } from "@tiptap/core";
import { ListKit } from "@tiptap/extension-list";

const ListExtension = Extension.create({
  name: "list",
  addExtensions() {
    return [
      ListKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'xm-bullet-list',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'xm-ordered-list',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'xm-list-item',
          },
        },
        taskItem: {
          nested: true,
          HTMLAttributes: {
            class: 'xm-task-item',
          },
        },
      }),
    ];
  },
});

export default ListExtension;
