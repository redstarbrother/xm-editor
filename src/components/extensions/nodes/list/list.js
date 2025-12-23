import { Extension } from "@tiptap/core";
import { BulletList, OrderedList, TaskList, TaskItem, ListItem } from "@tiptap/extension-list";
import fixedConfig from "./fixed";
import slashConfig from "./slash"

const name = 'list'

const List = Extension.create({
  name: name,
  addExtensions() {
    return [
      BulletList,
      OrderedList,
      TaskList,
      TaskItem,
      ListItem,
    ];
  },
  addOptions() {
    return {
      ...this.parent?.(),
      fixed: fixedConfig,
      slash: slashConfig,
    };
  },
});


export default List;
