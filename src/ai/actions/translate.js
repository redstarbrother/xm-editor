/**
 * AI Action: 翻译
 */
export default {
  name: 'translate',
  label: '🌐 翻译',
  description: '翻译选中内容',
  promptKey: 'translate',
  requiresSelection: true,

  getContext(editor, params = {}) {
    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to, '\n')
    return { text, targetLang: params.targetLang || '英文' }
  },

  apply(editor, content) {
    const { from, to } = editor.state.selection
    editor.chain().focus().deleteRange({ from, to }).insertContent(content).run()
  },
}
