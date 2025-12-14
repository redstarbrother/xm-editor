export const emojiSuggestionConfig = {
  name: "emoji",
  char: ":",

  items: ({ editor, query }) => {
    return editor.storage.emoji.emojis
      .filter(({ shortcodes, tags }) => {
        return (
          shortcodes.find((shortcode) =>
            shortcode.startsWith(query.toLowerCase())
          ) || tags.find((tag) => tag.startsWith(query.toLowerCase()))
        );
      })
      .slice(0, 5);
  },

  command: ({ editor, range, props }) => {
    editor.chain().focus().deleteRange(range).insertContent(props.emoji).run();
  },
};
