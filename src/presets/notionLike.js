import Extensions from "@/extensions"
import { mergePresetConfig } from "@/utils/presetUtil"


const NotionLike = {
  name: "NotionLike",

  defaultConfig: {
    editorOption: {
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
       * 工具栏与扩展
       */
      fixedMenuEnabled: false,
      bubbleMenuEnabled: true,
      slashMenuEnabled: true,
    },

    /**
     * 扩展插件
     */
    extensions: [
      Extensions.Base,
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
      Extensions.Emoji,
    ],

    style: {
      /**
       * 外观与布局
       */
      height: "100%",
      theme: "light",
      customClass: "",
      // 选中时背景颜色
      backgroundColorOnFocus: "#ffffff",
      showBorder: false,
    },

    events: {
      /**
       * 生命周期钩子
       */
      onInit: () => { },
      onDestroy: () => { },
      onFocus: () => { },
      onBlur: () => { },
      onUpdate: () => { },
    },
  },
  configure(userConfig = {}) {
    return mergePresetConfig(this.defaultConfig, userConfig);
  },
};


export default NotionLike;
