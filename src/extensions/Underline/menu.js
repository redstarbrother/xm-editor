import { Underline } from 'lucide-vue-next'

export const fixedMenu = {
  icon: Underline,
  order: 30,
  label: "下划线",
  action: ({ editor }) => editor.chain().focus().toggleUnderline().run(),
  isActive: ({ editor }) => editor.isActive('underline'),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().toggleUnderline(),
};

export const bubbleMenu = {
  icon: Underline,
  label: "下划线",
  action: ({ editor }) => editor.chain().focus().toggleUnderline().run(),
  isActive: ({ editor }) => editor.isActive('underline'),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().toggleUnderline(),
};
