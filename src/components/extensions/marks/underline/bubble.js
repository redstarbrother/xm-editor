const name = "underline";
export default {
  id: name,
  icon: name,
  label: "下划线",
  type: 'mark',
  isActive: (editor) => editor.isActive(name),
  action: (editor) => editor.chain().focus().toggleUnderline().run(),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleUnderline(),
};
