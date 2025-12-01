export function createEditorProxy(editor) {
  return {
    // ----- 常用方法 -----
    getHTML() {
      return editor.getHTML();
    },
    getJSON() {
      return editor.getJSON();
    },
    getText() {
      return editor.getText();
    },
    setContent(content) {
      editor.commands.setContent(content);
    },
    clear() {
      editor.commands.clearContent(true);
    },
    focus() {
      editor.commands.focus();
    },
    blur() {
      editor.commands.blur();
    },
    destroy() {
      editor.destroy();
    },

    // ----- 光标相关 -----
    getCursor() {
      return editor.state.selection;
    },

    // ----- 原始实例（必要时）-----
    get instance() {
      return editor;
    }
  };
}
