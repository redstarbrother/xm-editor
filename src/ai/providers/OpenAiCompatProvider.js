import { DeepSeekProvider } from './DeepSeekProvider'

/**
 * OpenAI Compatible Provider
 * 适配任何兼容 OpenAI API 格式的服务
 * 实际上 DeepSeek 本身就是 OpenAI 兼容的，这里作为备用/通用方案
 */
export class OpenAiCompatProvider extends DeepSeekProvider {
  constructor(config) {
    super(config)
    // 允许自定义 baseUrl，默认 OpenAI
    this.baseUrl = config.baseUrl || 'https://api.openai.com'
  }
}
