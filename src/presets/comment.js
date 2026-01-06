import Extensions from "@/extensions";
import { mergePresetConfig } from "@/utils/presetUtil";

const Comment = {
  name: "Comment",
  defaultConfig: {
    editorOption: {
      /**
       * 内容与编辑状态
       */
      editable: true,
      contentType: "json",
      content: "",
      placeholder: "友善的评论是交流的开始...",
      autofocus: false,
      // 内部事件触发间隔，单位 ms
      debounce: 300,
      /**
       * 工具栏与扩展
       */
      fixedMenuEnabled: true,
      bubbleMenuEnabled: false,
      slashMenuEnabled: false,
    },

    /**
     * 扩展插件
     */
    extensions: [
      Extensions.Base,
      Extensions.Bold,
      Extensions.Italic,
      Extensions.List,
      Extensions.Image,
      Extensions.Emoji,
      Extensions.ShortcutKey,
      Extensions.FixedMenu,
    ],

    style: {
      /**
       * 外观与布局
       */
      height: "200px",
      theme: "light",
      customClass: "comment-editor",
      // 选中时背景颜色
      backgroundColorOnFocus: "#ffffff",
      showBorder: true,
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

export default Comment;
