import { Image } from 'lucide-vue-next';
import SubMenuImage from "./components/SubMenu.vue";

export const fixedMenu = {
  icon: Image,
  order: 120,
  label: "图片",
  isActive: ({ editor }) => editor.isActive('image'),
  // action is null/undefined to trigger sub-menu
  component: SubMenuImage,
  componentProps: {},
};

// export const slashMenu = {
//   id: "image",
//   label: "图片",
//   icon: Image,
//   action: ({ editor, range }) => {
//     // 触发 file input 或者显示 dialog (这里简单模拟点击菜单)
//     // 实际实现可能需要更复杂的交互，或者 reuse SubMenu
//     // 为了简单起见，这里可以先不做
//     editor.chain().focus().deleteRange(range).run();
//     // TODO: Trigger image upload dialog
//     // This might require a command that opens the fixed menu or a modal
//   },
// };
