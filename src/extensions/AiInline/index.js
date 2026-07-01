import { defineExtension } from '@/utils/extensionUtil'
import AiInlineExtension from './AiInlineExtension'

export default defineExtension({
  name: 'ai-inline',
  type: 'ai',
  extension: AiInlineExtension,
  manifest: {
    slashMenu: [
      {
        title: '✨ AI 写作',
        description: '让 AI 帮你生成内容',
        icon: 'sparkles',
        group: 'AI 助手',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).run()
          editor.storage.aiInline?.openInput()
        }
      },
      {
        title: '📝 AI 续写',
        description: '根据上文继续写作',
        icon: 'pen-line',
        group: 'AI 助手',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).run()
          editor.storage.aiInline?.continueWriting()
        }
      },
      {
        title: '🌐 AI 翻译',
        description: '翻译选中内容或全文',
        icon: 'languages',
        group: 'AI 助手',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).run()
          editor.storage.aiInline?.translate()
        }
      },
      {
        title: '📊 AI 总结',
        description: '总结文档要点',
        icon: 'list-checks',
        group: 'AI 助手',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).run()
          editor.storage.aiInline?.summarize()
        }
      },
    ]
  }
})
