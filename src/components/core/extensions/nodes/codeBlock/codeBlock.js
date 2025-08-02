import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// load all highlight.js languages
import { createLowlight, all } from 'lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CodeBlockComponent from './CodeBlockComponent.vue'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/components/setting/iconMap'

// 加载代码块样式
// TODO 变为可动态更过css文件
import '@/styles/codeBlock/github-dark.css'

const lowlight = createLowlight(all)

const CodeBlock = CodeBlockLowlight.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
          componentProps: {
            icon: iconMap['codeBlock'],
            isActive: () => editor.isActive('codeBlock'),
            execute: () => editor.commands.toggleCodeBlock(),
          },
        }
      },
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockComponent)
  },
}).configure({ lowlight, defaultLanguage: null })

export default CodeBlock
