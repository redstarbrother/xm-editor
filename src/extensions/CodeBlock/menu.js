import { FileCode } from 'lucide-vue-next';

export const fixedMenu = {
  icon: FileCode,
  order: 100,
  label: "代码块",
  action: ({ editor }) => editor.chain().focus().toggleCodeBlock().run(),
  isActive: ({ editor }) => editor.isActive('codeBlock'),
};

export const slashMenu = {
  id: "codeBlock",
  label: "代码块",
  icon: FileCode,
  action: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setCodeBlock().run();
  },
};
