import { Placeholder } from '@tiptap/extensions'

const PlaceholderExtension = Placeholder.extend({
  name: 'placeholder',
  addOptions() {
    return {
      ...this.parent?.(),
      emptyNodeClass: 'xm-placeholder',
    }
  },
})
export default PlaceholderExtension
