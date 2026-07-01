/**
 * AI Action: 改变语气
 */
export default {
  name: 'changeTone',
  label: '🎨 改变语气',
  description: '改变文本语气',
  promptKey: 'changeTone',
  requiresSelection: true,

  getContext(editor, params = {}) {
    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to, '\n')
    return { text, tone: params.tone || '正式' }
  },

  apply(editor, content) {
    const { from, to } = editor.state.selection
    editor.chain().focus().deleteRange({ from, to }).insertContent(content).run()
  },
}
