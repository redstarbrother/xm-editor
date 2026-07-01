/**
 * AI Action: 缩写
 */
export default {
  name: 'shorten',
  label: '📄 缩写',
  description: '缩写选中内容，保留核心信息',
  promptKey: 'shorten',
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
