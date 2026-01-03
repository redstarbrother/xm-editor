import { Extension } from '@tiptap/core'

const GlobalTabExtension = Extension.create({
  name: 'globalTab',

  addOptions() {
    return {
      indent: 2, // 默认两个空格
    }
  },

  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        const indent = ' '.repeat(this.options.indent)

        editor
          .chain()
          .command(({ tr }) => {
            tr.insertText(indent)
            return true
          })
          .run()

        return true
      },

      'Shift-Tab': ({ editor }) => {
        const indent = ' '.repeat(this.options.indent)

        const { selection } = editor.state
        const { from } = selection

        // 光标前不够两个空格
        if (from < this.options.indent) {
          return false
        }

        const textBefore = editor.state.doc.textBetween(
          from - this.options.indent,
          from
        )

        if (textBefore !== indent) {
          return false
        }

        editor
          .chain()
          .command(({ tr }) => {
            tr.delete(from - this.options.indent, from)
            return true
          })
          .run()

        return true
      },
    }
  },
})

export default GlobalTabExtension