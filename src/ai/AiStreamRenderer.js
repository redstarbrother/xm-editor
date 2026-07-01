/**
 * AI 流式输出渲染器
 * 将流式 Markdown 内容渲染到 ProseMirror 编辑器
 */
export class AiStreamRenderer {
  constructor(editor) {
    this.editor = editor
    this.insertPos = null
    this.isRendering = false
  }

  /**
   * 开始流式渲染
   * 记录插入位置（当前光标位置）
   */
  start() {
    const { from } = this.editor.state.selection
    this.insertPos = from
    this.isRendering = true
    this._lastContent = ''
  }

  /**
   * 更新渲染内容
   * 增量替换：用完整内容替换之前插入的内容
   * @param {string} fullContent - 目前为止的完整内容
   */
  update(fullContent) {
    if (!this.isRendering || this.insertPos === null) return

    const prevLength = this._lastContent.length
    const newText = fullContent.slice(prevLength)

    if (newText) {
      // 在当前光标位置插入新文本
      this.editor.commands.insertContent(newText)
      this._lastContent = fullContent
    }
  }

  /**
   * 结束渲染
   */
  stop() {
    this.isRendering = false
    this.insertPos = null
    this._lastContent = ''
  }

  /**
   * 丢弃已渲染的内容
   * 删除从开始位置到当前位置的所有内容
   */
  discard() {
    if (this.insertPos === null) return

    const deleteFrom = this.insertPos
    const { from } = this.editor.state.selection

    if (from > deleteFrom) {
      this.editor.chain()
        .focus()
        .deleteRange({ from: deleteFrom, to: from })
        .run()
    }

    this.stop()
  }
}
