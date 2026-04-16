import { Subscript } from '@tiptap/extension-subscript'

const SubScriptExtension = Subscript.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-subscript',
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-,': () => this.editor.commands.toggleSubscript(),
    }
  },
})

export default SubScriptExtension
