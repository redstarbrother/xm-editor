import { reactive } from 'vue'
import { DeepSeekProvider } from './providers/DeepSeekProvider'
import { OpenAiCompatProvider } from './providers/OpenAiCompatProvider'
import { defaultPrompts, defaultSystemPrompt, fillPrompt } from './prompts/defaults'
import { actions as allActions } from './actions'

/**
 * AI 引擎核心
 * 负责管理 Provider、状态和执行 AI 操作
 */
export class AiEngine {
  constructor(editor, config) {
    this.editor = editor
    this.config = this._mergeConfig(config)

    // 初始化 Provider
    this.provider = this._createProvider()

    // 响应式状态（Vue 3 reactive）
    this.state = reactive({
      isLoading: false,
      streamContent: '',
      error: null,
      currentAction: null,
    })

    // 当前中止控制器
    this._currentAbort = null

    // 事件监听器
    this._listeners = {}
  }

  /**
   * 合并用户配置与默认值
   */
  _mergeConfig(userConfig) {
    return {
      apiKey: userConfig.apiKey,
      baseUrl: userConfig.baseUrl || 'https://api.deepseek.com',
      model: userConfig.model || 'deepseek-chat',
      completion: {
        enabled: userConfig.completion?.enabled !== false,
        model: userConfig.completion?.model || userConfig.model || 'deepseek-chat',
        debounce: userConfig.completion?.debounce ?? 600,
        maxTokens: userConfig.completion?.maxTokens ?? 80,
        contextLines: userConfig.completion?.contextLines ?? 10,
        temperature: userConfig.completion?.temperature ?? 0.3,
        stopSequences: userConfig.completion?.stopSequences || ['\n\n', '。\n'],
      },
      advanced: {
        temperature: userConfig.advanced?.temperature ?? 0.7,
        maxTokens: userConfig.advanced?.maxTokens ?? 2000,
        systemPrompt: userConfig.advanced?.systemPrompt || defaultSystemPrompt,
        prompts: { ...defaultPrompts, ...(userConfig.advanced?.prompts || {}) },
      },
    }
  }

  /**
   * 创建 Provider
   */
  _createProvider() {
    const { apiKey, baseUrl } = this.config
    // DeepSeek 和 OpenAI 兼容 API 使用相同格式
    if (baseUrl?.includes('deepseek')) {
      return new DeepSeekProvider({ apiKey, baseUrl })
    }
    return new OpenAiCompatProvider({ apiKey, baseUrl })
  }

  /**
   * 执行 AI Action（流式）
   * @param {string} actionName - action 名称
   * @param {Object} params - 额外参数
   * @returns {Promise<string>} - 完整生成内容
   */
  async executeAction(actionName, params = {}) {
    const action = allActions[actionName]
    if (!action) {
      throw new Error(`Unknown AI action: ${actionName}`)
    }

    // 检查是否需要选中文本
    if (action.requiresSelection && this.editor.state.selection.empty) {
      this.state.error = '请先选中要操作的文本'
      this._emit('error', { message: this.state.error })
      return null
    }

    // 收集上下文
    const context = action.getContext(this.editor, params)

    // 填充 prompt
    const promptTemplate = this.config.advanced.prompts[action.promptKey] || defaultPrompts[action.promptKey]
    const userPrompt = fillPrompt(promptTemplate, context)

    // 构建消息
    const messages = [
      { role: 'system', content: this.config.advanced.systemPrompt },
      { role: 'user', content: userPrompt },
    ]

    // 执行流式请求
    return this.executeStream(messages, {
      action,
      onComplete: (content) => {
        this._emit('complete', { action: actionName, content })
      },
    })
  }

  /**
   * 执行流式请求
   * @param {Array} messages - 消息列表
   * @param {Object} options - 选项
   * @returns {Promise<string>} - 完整生成的内容
   */
  async executeStream(messages, options = {}) {
    // 取消上一次请求
    this.abort()

    // 重置状态
    this.state.isLoading = true
    this.state.streamContent = ''
    this.state.error = null
    this.state.currentAction = options.action?.name || null

    this._emit('start', { action: this.state.currentAction })

    try {
      const stream = this.provider.stream(messages, {
        model: this.config.model,
        temperature: this.config.advanced.temperature,
        maxTokens: this.config.advanced.maxTokens,
        onAbort: (controller) => {
          this._currentAbort = controller
        },
      })

      let fullContent = ''
      for await (const chunk of stream) {
        fullContent += chunk
        this.state.streamContent = fullContent
        this._emit('chunk', { content: chunk, fullContent })
      }

      this.state.isLoading = false
      options.onComplete?.(fullContent)
      return fullContent
    } catch (err) {
      this.state.isLoading = false
      if (err.name === 'AbortError') {
        this._emit('abort')
        return null
      }
      this.state.error = err.message
      this._emit('error', { message: err.message, error: err })
      console.error('[AiEngine] Stream error:', err)
      return null
    }
  }

  /**
   * 取消当前操作
   */
  abort() {
    if (this._currentAbort) {
      this._currentAbort.abort()
      this._currentAbort = null
    }
    this.state.isLoading = false
    this.state.currentAction = null
  }

  /**
   * 事件系统
   */
  on(event, callback) {
    if (!this._listeners[event]) {
      this._listeners[event] = []
    }
    this._listeners[event].push(callback)
  }

  off(event, callback) {
    if (!this._listeners[event]) return
    const idx = this._listeners[event].indexOf(callback)
    if (idx !== -1) {
      this._listeners[event].splice(idx, 1)
    }
  }

  _emit(event, data) {
    const callbacks = this._listeners[event] || []
    callbacks.forEach(cb => {
      try {
        cb(data)
      } catch (e) {
        console.error(`[AiEngine] Event listener error (${event}):`, e)
      }
    })
  }

  /**
   * 销毁引擎
   */
  destroy() {
    this.abort()
    this._listeners = {}
  }
}
