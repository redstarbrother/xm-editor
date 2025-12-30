const name = "codeBlock";
export default {
  id: name,
  icon: name,
  label: "代码块",
  type: 'node',
  isActive: (editor) => editor.isActive(name),
  action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
};
