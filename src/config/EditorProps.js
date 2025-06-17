export default {
  /**
   * 内容与编辑状态
   */
  editable: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: "I’m running xm-editor with Vue.js. 🎉",
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  // 内部事件触发间隔，单位 ms
  debounce: {
    type: Number,
    default: 300,
  },
  /**
   * 外观与布局
   */
  height: {
    type: [String, Number],
    default: "300px",
  },
  theme: {
    type: String,
    default: "light", // 'light' | 'dark'
  },
  customClass: {
    type: String,
    default: "",
  },
  // 选中时背景颜色
  backgroundColorOnFocus: {
    type: String,
    default: "#FAFBFC",
  },
  showBorder: {
    type: Boolean,
    default: true,
  },
  /**
   * 工具栏与扩展
   */
  extensions: {
    type: Array,
    default: () => [],
  },
  showToolbar: {
    type: Boolean,
    default: true,
  },
  showMenuBubble: {
    type: Boolean,
    default: false,
  },
  /**
   * 生命周期钩子
   */
  onInit: {
    type: Function,
    default: () => {},
  },
  onDestroy: {
    type: Function,
    default: () => {},
  },
  onFocus: {
    type: Function,
    default: () => {},
  },
  onBlur: {
    type: Function,
    default: () => {},
  },
  onContentChange: {
    type: Function,
    default: () => {},
  },
};
