import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-vue-next';
import SubMenuTextAlign from "./components/SubMenu.vue";

export const fixedMenu = {
  icon: AlignLeft,
  order: 60,
  label: "文本对齐",
  isActive: ({ editor }) => editor.isActive({ textAlign: 'left' }) || editor.isActive({ textAlign: 'center' }) || editor.isActive({ textAlign: 'right' }) || editor.isActive({ textAlign: 'justify' }),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().setTextAlign("left"),
  component: SubMenuTextAlign,
  componentProps: {
    items: [
      {
        id: "alignLeft",
        icon: AlignLeft,
        label: "左对齐",
        action: (editor) =>
          editor.chain().focus().setTextAlign("left").run(),
      },
      {
        id: "alignCenter",
        icon: AlignCenter,
        label: "居中对齐",
        action: (editor) =>
          editor.chain().focus().setTextAlign("center").run(),
      },
      {
        id: "alignRight",
        icon: AlignRight,
        label: "右对齐",
        action: (editor) =>
          editor.chain().focus().setTextAlign("right").run(),
      },
      {
        id: "alignJustify",
        icon: AlignJustify,
        label: "两端对齐",
        action: (editor) =>
          editor.chain().focus().setTextAlign("justify").run(),
      },
    ],
  }
};

export const bubbleMenu = null;
