import Suggestion from "@tiptap/suggestion";
import { createSuggestionPopup } from "./suggestionPopup";
import { Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";

export function createSuggestion(suggestionConfig) {
  const { name, char, allow, items, command } = suggestionConfig;

  return Extension.create({
    name: `${name}Suggestion`,

    addProseMirrorPlugins() {
      return [
        Suggestion({
          editor: this.editor,
          char,
          pluginKey: new PluginKey(`suggestion:${name}`),
          allow,
          items,
          command,

          render: () => {
            let popup;

            return {
              onStart(props) {
                popup = createSuggestionPopup({ name, ...props });
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
        }),
      ];
    },
  });
}
