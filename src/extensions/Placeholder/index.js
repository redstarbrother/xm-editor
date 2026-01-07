import { defineExtension } from '@/utils/extensionUtil'
import PlaceholderExtension from './PlacehorderExtension'

export default defineExtension({
  name: 'placeholder',
  type: 'funtionality',
  extension: PlaceholderExtension,
})
