export default {
  /**
   * 内容与初始化设置
   */
  editorOption: {
    editable: {
      type: Boolean,
      default: true,
    },
    contentType: {
      type: String,
      default: "json", // 'json' | 'html'
      validator(output) {
        return ["html", "json"].includes(output);
      },
    },
    content: {
      type: [String, Object],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
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
    fixedMenuEnabled: {
      type: Boolean,
      default: true,
    },
    bubbleMenuEnabled: {
      type: Boolean,
      default: true,
    },
    slashMenuEnabled: {
      type: Boolean,
      default: true,
    },
  },

  /**
   * 扩展配置
   */
  extensions: {
    type: Array,
    default: () => [],
  },

  /**
   * 样式配置
   */
  style: {
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
      // default: "#FFF",
      default: "#FAFBFC",
    },
    showBorder: {
      type: Boolean,
      default: true,
    },
  },

  events: {
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
    onUpdate: {
      type: Function,
      default: () => {},
    },
  },
};
