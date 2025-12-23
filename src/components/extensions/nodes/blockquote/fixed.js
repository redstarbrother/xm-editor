const name = "blockquote";
export default {
  id: name,
  icon: name,
  label: "引用",
  priority: 100,
  isActive: (editor) => editor.isActive(name),
  action: (editor) => editor.chain().focus().toggleBlockquote().run(),
};
