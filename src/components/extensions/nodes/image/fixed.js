const name = "image";
export default {
  id: name,
  icon: name,
  label: "图片",
  priority: 100,
  isActive: (editor) => editor.isActive(name),
  action: (editor) => {},
  // component: SubMenuHeading,
  componentProps: {
  },
};
