import { Editor } from "@tiptap/core";
import { createEditorProxy } from "./proxyEditor";
import { mountVueEditor } from "./mountVueEditor";
import ExtensionUtil from "@/utils/extentionUtil";

export class XmEditor {
  constructor(options) {
    this.options = options;

    // 如果配置中包含 name 字段，说明是预置配置，需要提取默认配置
    if (options.config.name) {
      options.config = options.config.defaultConfig;
    }

    // 生成 Tiptap 原生 Editor 配置
    const editorOption = this.generateEditorOptions(options.config);
    // 生成用户自定义配置
    const customConfig = this.generateCustomConfig(options.config);

    // 1. 初始化 Tiptap 原生 Editor
    this.editor = new Editor(editorOption);

    // 2. 创建代理对象（对外暴露）
    this.proxy = createEditorProxy(this.editor);

    // 3. 挂载 Vue 渲染层
    this.app = mountVueEditor({
      el: options.el,
      props: {
        editor: this.editor,
        config: customConfig,
      },
    });

    // 返回 Proxy 对象
    return this.proxy;
  }

  generateEditorOptions = (config) => {
    // 生成extensions
    const menuConfig = {
      fixedMenuEnabled: config.fixedMenuEnabled,
      bubbleMenuEnabled: config.bubbleMenuEnabled,
      slashMenuEnabled: config.slashMenuEnabled,
    };
    const extensions = ExtensionUtil.resolveExtensions(menuConfig, config.extensions);
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
      onUpdate: () => onUpdate?.(),
      onFocus: () => onFocus?.(),
      onBlur: () => onBlur?.(),
      onCreate: () => onInit?.(),
      onDestroy: () => onDestroy?.(),
    };
  };

  generateCustomConfig = (config) => {
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
