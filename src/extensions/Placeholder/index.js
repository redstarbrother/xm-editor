import { defineExtension } from '@/utils/extensionUtil'
import PlaceholderExtension from './PlaceholderExtension'

export default defineExtension({
  name: 'placeholder',
  type: 'functionality',
  extension: PlaceholderExtension,
})
