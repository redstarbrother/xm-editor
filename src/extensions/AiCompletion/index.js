import { defineExtension } from '@/utils/extensionUtil'
import AiCompletionExtension from './AiCompletionExtension'

export default defineExtension({
  name: 'ai-completion',
  type: 'ai',
  extension: AiCompletionExtension,
})
