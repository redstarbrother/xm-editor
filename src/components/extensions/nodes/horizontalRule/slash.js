import iconManager from "@/components/icon/iconManager";

const name = "horizontalRule";
export default () => ({
  id: name,
  iconType: "svg",
  label: "水平分割线",
  icon: iconManager.getIconComponent(name),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).setHorizontalRule().run();
  },
});
