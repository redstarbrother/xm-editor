let name = "bold";
export default {
  id: name,
  icon: name,
  label: "加粗",
  priority: 100,
  isActive: (editor) => editor.isActive(name),
  action: (editor) => editor.chain().focus().toggleBold().run(),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleBold(),
};
