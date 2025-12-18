export default {
  id: "bold",
  icon: "bold",
  label: "加粗",
  priority: 100,
  isActive: (editor) => editor.isActive("bold"),
  action: (editor) => editor.chain().focus().toggleBold().run(),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleBold(),
};
