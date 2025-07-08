export function generateButtonCompontents(editor, extensions) {
  return extensions?.reduce((arr, extension) => {
    const { button } = extension.options;

    if (button != undefined) {
      const buttonCompontent = button({
        editor: editor,
        extension: extension,
      });

      if (Array.isArray(buttonCompontent)) {
        return [...arr, ...buttonCompontent];
      }
      return [...arr, buttonCompontent];
    } else {
      return arr;
    }
  }, []);
}