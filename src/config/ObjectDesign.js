// BubbleMenu 配置接口
const bubbleConfig = {
  // 唯一标识，用于去重或排序
  id: 'bold', 
  // 菜单图标（可以是字符串、SVG代码或组件名，取决于你的 Icon 方案）
  icon: 'icon-bold',
  // 提示文案
  label: '加粗',
  // 优先级：数字越大越靠前
  priority: 100,
  // 【关键】按钮是否高亮（Active 状态）
  // 传入 editor 实例，返回 boolean
  isActive: (editor) => editor.isActive('bold'),
  // 【关键】按钮点击行为
  // 传入 editor 实例
  action: (editor) => editor.chain().focus().toggleBold().run(),
  // 【关键】显示规则（决定这个按钮什么时候出现）
  // 比如：只有选中了文本才显示，选中图片不显示
  shouldShow: (editor) => !editor.state.selection.empty && editor.can().toggleBold()
};

