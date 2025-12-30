const name = "italic";
export default {
  id: name,
  icon: name,
  label: "斜体",
  type: 'mark',
  isActive: (editor) => editor.isActive(name),
  action: (editor) => editor.chain().focus().toggleItalic().run(),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleItalic(),
};
