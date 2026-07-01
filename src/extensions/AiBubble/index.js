import { defineExtension } from '@/utils/extensionUtil'
import { Extension } from '@tiptap/core'

/**
 * AI Bubble Extension
 * 在 BubbleMenu 中添加 AI 按钮
 */
const AiBubbleExtension = Extension.create({
  name: 'ai-bubble',

  addStorage() {
    return {
      panelVisible: false,
      aiEngine: null,
    }
  },
})

import { Sparkles } from 'lucide-vue-next'

export default defineExtension({
  name: 'ai-bubble',
  type: 'ai',
  extension: AiBubbleExtension,
  manifest: {
    bubbleMenu: {
      id: 'ai-bubble',
      type: 'mark',
      icon: Sparkles,
      label: '✨ AI',
      action: ({ editor }) => {
        const storage = editor.storage['ai-bubble']
        if (storage) {
          storage.panelVisible = !storage.panelVisible
          editor.view.dispatch(editor.state.tr.setMeta('ai-bubble', storage.panelVisible))
        }
      },
    },
  },
})
