import EmojiExtension from './EmojiExtension'
import { suggestionConfig } from './suggestion'

export default {
  name: 'emoji',
  type: 'node',
  extension: EmojiExtension,
  manifest: {
    suggestion: suggestionConfig
  }
}
