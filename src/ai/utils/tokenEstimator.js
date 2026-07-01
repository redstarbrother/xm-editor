/**
 * Token 数量估算工具
 * 简易估算方法，用于限制上下文大小
 */

/**
 * 估算文本的 token 数量
 * 粗略规则：中文约 1 字 ≈ 1.5 token，英文约 4 字符 ≈ 1 token
 * @param {string} text
 * @returns {number}
 */
export function estimateTokens(text) {
  if (!text) return 0

  // 统计中文字符数
  const chineseChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length
  // 统计英文/数字/符号字符数
  const otherChars = text.length - chineseChars

  // 中文约 1.5 token/字，英文约 0.25 token/字符
  return Math.ceil(chineseChars * 1.5 + otherChars * 0.25)
}

/**
 * 按 token 数截断文本
 * @param {string} text
 * @param {number} maxTokens
 * @returns {string}
 */
export function truncateByTokens(text, maxTokens) {
  if (estimateTokens(text) <= maxTokens) return text

  // 从尾部开始截断（保留最近的内容）
  let current = text
  while (estimateTokens(current) > maxTokens && current.length > 0) {
    // 每次去掉前面 10% 的内容
    const cutLen = Math.max(1, Math.floor(current.length * 0.1))
    current = current.slice(cutLen)
  }
  return current
}
