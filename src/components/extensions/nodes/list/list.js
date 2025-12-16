import { Extension } from "@tiptap/core";
import { BulletList, OrderedList, TaskList, TaskItem, ListItem } from "@tiptap/extension-list";
import ListButton from "@/components/buttons/custom/listButton.vue";
import { iconMap } from "@/components/setting/iconMap";

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
      button({ editor }) {
        return {
          component: ListButton,
          componentProps: {
            icon: iconMap[name],
            isActive: () =>
              editor.isActive("taskList") ||
              editor.isActive("bulletList") ||
              editor.isActive("orderedList"),
            execute: () => {},
            editor: editor,
          },
        };
      },
      slash: () => (
        [
          {
            id: 'bulletList',
            iconType: 'svg',
            label: '无序列表',
            icon: iconMap['bulletList'],
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).toggleBulletList().run();
            },
          },
          {
            id: 'orderedList',
            iconType: 'svg',
            label: '有序列表',
            icon: iconMap['orderedList'],
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).toggleOrderedList().run();
            },
          },
          {
            id: 'taskList',
            iconType: 'svg',
            label: '任务列表',
            icon: iconMap['taskList'],
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).toggleTaskList().run();
            },
          },
        ]
      ),
    };
  },
});


export default List;
