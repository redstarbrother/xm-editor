/**
 * AI Action: 改写
 */
export default {
  name: 'rewrite',
  label: '✏️ 改写',
  description: '改写选中内容，使其更流畅自然',
  promptKey: 'rewrite',
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
