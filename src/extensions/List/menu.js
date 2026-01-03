import { List, ListOrdered, CheckSquare } from 'lucide-vue-next';
import SubMenuList from "./components/SubMenu.vue";

export const fixedMenu = {
  icon: List,
  order: 80,
  label: "列表",
  isActive: ({ editor }) =>
    editor.isActive("taskList") ||
    editor.isActive("bulletList") ||
    editor.isActive("orderedList"),
  shouldShow: ({ editor }) =>
    !editor.state.selection.empty && editor.can().toggleList(), // Assuming toggleList is available or handled by sub-commands
  component: SubMenuList,
  componentProps: {
    items: [
      {
        id: "bulletList",
        icon: List,
        label: "无序列表",
        action: (editor) => editor.chain().focus().toggleBulletList().run(),
      },
      {
        id: "orderedList",
        icon: ListOrdered,
        label: "有序列表",
        action: (editor) => editor.chain().focus().toggleOrderedList().run(),
      },
      {
        id: "taskList",
        icon: CheckSquare,
        label: "任务列表",
        action: (editor) => editor.chain().focus().toggleTaskList().run(),
      },
    ],
  },
};

export const slashMenu = [
    {
        id: "bulletList",
        label: "无序列表",
        icon: List,
        action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
    },
    {
        id: "orderedList",
        label: "有序列表",
        icon: ListOrdered,
        action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
    },
    {
        id: "taskList",
        label: "任务列表",
        icon: CheckSquare,
        action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
    },
];
