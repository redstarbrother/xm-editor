// suggestionFactory.js
import { createSuggestionPopup } from './suggestionPopup'

export function createSuggestion(options) {
  const {
    char,
    name,
    allow,
    items,
    command,
    renderItem,
  } = options

  return {
    char,
    allow,
    items,
    command,
    render: () => {
      let popup

      return {
        onStart(props) {
          popup = createSuggestionPopup({
            name,
            ...props,
            renderItem,
          })
        },
        onUpdate(props) {
          popup.update(props)
        },
        onKeyDown(props) {
          return popup.onKeyDown(props)
        },
        onExit() {
          popup.destroy()
        },
      }
    },
  }
}