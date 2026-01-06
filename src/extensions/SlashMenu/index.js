import { defineExtension } from '@/utils/extensionUtil'
import SlashExtension from './SlashExtension'
import { suggestionConfig } from './suggestion'

export default defineExtension({
  name: 'slash',
  type: 'menu',
  extension: SlashExtension,
  manifest: {
    suggestion: suggestionConfig
  }
})
