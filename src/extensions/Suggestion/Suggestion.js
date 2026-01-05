import Suggestion from "@tiptap/suggestion";
import { createSuggestionPopup } from "./suggestionPopup";
import { Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";

/**
 * items: {
 *   id: string,
 *   iconType: string,
 *   icon: string,
 *   label: string,
 *   command: ({ editor, range }) => void,
 * }
 */

export function createSuggestion(suggestionConfig) {
  const { char, allow, items, command } = suggestionConfig;

  return Extension.create({
    name: `Suggestion_${char}`,

    addProseMirrorPlugins() {
      return [
        Suggestion({
          pluginKey: new PluginKey(`suggestion:${char}`),
          editor: this.editor,
          char,
          allow,
          items,
          command,

          render: () => {
            let popup;

            return {
              /**
               * props: {
               *   editor: this.editor,
               *   range: range,
               *   query: query,
               *   text: text,
               *   items: items,
               *   clientRect: clientRect,
               *   event: event,
               * }
               */
              onStart(props) {
                popup = createSuggestionPopup(props);
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
