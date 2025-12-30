const name = "blockquote";
export default {
  id: name,
  icon: name,
  label: "引用",
  type: 'node',
  isActive: (editor) => editor.isActive(name),
  action: (editor) => editor.chain().focus().toggleBlockquote().run(),
};
