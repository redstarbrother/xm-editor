import { Editor } from "@tiptap/core";
import { createEditorProxy } from "./proxyEditor";
import { mountVueEditor } from "./mountVueEditor";
import { getEditorExtensions } from "@/utils/extentionUtil";

export class XmEditor {
  constructor(options) {
    this.options = options;

    // 1. 初始化 Tiptap 原生 Editor
    this.editor = new Editor(this.editorOptionsGenerator(options.config));

    // 2. 创建代理对象（对外暴露）
    this.proxy = createEditorProxy(this.editor);

    // 3. 挂载 Vue 渲染层
    this.app = mountVueEditor({
      el: options.el,
      props: {
        editor: this.editor,
        config: this.customConfigGenerator(options.config),
      },
    });

    // 返回 Proxy 对象
    return this.proxy;
  }

  // 生成 Tiptap 原生 Editor 配置
  editorOptionsGenerator = (config) => {
    console.log("config:", config);
    // 生成extensions
    const extensions = getEditorExtensions(config);
    const {
      content,
      editable,
      autofocus,
      onUpdate,
      onFocus,
      onBlur,
      onInit,
      onDestroy,
    } = config;
    return {
      content,
      extensions,
      editable,
      autofocus,
      onUpdate: ({ editor }) => onUpdate?.(editor),
      onFocus: ({ editor }) => onFocus?.(editor),
      onBlur: ({ editor }) => onBlur?.(editor),
      onCreate: ({ editor }) => onInit?.(editor),
      onDestroy: () => onDestroy?.(),
    };
  };

  // 生成自定义配置
  customConfigGenerator = (config) => {
    const {
      height,
      theme,
      customClass,
      backgroundColorOnFocus,
      showBorder,
      fixedMenuEnabled,
      bubbleMenuEnabled,
      slashMenuEnabled,
    } = config;
    return {
      height,
      theme,
      customClass,
      backgroundColorOnFocus,
      showBorder,
      fixedMenuEnabled,
      bubbleMenuEnabled,
      slashMenuEnabled,
    };
  };
}
