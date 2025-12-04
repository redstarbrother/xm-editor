import { Extensions } from '@/index.js'

const extensions = [
  Extensions.Text,
  Extensions.Heading,
  Extensions.Bold,
  Extensions.Italic,
  Extensions.Strike,
  Extensions.Underline,
  Extensions.List,
  Extensions.Blockquote,
  Extensions.HorizontalRule,
  Extensions.CodeBlock,
  Extensions.Image,
  Extensions.Table,
]

export default {
  /**
   * 内容与编辑状态
   */
  editable: true,
  contentType: "json",
  content: "",
  placeholder: "",
  autofocus: false,
  // 内部事件触发间隔，单位 ms
  debounce: 300,
  /**
   * 外观与布局
   */
  height: "100%",
  theme: "light",
  customClass: "",
  // 选中时背景颜色
  backgroundColorOnFocus: "#ffffff",
  showBorder: true,
  /**
   * 工具栏与扩展
   */
  extensions: extensions,
  fixedMenuEnabled: true,
  bubbleMenuEnabled: true,
  slashMenuEnabled: true,
  /**
   * 生命周期钩子
   */
  onInit: () => {},
  onDestroy: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onUpdate:() => {},
};
