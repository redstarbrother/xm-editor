import { DeepSeekProvider } from '../providers/DeepSeekProvider'
import { completionSystemPrompt } from '../prompts/system'

/**
 * 自动补全引擎
 * 管理防抖、缓存、请求生命周期和 Ghost Text 状态
 */
export class CompletionEngine {
  constructor(editor, config) {
    this.editor = editor
    this.config = config.completion
    this.provider = new DeepSeekProvider({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
    })

    this.debounceTimer = null
    this.currentAbort = null
    this.cache = new Map()
    this.cacheTimeout = 3000

    // Ghost Text 状态
    this.ghostText = null      // 当前 ghost text 内容
    this.ghostPos = null        // ghost text 显示位置
    this._enabled = this.config.enabled !== false

    // 通知回调（由 CompletionPlugin 设置）
    this.onGhostUpdate = null
  }

  get isEnabled() {
    return this._enabled
  }

  enable() {
    this._enabled = true
  }

  disable() {
    this._enabled = false
    this.clearGhost()
    this.cancelPending()
  }

  /**
   * 用户输入停顿后触发
   * 由 CompletionPlugin 的事务监听调用
   */
  onInputIdle() {
    if (!this._enabled) return

    // 清除上一次防抖
    clearTimeout(this.debounceTimer)

    // 取消上一次请求
    this.cancelPending()

    // 清除当前 Ghost Text
    this.clearGhost()

    // 启动防抖
    this.debounceTimer = setTimeout(() => {
      this.triggerCompletion()
    }, this.config.debounce)
  }

  /**
   * 取消等待中的请求
   */
  cancelPending() {
    clearTimeout(this.debounceTimer)
    if (this.currentAbort) {
      this.currentAbort.abort()
      this.currentAbort = null
    }
  }

  /**
   * 触发补全请求
   */
  async triggerCompletion() {
    if (!this._enabled) return

    const context = this.collectContext()
    if (!context.text.trim()) return

    // 检查缓存
    const cacheKey = context.text.slice(-200)
    if (this.cache.has(cacheKey)) {
      this.showGhost(this.cache.get(cacheKey), context.pos)
      return
    }

    // 发送请求
    const abort = new AbortController()
    this.currentAbort = abort

    try {
      const suggestion = await this.provider.complete(
        [
          { role: 'system', content: completionSystemPrompt },
          { role: 'user', content: `请补全以下文字（只返回补全部分）：\n\n${context.text}` }
        ],
        {
          model: this.config.model,
          temperature: this.config.temperature,
          maxTokens: this.config.maxTokens,
          stop: this.config.stopSequences,
          signal: abort.signal,
        }
      )

      if (suggestion && !abort.signal.aborted) {
        // 缓存结果
        this.cache.set(cacheKey, suggestion)
        setTimeout(() => this.cache.delete(cacheKey), this.cacheTimeout)
        this.showGhost(suggestion, context.pos)
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('[AI Completion] Error:', err)
      }
    }
  }

  /**
   * 收集光标前的上下文
   */
  collectContext() {
    const { state } = this.editor
    const { from } = state.selection
    const doc = state.doc

    const textBefore = doc.textBetween(
      Math.max(0, from - 1000), from, '\n'
    )

    const lines = textBefore.split('\n')
    const contextText = lines.slice(-this.config.contextLines).join('\n')

    return { text: contextText, pos: from }
  }

  /**
   * 显示 Ghost Text
   */
  showGhost(text, pos) {
    if (!text || !this._enabled) return

    this.ghostText = text
    this.ghostPos = pos

    // 通知 Plugin 更新 Decoration
    this.onGhostUpdate?.({ text, pos })
  }

  /**
   * 采纳补全
   * @returns {boolean} 是否成功采纳
   */
  accept() {
    if (!this.ghostText) return false

    const text = this.ghostText
    this.clearGhost()
    this.editor.commands.insertContent(text)
    return true
  }

  /**
   * 清除 Ghost Text
   */
  clearGhost() {
    this.ghostText = null
    this.ghostPos = null
    this.onGhostUpdate?.(null)
  }

  /**
   * 销毁
   */
  destroy() {
    this.cancelPending()
    this.clearGhost()
    this.cache.clear()
  }
}
