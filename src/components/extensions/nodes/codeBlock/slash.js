import iconManager from "@/components/icon/iconManager";

const name = "codeBlock";
export default () => ({
  id: name,
  iconType: "svg",
  label: "代码块",
  icon: iconManager.getIconComponent(name),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setCodeBlock().run();
  },
});
