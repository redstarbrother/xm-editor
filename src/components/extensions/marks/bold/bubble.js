const name = "bold";
export default {
  id: name,
  icon: name,
  label: "加粗",
  type: 'mark',
  isActive: (editor) => editor.isActive(name),
  action: (editor) => editor.chain().focus().toggleBold().run(),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleBold(),
};
