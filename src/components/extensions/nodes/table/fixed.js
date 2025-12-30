import SubMenu from "./SubMenu.vue";

const name = "table";
export default {
  id: name,
  icon: name,
  label: "表格",
  type: 'node',
  isActive: (editor) => editor.isActive(name),
  component: SubMenu,
  shouldShow: (editor) => editor.can().insertTable(),
};
