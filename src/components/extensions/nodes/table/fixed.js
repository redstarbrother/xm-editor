const name = "table";
export default {
  id: name,
  icon: name,
  label: "表格",
  priority: 100,
  isActive: (editor) => editor.isActive(name),
  action: (editor) =>
    editor
      .chain()
      .focus()
      .insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: false,
      })
      .run(),
  shouldShow: (editor) => editor.can().insertTable(),
};
