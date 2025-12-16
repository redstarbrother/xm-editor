export const emojiSuggestionConfig = {
  char: ":",

  items: ({ editor, query }) => {
    return itemsConvert(editor.storage.emoji.emojis, query);
  },

  command: ({ editor, range, props }) => {
    if (props.command) {
      props.command({ editor, range });
    }
  },
};

/**
 * 转换 emoji 数据为通用 item 结构
 * @param {Array} emojis - 原始 emoji 数据数组
 * @param {string} query - 用户输入的查询字符串
 * @returns {Array} - 转换后的 item 数组
 */
const itemsConvert = (emojis, query) => {
  const filteredEmojis = emojis
    .filter(({ shortcodes, tags }) => {
      const lowerQuery = query.toLowerCase();
      return (
        shortcodes.find((shortcode) => shortcode.startsWith(lowerQuery)) ||
        tags.find((tag) => tag.startsWith(lowerQuery))
      );
    })
    .slice(0, 10);

  return filteredEmojis.map((emoji) => {
    return {
      id: emoji.shortcodes[0],
      iconType: "emoji",
      icon: emoji.emoji,
      label: emoji.shortcodes[0].replace(/:/g, ""),
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent(emoji.emoji)
          .run();
      },
    };
  });
};
