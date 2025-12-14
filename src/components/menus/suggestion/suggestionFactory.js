import Suggestion from "@tiptap/suggestion";
import { createSuggestionPopup } from "./suggestionPopup";

export function createSuggestion(suggestionConfig) {
  const {
    name,
    char,
    pluginKey,
    allow,
    items,
    command,
  } = suggestionConfig;

  return Suggestion({
    char,
    pluginKey,
    allow,
    items,
    command,

    render: () => {
      let popup;

      return {
        onStart(props) {
          popup = createSuggestionPopup({
            name,
            ...props,
          });
        },

        onUpdate(props) {
          popup?.update(props);
        },

        onKeyDown(props) {
          return popup?.onKeyDown(props);
        },

        onExit() {
          popup?.destroy();
          popup = null;
        },
      };
    },
  });
}
