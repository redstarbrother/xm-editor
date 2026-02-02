import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule'

const HorizontalRuleExtension = TiptapHorizontalRule.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-horizontal-rule',
      },
    };
  },
});

export default HorizontalRuleExtension;
