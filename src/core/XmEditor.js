import { Editor } from "@tiptap/core";
import { createEditorProxy } from "./proxyEditor";
import { mountVueEditor } from "./mountVueEditor";
import ExtensionUtil from "@/utils/extensionUtil";

export class XmEditor {
  constructor(options) {
    this.options = options;

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
    // 菜单配置
    const menuConfig = {
      fixedMenuEnabled: config.fixedMenuEnabled,
      bubbleMenuEnabled: config.bubbleMenuEnabled,
      slashMenuEnabled: config.slashMenuEnabled,
    };
    const extensions = ExtensionUtil.resolveExtensions(
      menuConfig,
      config.extensions
    );

    // placeholder 处理
    if (config.placeholder || config.placeholder !== "") {
      extensions.forEach((ext, index) => {
        if (ext.name === "placeholder") {
          
          // 确保 placeholder 是字符串类型
          if (typeof config.placeholder !== "string") {
            console.warn(
              "Warning: placeholder must be a string. Received:",
              config.placeholder
            );
            return;
          }
          
          extensions[index] = ext.configure({
            placeholder: config.placeholder,
          });
        }
      });
    }
    const {
      content,
      placeholder,
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
      placeholder,
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
