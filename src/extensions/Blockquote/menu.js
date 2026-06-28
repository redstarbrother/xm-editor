import { Quote } from 'lucide-vue-next';

export const fixedMenu = {
  icon: Quote,
  order: 90,
  label: "引用",
  action: ({ editor }) => editor.chain().focus().toggleBlockquote().run(),
  isActive: ({ editor }) => editor.isActive('blockquote'),
};

export const slashMenu = {
  id: "blockquote",
  label: "引用",
  category: "高级",
  description: "插入一段引用的文字",
  icon: Quote,
  action: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleBlockquote().run();
  },
};
