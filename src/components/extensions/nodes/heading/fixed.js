import SubMenuHeading from "./SubMenu.vue";
import iconManager from "@/components/icon/iconManager";

const name = "heading";
export default {
  id: name,
  icon: name,
  label: "标题",
  type: 'node',
  isActive: (editor) => editor.isActive(name),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleHeading,
  component: SubMenuHeading,
  componentProps: {
    items: [
      {
        id: "heading1", 
        icon: iconManager.getIconComponent("heading1"),
        label: "一级标题",
        action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        id: "heading2",
        icon: iconManager.getIconComponent("heading2"),
        label: "二级标题",
        action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        id: "heading3",
        icon: iconManager.getIconComponent("heading3"),
        label: "三级标题",
        action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      },
    ],
  },
};
