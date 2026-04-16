import { defineExtension } from '@/utils/extensionUtil'
import SubScriptExtension from './SubScriptExtension'

export default defineExtension({
  name: 'subscript',
  type: 'mark',
  extension: SubScriptExtension,
  manifest: {}
})
