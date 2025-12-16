import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// load all highlight.js languages
import { createLowlight, all } from 'lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CodeBlockComponent from './CodeBlockComponent.vue'
import UniversalButton from '@/components/buttons/base/UniversalButton.vue'
import { iconMap } from '@/components/setting/iconMap'

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
            execute: () => editor.chain().focus().toggleCodeBlock().run(),
          },
        }
      },
      slash: () => ({
        id: name,
        iconType: "svg",
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

  // addKeyboardShortcuts() {
  //   return {
  //     Tab: ({ editor }) => {
  //       console.log('Tab 键被按下');

  //       if (editor.isActive(name)) {
  //         console.log('当前位置是代码块');
  //         editor.commands.insertContent('  ');
  //         return true;
  //       }
  //       return false;
  //     }
  //   }
  // }
}).configure({ lowlight, defaultLanguage: null })

export default CodeBlock
