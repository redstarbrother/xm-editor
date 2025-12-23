import iconManager from "@/components/icon/iconManager";

const name = "blockquote";
export default () => ({
  id: name,
  iconType: "svg",
  label: "引用",
  icon: iconManager.getIconComponent(name),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).toggleBlockquote().run();
  },
});
