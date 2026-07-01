/**
 * AI Action: 续写
 */
export default {
  name: 'continueWriting',
  label: '📝 AI 续写',
  description: '根据上文继续写作',
  promptKey: 'continueWriting',

  /**
   * 收集操作所需的上下文
   */
  getContext(editor) {
    const { state } = editor
    const { from } = state.selection
    const text = state.doc.textBetween(Math.max(0, from - 2000), from, '\n')
    const lines = text.split('\n').slice(-15)
    return { context: lines.join('\n') }
  },

  /**
   * 应用 AI 生成结果
   * 续写 → 在光标位置插入
   */
  apply(editor, content) {
    editor.commands.insertContent(content)
  },
}
