import SlashExtension from './SlashExtension'
import { suggestionConfig } from './suggestion'

export default {
  name: 'slash',
  type: 'menu',
  extension: SlashExtension,
  manifest: {
    suggestion: suggestionConfig
  }
}