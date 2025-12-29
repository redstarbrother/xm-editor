import SubMenuHighlight from "./SubMenu.vue";

const name = "highlight";
export default {
  id: name,
  icon: name,
  label: "高亮",
  priority: 100,
  isActive: (editor) => editor.isActive(name),
  shouldShow: (editor) =>
    !editor.state.selection.empty && editor.can().toggleHighlight,
  component: SubMenuHighlight,
  componentProps: {
    // color: [
    //     '#A9E34B', 
    //     '#74C0FC', 
    //     '#FFD43B', 
    //     '#DA77F2', 
    //     '#FFA94D', 
    // ],
  },
};
