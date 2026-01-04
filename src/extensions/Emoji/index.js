import EmojiExtension from './EmojiExtension'

export default {
  name: 'emoji',
  type: 'node',
  extension: EmojiExtension,
  manifest: {
    // No menu items for now, as it's triggered by colon
  }
}
