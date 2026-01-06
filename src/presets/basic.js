import Extensions from "@/extensions"

import { mergePresetConfig } from "@/utils/presetUtil"

const Basic = {
  name: "Basic",
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
      fixedMenuEnabled: true,
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
      Extensions.Segmentation,
      Extensions.List,
      Extensions.Blockquote,
      Extensions.Segmentation,
      Extensions.HorizontalRule,
      Extensions.Segmentation,
      Extensions.Code,
      Extensions.CodeBlock,
      Extensions.Image,
      Extensions.Table,
      Extensions.Segmentation,
      Extensions.Emoji,
      Extensions.Highlight,
      Extensions.TextAlign,
      Extensions.ShortcutKey,
      Extensions.FixedMenu,
      Extensions.BubbleMenu,
      Extensions.SlashMenu,
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
      showBorder: true,
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
}

export default Basic;
