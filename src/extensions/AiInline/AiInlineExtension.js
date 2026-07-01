import { Extension } from '@tiptap/core'

/**
 * AI Inline Extension
 * 职责：
 * 1. 注册快捷键（Cmd+J 唤起 AI 输入框，Cmd+Shift+J 续写）
 * 2. 提供 storage 供外部交互
 * 3. 管理 AI Inline 输入框的显示/隐藏状态
 */
const AiInlineExtension = Extension.create({
  name: 'ai-inline',

  addOptions() {
    return {
      ...this.parent?.(),
    }
  },

  addStorage() {
    return {
      // AI Inline 输入框是否可见
      visible: false,
      // AI Engine 引用（由 XmEditor 注入）
      aiEngine: null,

      // 打开 AI 输入框
      openInput: () => {
        this.storage.visible = true
        if (this.editor?.view) {
          this.editor.view.dispatch(this.editor.state.tr.setMeta('ai-inline', true))
        }
      },

      // 关闭 AI 输入框
      closeInput: () => {
        this.storage.visible = false
        if (this.editor?.view) {
          this.editor.view.dispatch(this.editor.state.tr.setMeta('ai-inline', false))
        }
      },

      // 切换 AI 输入框
      toggleInput: () => {
        this.storage.visible = !this.storage.visible
        if (this.editor?.view) {
          this.editor.view.dispatch(this.editor.state.tr.setMeta('ai-inline', this.storage.visible))
        }
      },

      // 快捷操作
      continueWriting() {
        if (this.aiEngine) {
          this.aiEngine.executeAction('continueWriting')
        }
      },
      translate() {
        if (this.aiEngine) {
          this.aiEngine.executeAction('translate')
        }
      },
      summarize() {
        if (this.aiEngine) {
          this.aiEngine.executeAction('summarize')
        }
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      // Cmd/Ctrl + J → 唤起 AI 输入框
      'Mod-j': () => {
        this.storage.toggleInput()
        return true
      },
      // Cmd/Ctrl + Shift + J → AI 续写
      'Mod-Shift-j': () => {
        this.storage.continueWriting()
        return true
      },
    }
  },
})

export default AiInlineExtension
