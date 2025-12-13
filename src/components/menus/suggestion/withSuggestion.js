import Suggestion from '@tiptap/suggestion'

export function withSuggestion(extension, suggestionConfig) {
  return extension.extend({
    addProseMirrorPlugins() {
      return [
        Suggestion({
          editor: this.editor,
          ...suggestionConfig,
        }),
      ]
    },
  })
}
