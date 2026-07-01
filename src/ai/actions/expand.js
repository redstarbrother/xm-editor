/**
 * AI Action: 扩写
 */
export default {
  name: 'expand',
  label: '📖 扩写',
  description: '扩写选中内容，增加细节',
  promptKey: 'expand',
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
