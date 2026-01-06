import { defineExtension } from '@/utils/extensionUtil'
import BaseExtension from './BaseExtension'

export default defineExtension({
  name: 'base',
  type: 'node',
  extension: BaseExtension,
})
