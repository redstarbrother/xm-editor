import { defineExtension } from '@/utils/extensionUtil'
import EmojiExtension from './EmojiExtension'
import { suggestionConfig } from './suggestion'

export default defineExtension({
  name: 'emoji',
  type: 'node',
  extension: EmojiExtension,
  manifest: {
    suggestion: suggestionConfig
  }
})
