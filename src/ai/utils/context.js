/**
 * 上下文收集工具
 * 从编辑器中提取文本上下文，供 AI 使用
 */

/**
 * 收集光标前的文本上下文
 * @param {Object} editor - Tiptap editor 实例
 * @param {number} maxLines - 最大行数
 * @returns {{ text: string, pos: number }}
 */
export function collectContextBefore(editor, maxLines = 10) {
  const { state } = editor
  const { from } = state.selection
  const doc = state.doc

  // 获取光标前最近区域的文本
  const textBefore = doc.textBetween(
    Math.max(0, from - 2000), from, '\n'
  )

  // 只取最近 N 行
  const lines = textBefore.split('\n')
  const contextText = lines.slice(-maxLines).join('\n')

  return { text: contextText, pos: from }
}

/**
 * 收集选中文本
 * @param {Object} editor - Tiptap editor 实例
 * @returns {{ text: string, from: number, to: number } | null}
 */
export function collectSelection(editor) {
  const { state } = editor
  const { from, to, empty } = state.selection

  if (empty) return null

  const text = state.doc.textBetween(from, to, '\n')
  return { text, from, to }
}

/**
 * 收集全文内容
 * @param {Object} editor - Tiptap editor 实例
 * @param {number} maxChars - 最大字符数
 * @returns {string}
 */
export function collectFullText(editor, maxChars = 5000) {
  const text = editor.getText()
  if (text.length > maxChars) {
    return text.slice(0, maxChars) + '\n...(内容已截断)'
  }
  return text
}

/**
 * 收集光标前后的上下文（用于自动补全）
 * @param {Object} editor - Tiptap editor 实例
 * @param {number} contextLines - 上下文行数
 * @returns {{ textBefore: string, textAfter: string, pos: number }}
 */
export function collectCompletionContext(editor, contextLines = 10) {
  const { state } = editor
  const { from } = state.selection
  const doc = state.doc

  const textBefore = doc.textBetween(
    Math.max(0, from - 2000), from, '\n'
  )
  const textAfter = doc.textBetween(
    from, Math.min(doc.content.size, from + 500), '\n'
  )

  const linesBefore = textBefore.split('\n')
  const contextBefore = linesBefore.slice(-contextLines).join('\n')

  return {
    textBefore: contextBefore,
    textAfter: textAfter.slice(0, 200),
    pos: from,
  }
}
