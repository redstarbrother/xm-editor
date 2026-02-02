import TiptapBlockquote from '@tiptap/extension-blockquote'

const BlockquoteExtension = TiptapBlockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'xm-blockquote',
      },
    }
  },
});

export default BlockquoteExtension;
