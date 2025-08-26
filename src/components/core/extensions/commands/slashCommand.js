import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'

// 菜单项定义
export const slashCommands = [
  {
    title: 'Heading 1',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    },
  },
  {
    title: 'Heading 2',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    },
  },
  {
    title: 'Bullet List',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: 'Numbered List',
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
]

export function calcSlashCommand(extensions) {
  const slashCommands = extensions
    .filter(ext => ext.type === 'node')
    .map(ext => ({
      title: ext.name,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode(ext.name).run()
      },
    }))
  return slashCommands;
}

export const SlashCommand = Extension.create({
  name: 'slash-command',

  addOptions() {
    return {
      items: () => [], // 默认空数组
      suggestion: {
        char: '/',
        items: ({ query, editor }) => {
          return this.options.items({ query, editor }) // 从 options 里取
        },
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
