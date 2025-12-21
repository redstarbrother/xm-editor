import SubMenuHeading from "./SubMenu.vue";
import { iconMap } from "@/components/setting/iconMap";

let name = "heading";
export default {
  id: name,
  icon: name,
  label: "标题",
  priority: 100,
  isActive: (editor) => editor.isActive(name),
  action: (editor) => {},
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleHeading({ level: 1 }),
  component: SubMenuHeading,
  componentProps: {
    items: [
      {
        id: "heading1", 
        icon: iconMap["heading1"],
        iconType: "svg",
        label: "一级标题",
        action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        id: "heading2",
        icon: iconMap["heading2"],
        iconType: "svg",
        label: "二级标题",
        action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        id: "heading3",
        icon: iconMap["heading3"],
        iconType: "svg",
        label: "三级标题",
        action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      },
    ],
  },
};
