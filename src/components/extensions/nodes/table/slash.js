import iconManager from "@/components/icon/iconManager";

const name = 'table'
export default () => ({
  id: name,
  iconType: "svg",
  label: "表格",
  icon: iconManager.getIconComponent(name),
  command: ({ editor, range }) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: false,
      })
      .run();
  },
});
