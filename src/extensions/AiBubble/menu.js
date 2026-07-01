/**
 * AI BubbleMenu 菜单项定义
 * 通过 manifest.bubbleMenu 注入到现有 BubbleMenu
 */
import { markRaw } from 'vue'
import AiBubblePanel from '@/ai/components/AiBubblePanel.vue'

export const aiBubbleMenu = {
  id: 'ai-bubble',
  type: 'mark',
  icon: null,
  label: '✨ AI',
  action: ({ editor }) => {
    // 切换 AI 面板可见性
    const storage = editor.storage['ai-bubble']
    if (storage) {
      storage.panelVisible = !storage.panelVisible
    }
  },
}

export const AiBubblePanelComponent = markRaw(AiBubblePanel)
