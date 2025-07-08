import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// load all highlight.js languages
import { createLowlight, all } from 'lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CodeBlockComponent from '@/components/extensions/CodeBlockComponent.vue'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'

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
          component: BaseButtonComponent,
          componentProps: {
            name: 'codeBlock',
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
