import { BaseProvider } from './BaseProvider'

/**
 * DeepSeek Provider
 * 适配 DeepSeek API（兼容 OpenAI 格式）
 */
export class DeepSeekProvider extends BaseProvider {
  constructor(config) {
    super(config)
    this.baseUrl = config.baseUrl || 'https://api.deepseek.com'
  }

  /**
   * 流式请求（核心方法）
   * 使用 async generator 逐段返回内容
   */
  async *stream(messages, options = {}) {
    const abortController = new AbortController()
    options.onAbort?.(abortController)

    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: options.model || 'deepseek-chat',
        messages,
        stream: true,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 2000,
        stop: options.stop,
      }),
      signal: abortController.signal,
    })

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '')
      throw new Error(`DeepSeek API Error: ${response.status} ${response.statusText}\n${errorBody}`)
    }

    // 解析 SSE 流
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') return

          try {
            const json = JSON.parse(data)
            const content = json.choices?.[0]?.delta?.content
            if (content) yield content
          } catch {
            // 忽略无法解析的行
          }
        }
      }
    } finally {
      reader.releaseLock()
    }
  }

  /**
   * 非流式请求（补全专用，更快）
   */
  async complete(messages, options = {}) {
    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: options.model || 'deepseek-chat',
        messages,
        stream: false,
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 80,
        stop: options.stop,
      }),
      signal: options.signal,
    })

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '')
      throw new Error(`DeepSeek API Error: ${response.status} ${response.statusText}\n${errorBody}`)
    }

    const json = await response.json()
    return json.choices?.[0]?.message?.content || ''
  }
}
