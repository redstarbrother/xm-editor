import { Highlighter } from 'lucide-vue-next';
import SubMenuHighlight from "./components/SubMenu.vue";

export const fixedMenu = {
  icon: Highlighter,
  order: 50,
  label: "高亮",
  isActive: ({ editor }) => editor.isActive('highlight'),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().toggleHighlight(),
  component: SubMenuHighlight,
  componentProps: {
    // Optional props for SubMenu
  }
};

export const bubbleMenu = null;
