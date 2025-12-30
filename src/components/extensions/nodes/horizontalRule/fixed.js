const name = "horizontalRule";
export default {
  id: name,
  icon: name,
  label: "水平分割线",
  type: 'node',
  isActive: (editor) => editor.isActive(name),
  action: (editor) => editor.chain().focus().setHorizontalRule().run(),
};
