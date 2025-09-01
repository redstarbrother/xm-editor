import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// load all highlight.js languages
import { createLowlight, all } from 'lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CodeBlockComponent from './CodeBlockComponent.vue'
import UniversalButton from '@/components/buttons/base/UniversalButton.vue'
import { iconMap } from '@/components/setting/iconMap'

// 加载代码块样式
// TODO 变为可动态更过css文件
import '@/styles/codeBlock/github-dark.css'

const lowlight = createLowlight(all)
const name = 'codeBlock'

const CodeBlock = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap[name],
            isActive: () => editor.isActive(name),
            execute: () => editor.commands.toggleCodeBlock(),
          },
        }
      },
      slash: () => ({
        label: "代码块",
        icon: iconMap[name],
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setCodeBlock().run();
        },
      }),
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockComponent)
  },
}).configure({ lowlight, defaultLanguage: null })

export default CodeBlock
