const name = "strike";
export default {
  id: name,
  icon: name,
  label: "删除线",
  type: 'mark',
  isActive: (editor) => editor.isActive(name),
  action: (editor) => editor.chain().focus().toggleStrike().run(),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleStrike(),
};
