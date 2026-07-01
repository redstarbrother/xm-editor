/**
 * Provider 抽象基类
 * 定义 LLM Provider 的统一接口
 */
export class BaseProvider {
  constructor(config) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl
  }

  /**
   * 流式请求（异步生成器）
   * @param {Array} messages - 消息列表 [{role, content}]
   * @param {Object} options - 请求选项
   * @yields {string} - 每次返回一个文本片段
   */
  async *stream(messages, options = {}) {
    throw new Error('stream() must be implemented by subclass')
  }

  /**
   * 非流式请求（一次性返回）
   * @param {Array} messages - 消息列表
   * @param {Object} options - 请求选项
   * @returns {Promise<string>}
   */
  async complete(messages, options = {}) {
    throw new Error('complete() must be implemented by subclass')
  }
}
