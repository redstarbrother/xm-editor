/**
 * AI Action: 自由指令
 */
export default {
  name: 'freePrompt',
  label: '🤖 自由指令',
  description: '向 AI 提出自定义指令',
  promptKey: 'freePrompt',

  getContext(editor, params = {}) {
    const { state } = editor
    const { from, to, empty } = state.selection

    let context
    if (!empty) {
      context = state.doc.textBetween(from, to, '\n')
    } else {
      // 取光标前的上下文
      const text = state.doc.textBetween(Math.max(0, from - 2000), from, '\n')
      const lines = text.split('\n').slice(-15)
      context = lines.join('\n')
    }

    return {
      instruction: params.instruction || '',
      context,
    }
  },

  apply(editor, content) {
    const { empty } = editor.state.selection
    if (!empty) {
      const { from, to } = editor.state.selection
      editor.chain().focus().deleteRange({ from, to }).insertContent(content).run()
    } else {
      editor.commands.insertContent(content)
    }
  },
}
