import { Extension } from "@tiptap/core";
import { BulletList, OrderedList, TaskList, TaskItem, ListItem } from "@tiptap/extension-list";
import ListButton from "@/components/core/menu/button/listButton.vue";
import { iconMap } from "@/components/setting/iconMap";

const List = Extension.create({
  name: "list",
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
      button({ editor }) {
        return {
          component: ListButton,
          componentProps: {
            icon: iconMap["list"],
            isActive: () =>
              editor.isActive("taskList") ||
              editor.isActive("bulletList") ||
              editor.isActive("orderedList"),
            execute: () => {},
            editor: editor,
          },
        };
      },
    };
  },
});


export default List;
