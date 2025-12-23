import iconManager from "@/components/icon/iconManager";

export default () => [
  {
    id: "bulletList",
    iconType: "svg",
    label: "无序列表",
    icon: iconManager.getIconComponent("bulletList"),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    id: "orderedList",
    iconType: "svg",
    label: "有序列表",
    icon: iconManager.getIconComponent("orderedList"),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    id: "taskList",
    iconType: "svg",
    label: "任务列表",
    icon: iconManager.getIconComponent("taskList"),
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
];
