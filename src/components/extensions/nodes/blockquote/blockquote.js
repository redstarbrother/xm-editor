import TiptapBlockquote from '@tiptap/extension-blockquote'
import fixedConfig from './fixed.js'
import slashConfig from './slash.js'

const Blockquote = TiptapBlockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      fixed: fixedConfig,
      slash: slashConfig
    }
  },
})

export default Blockquote
