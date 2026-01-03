import { Minus } from 'lucide-vue-next';

export const fixedMenu = {
  icon: Minus,
  order: 110,
  label: "水平分割线",
  action: ({ editor }) => editor.chain().focus().setHorizontalRule().run(),
  isActive: ({ editor }) => editor.isActive('horizontalRule'),
};

export const slashMenu = {
  id: "horizontalRule",
  label: "水平分割线",
  icon: Minus,
  action: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHorizontalRule().run();
  },
};
