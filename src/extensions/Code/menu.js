import { Code } from 'lucide-vue-next'

export const fixedMenu = {
  icon: Code,
  order: 10,
  label: '代码',
  action: ({ editor }) => editor.chain().focus().toggleCode().run(),
  isActive: ({ editor }) => editor.isActive('code')
}

export const bubbleMenu = {
  icon: Code,
  label: '代码',
  action: ({ editor }) => editor.chain().focus().toggleCode().run(),
  isActive: ({ editor }) => editor.isActive('code'),
  shouldShow: ({ editor }) => !editor.state.selection.empty && editor.can().toggleCode()
}
