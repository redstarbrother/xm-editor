/**
 * Ghost Text Decoration 样式相关
 * 实际的 CSS 样式定义在 AI 主样式文件中
 * 这里导出工具函数
 */

/**
 * 创建 Ghost Text DOM 元素
 * @param {string} text - 补全文本
 * @returns {HTMLElement}
 */
export function createGhostTextElement(text) {
  const span = document.createElement('span')
  span.className = 'xm-ai-ghost-text'
  span.textContent = text
  span.setAttribute('data-ghost', 'true')
  span.contentEditable = 'false'
  return span
}

/**
 * 创建 Ghost Text 提示元素（"按 Tab 采纳 · Esc 忽略"）
 * @returns {HTMLElement}
 */
export function createGhostHintElement() {
  const hint = document.createElement('span')
  hint.className = 'xm-ai-ghost-hint'
  hint.textContent = 'Tab 采纳 · Esc 忽略'
  return hint
}
