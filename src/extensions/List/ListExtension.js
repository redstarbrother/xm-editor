import { Extension } from "@tiptap/core";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { ListItem } from "@tiptap/extension-list-item";

const ListExtension = Extension.create({
  name: 'list',
  addExtensions() {
    return [
      BulletList,
      OrderedList,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      ListItem,
    ];
  },
});

export default ListExtension;
