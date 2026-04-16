import { Superscript } from '@tiptap/extension-superscript'

const SuperScriptExtension = Superscript.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-superscript',
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-.': () => this.editor.commands.toggleSuperscript(),
    }
  },
})

export default SuperScriptExtension
