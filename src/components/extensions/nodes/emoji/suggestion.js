import { createSuggestion } from '@/components/menus/suggestion/suggestionFactory'

export const emojiSuggestion = createSuggestion({
  name: 'emoji',
  char: ':',

  items: ({ editor, query }) => {
    return editor.storage.emoji.emojis
      .filter(({ shortcodes, tags }) => {
        return (
          shortcodes.find(shortcode => shortcode.startsWith(query.toLowerCase())) ||
          tags.find(tag => tag.startsWith(query.toLowerCase()))
        )
      })
      .slice(0, 5)
  },

  command: ({ editor, range, props }) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)   // 删除 关键词
      .insertContent(props.emoji) // 插入 emoji
      .run()
  },
})
