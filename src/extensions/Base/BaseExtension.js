import { Extension } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import HardBreak from '@tiptap/extension-hard-break'
import { Dropcursor, Gapcursor, TrailingNode, UndoRedo } from '@tiptap/extensions'

const BaseExtension = Extension.create({
  name: 'base',
  addExtensions() {
    return [
      Document,
      Paragraph,
      Text,
      HardBreak,
      Dropcursor,
      Gapcursor,
      TrailingNode,
      UndoRedo,
    ]
  },
})

export default BaseExtension
