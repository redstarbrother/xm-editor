import SubMenuList from "./SubMenu.vue";
import iconManager from "@/components/icon/iconManager";

const name = "list";
export default {
  id: name,
  icon: name,
  label: "列表",
  type: 'node',
  isActive: (editor) =>
    editor.isActive("taskList") ||
    editor.isActive("bulletList") ||
    editor.isActive("orderedList"),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleList,
  component: SubMenuList,
  componentProps: {
    items: [
      {
        id: "bulletList",
        icon: iconManager.getIconComponent("bulletList"),
        label: "无序列表",
        action: (editor) => editor.chain().focus().toggleBulletList().run(),
      },
      {
        id: "orderedList",
        icon: iconManager.getIconComponent("orderedList"),
        label: "有序列表",
        action: (editor) => editor.chain().focus().toggleOrderedList().run(),
      },
      {
        id: "taskList",
        icon: iconManager.getIconComponent("taskList"),
        label: "任务列表",
        action: (editor) => editor.chain().focus().toggleTaskList().run(),
      },
    ],
  },
};
