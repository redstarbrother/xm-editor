import { Extension } from '@tiptap/core'
import { CompletionEngine } from '@/ai/completion/CompletionEngine'
import { createCompletionPlugin } from '@/ai/completion/CompletionPlugin'

/**
 * AI Completion Extension
 * 自动补全 Ghost Text 扩展
 * 职责：创建 CompletionEngine 和 ProseMirror Plugin
 */
const AiCompletionExtension = Extension.create({
  name: 'ai-completion',

  addOptions() {
    return {
      ...this.parent?.(),
      // AI 配置（由 XmEditor 注入）
      aiConfig: null,
    }
  },

  addStorage() {
    return {
      completionEngine: null,
    }
  },

  addProseMirrorPlugins() {
    const aiConfig = this.options.aiConfig
    if (!aiConfig?.apiKey || aiConfig?.completion?.enabled === false) {
      return []
    }

    // 创建补全引擎
    const completionEngine = new CompletionEngine(this.editor, {
      apiKey: aiConfig.apiKey,
      baseUrl: aiConfig.baseUrl,
      completion: aiConfig.completion || {},
    })

    // 存储引用以供外部访问
    this.storage.completionEngine = completionEngine

    // 创建并返回 ProseMirror Plugin
    return [createCompletionPlugin(completionEngine)]
  },

  addKeyboardShortcuts() {
    return {
      // Esc → 清除 Ghost Text（如果有的话）
      'Escape': () => {
        const engine = this.storage.completionEngine
        if (engine?.ghostText) {
          engine.clearGhost()
          return true
        }
        return false
      },
    }
  },

  onDestroy() {
    this.storage.completionEngine?.destroy()
  },
})

export default AiCompletionExtension
