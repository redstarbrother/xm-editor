import { Bold } from 'lucide-vue-next'

export const fixedMenu = {
  icon: Bold,
  order: 10,
  label: 'Bold',
  action: ({ editor }) => editor.chain().focus().toggleBold().run(),
  isActive: ({ editor }) => editor.isActive('bold')
}

export const bubbleMenu = {
  icon: Bold,
  label: 'Bold',
  action: ({ editor }) => editor.chain().focus().toggleBold().run(),
  isActive: ({ editor }) => editor.isActive('bold'),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().toggleBold()
}
