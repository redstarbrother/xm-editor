import { defineExtension } from '@/utils/extensionUtil'
import SuperScriptExtension from './SuperScriptExtension'

export default defineExtension({
  name: 'superscript',
  type: 'mark',
  extension: SuperScriptExtension,
  manifest: {}
})
