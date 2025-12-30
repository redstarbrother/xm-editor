import SubMenuTextAlign from "./SubMenu.vue";
import iconManager from "@/components/icon/iconManager";

const name = "textAlign";
export default {
  id: name,
  icon: name,
  label: "文本对齐",
  type: 'mark',
  isActive: (editor) => editor.isActive(name),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleTextAlign("left"),
  component: SubMenuTextAlign,
  componentProps: {
    items: [
      {
        id: "alignLeft",
        icon: iconManager.getIconComponent("alignLeft"),
        label: "左对齐",
        action: (editor) =>
          editor.chain().focus().toggleTextAlign("left").run(),
      },
      {
        id: "alignCenter",
        icon: iconManager.getIconComponent("alignCenter"),
        label: "居中对齐",
        action: (editor) =>
          editor.chain().focus().toggleTextAlign("center").run(),
      },
      {
        id: "alignRight",
        icon: iconManager.getIconComponent("alignRight"),
        label: "右对齐",
        action: (editor) =>
          editor.chain().focus().toggleTextAlign("right").run(),
      },
      {
        id: "alignJustify",
        icon: iconManager.getIconComponent("alignJustify"),
        label: "两端对齐",
        action: (editor) =>
          editor.chain().focus().toggleTextAlign("justify").run(),
      },
    ],
  },
};
