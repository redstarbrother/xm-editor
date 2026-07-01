/**
 * AI Action: 总结
 */
export default {
  name: 'summarize',
  label: '📊 总结',
  description: '总结文档要点',
  promptKey: 'summarize',

  getContext(editor) {
    const { from, to, empty } = editor.state.selection
    let text
    if (!empty) {
      text = editor.state.doc.textBetween(from, to, '\n')
    } else {
      text = editor.getText()
      if (text.length > 5000) {
        text = text.slice(0, 5000) + '\n...(内容已截断)'
      }
    }
    return { text }
  },

  apply(editor, content) {
    editor.commands.insertContent(content)
  },
}
