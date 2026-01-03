import { Strikethrough } from 'lucide-vue-next'

export const fixedMenu = {
  icon: Strikethrough,
  order: 40,
  label: "删除线",
  action: ({ editor }) => editor.chain().focus().toggleStrike().run(),
  isActive: ({ editor }) => editor.isActive('strike'),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().toggleStrike(),
};

export const bubbleMenu = {
  icon: Strikethrough,
  label: "删除线",
  action: ({ editor }) => editor.chain().focus().toggleStrike().run(),
  isActive: ({ editor }) => editor.isActive('strike'),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().toggleStrike(),
};
