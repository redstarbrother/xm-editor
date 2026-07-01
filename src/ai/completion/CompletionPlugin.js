import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export const completionPluginKey = new PluginKey('aiCompletion')

/**
 * 创建自动补全 ProseMirror Plugin
 * 职责：
 * 1. 监听输入事件 → 通知 CompletionEngine.onInputIdle()
 * 2. 监听 Tab 键 → 采纳补全
 * 3. 监听 Esc 键 → 丢弃补全
 * 4. 监听光标移动 → 清除 Ghost Text
 * 5. 管理 Ghost Text 的 Decoration state
 */
export function createCompletionPlugin(completionEngine) {
  return new Plugin({
    key: completionPluginKey,

    state: {
      init() {
        return { ghostText: null, ghostPos: null }
      },
      apply(tr, value) {
        // 检查元数据中是否有 ghost text 更新
        const meta = tr.getMeta(completionPluginKey)
        if (meta !== undefined) {
          if (meta === null) {
            return { ghostText: null, ghostPos: null }
          }
          return { ghostText: meta.text, ghostPos: meta.pos }
        }

        // 如果文档发生变化，清除 ghost text
        if (tr.docChanged && value.ghostText) {
          return { ghostText: null, ghostPos: null }
        }

        // 如果选区发生变化（光标移动），清除 ghost text
        if (tr.selectionSet && value.ghostText) {
          return { ghostText: null, ghostPos: null }
        }

        return value
      },
    },

    props: {
      decorations(state) {
        const pluginState = this.getState(state)
        if (!pluginState?.ghostText || pluginState.ghostPos === null) {
          return DecorationSet.empty
        }

        const { ghostText, ghostPos } = pluginState

        // 创建 Widget Decoration 显示 ghost text
        const widget = Decoration.widget(ghostPos, () => {
          const span = document.createElement('span')
          span.className = 'xm-ai-ghost-text'
          span.textContent = ghostText
          span.setAttribute('data-ghost', 'true')
          return span
        }, {
          side: 1,  // 放在光标后面
          key: 'ai-ghost-text',
        })

        return DecorationSet.create(state.doc, [widget])
      },

      handleKeyDown(view, event) {
        const pluginState = completionPluginKey.getState(view.state)
        if (!pluginState?.ghostText) return false

        // Tab → 采纳补全
        if (event.key === 'Tab' && !event.shiftKey) {
          event.preventDefault()
          completionEngine.accept()
          return true
        }

        // Esc → 丢弃补全
        if (event.key === 'Escape') {
          event.preventDefault()
          completionEngine.clearGhost()
          return true
        }

        return false
      },
    },

    view() {
      // 设置 CompletionEngine 的回调
      completionEngine.onGhostUpdate = (data) => {
        const { state, dispatch } = completionEngine.editor.view
        const tr = state.tr.setMeta(completionPluginKey, data)
        dispatch(tr)
      }

      // 需要一个标记来跟踪是否是输入操作
      let lastInputTime = 0

      return {
        update(view, prevState) {
          // 检测是否有文本输入（文档内容变化且选区是光标）
          if (view.state.doc !== prevState.doc && view.state.selection.empty) {
            // 记录输入时间
            lastInputTime = Date.now()
            // 通知补全引擎输入发生了
            completionEngine.onInputIdle()
          }
        },
        destroy() {
          completionEngine.destroy()
        },
      }
    },
  })
}
