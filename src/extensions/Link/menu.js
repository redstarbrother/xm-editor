import { Link } from 'lucide-vue-next';
import SubMenuLink from "./components/SubMenu.vue";

export const fixedMenu = {
  icon: Link,
  order: 60,
  label: "链接",
  isActive: ({ editor }) => editor.isActive('link'),
  shouldShow: ({ editor }) => editor.isEditable,
  component: SubMenuLink,
  componentProps: {},
};
