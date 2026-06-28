import { Heading, Heading1, Heading2, Heading3 } from 'lucide-vue-next';
import SubMenuHeading from "./components/SubMenu.vue";

export const fixedMenu = {
  icon: Heading,
  order: 70,
  label: "标题",
  isActive: ({ editor }) => editor.isActive('heading'),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().toggleHeading(),
  component: SubMenuHeading,
  componentProps: {
    items: [
      {
        id: "heading1", 
        icon: Heading1,
        label: "一级标题",
        action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        id: "heading2",
        icon: Heading2,
        label: "二级标题",
        action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        id: "heading3",
        icon: Heading3,
        label: "三级标题",
        action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      },
    ],
  },
};

export const slashMenu = [
  {
    id: "heading1",
    label: "一级标题",
    category: "基础",
    description: "用于页面主标题",
    icon: Heading1,
    action: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleHeading({ level: 1 }).run();
    },
  },
  {
    id: "heading2",
    label: "二级标题",
    category: "基础",
    description: "用于小节标题",
    icon: Heading2,
    action: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleHeading({ level: 2 }).run();
    },
  },
  {
    id: "heading3",
    label: "三级标题",
    category: "基础",
    description: "用于子小节标题",
    icon: Heading3,
    action: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleHeading({ level: 3 }).run();
    },
  },
];
