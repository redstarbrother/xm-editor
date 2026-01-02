import { Italic } from 'lucide-vue-next'

export const fixedMenu = {
  icon: Italic,
  order: 20,
  label: 'Italic',
  action: ({ editor }) => editor.chain().focus().toggleItalic().run(),
  isActive: ({ editor }) => editor.isActive('italic')
}

export const bubbleMenu = {
  icon: Italic,
  label: 'Italic',
  action: ({ editor }) => editor.chain().focus().toggleItalic().run(),
  isActive: ({ editor }) => editor.isActive('italic'),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().toggleItalic()
}
