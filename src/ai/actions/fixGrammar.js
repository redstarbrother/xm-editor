/**
 * AI Action: 修正语法
 */
export default {
  name: 'fixGrammar',
  label: '🎯 修正语法',
  description: '修正语法和拼写错误',
  promptKey: 'fixGrammar',
  requiresSelection: true,

  getContext(editor) {
    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to, '\n')
    return { text }
  },

  apply(editor, content) {
    const { from, to } = editor.state.selection
    editor.chain().focus().deleteRange({ from, to }).insertContent(content).run()
  },
}
