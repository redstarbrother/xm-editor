import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule'
import fixedConfig from './fixed.js'
import slashConfig from './slash.js'

const HorizontalRule = TiptapHorizontalRule.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      fixed: fixedConfig,
      slash: slashConfig,
    }
  },
})

export default HorizontalRule
