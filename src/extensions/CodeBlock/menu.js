import { Code } from 'lucide-vue-next';

export const fixedMenu = {
  icon: Code,
  order: 100,
  label: "代码块",
  action: ({ editor }) => editor.chain().focus().toggleCodeBlock().run(),
  isActive: ({ editor }) => editor.isActive('codeBlock'),
};

export const slashMenu = {
  id: "codeBlock",
  label: "代码块",
  icon: Code,
  action: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setCodeBlock().run();
  },
};
