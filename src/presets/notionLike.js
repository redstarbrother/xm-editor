import Extensions from "@/extensions";
import { mergePresetConfig } from "@/utils/presetUtil";

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
      autofocus: false,
      placeholder: 'Write something …',
      // 内部事件触发间隔，单位 ms
      debounce: 300,
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
      Extensions.Link,
      Extensions.List,
      Extensions.Blockquote,
      Extensions.HorizontalRule,
      Extensions.Code,
      Extensions.CodeBlock,
      Extensions.Image,
      Extensions.Table,
      Extensions.Emoji,
      Extensions.Highlight,
      Extensions.TextAlign,
      Extensions.ShortcutKey,
      Extensions.Placeholder,
      Extensions.BubbleMenu,
      Extensions.SlashMenu,
    ],

    style: {
      /**
       * 外观与布局
       */
      customClass: "",
    },

    events: {
      /**
       * 生命周期钩子
       */
      onInit: () => {},
      onDestroy: () => {},
      onFocus: () => {},
      onBlur: () => {},
      onUpdate: () => {},
    },
  },
  configure(userConfig = {}) {
    return mergePresetConfig(this.defaultConfig, userConfig);
  },
};

export default NotionLike;
