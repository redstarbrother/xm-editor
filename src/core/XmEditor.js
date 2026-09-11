import { Editor as TiptapEditor } from "@tiptap/core";
import { ExtensionManager } from "./ExtensionManager";
import { createEditorProxy } from "./proxyEditor";
import { createApp } from "vue";
import XmEditorView from "@/core/XmEditorView.vue";
import EditorRuntime from "./EditorRuntime";
import { normalizeEditorConfig } from './config/normalizeConfig.js';
import { createDebouncedCallback, normalizeContent, serializeContent } from './contentAdapter';

export default class XmEditor {
  constructor(options = {}) {
    const host = options && typeof options === 'object' ? options.el : null;
    this.runtime = new EditorRuntime({ host });
    this.element = host;
    this.config = normalizeEditorConfig(options);
    this.runtime.setConfig(this.config);

    const editorOption = this.config.editorOption || {};
    // 获取初始内容
    this.initialContent = normalizeContent(editorOption.content, editorOption.contentType);
    this.emitUpdate = createDebouncedCallback((payload) => {
      this.config.events?.onUpdate?.(payload);
    }, editorOption.debounce);
    this.runtime.registerCleanup(() => this.emitUpdate.cancel(), { label: 'onUpdate debounce' });

    // 注入 onTocUpdate 事件到 TOC 扩展（如果存在）
    this.injectTocEvent();

    // 1. 初始化扩展管理器
    this.extensionManager = new ExtensionManager(
      this.config.extensions,
      editorOption.placeholder || "",
      this.runtime
    );

    try {
      // 2. 初始化 Tiptap 编辑器
      this.tiptapEditor = this.initTiptapEditor();
      this.runtime.setTiptapEditor(this.tiptapEditor);

      // 3. 挂载 Vue UI (Menus, Bubble, etc.)
      this.mountUI();
      this.runtime.markMounted();

      // 4. 创建编辑器代理
      this.proxy = createEditorProxy(this.tiptapEditor, this.runtime);
    } catch (error) {
      this.runtime.destroy('initialization-error');
      throw error;
    }

    return this.proxy;
  }

  /**
   * 将用户配置的 onTocUpdate 事件注入到 TOC 扩展中
   */
  injectTocEvent() {
    const events = this.config.events || {};
    if (!events.onTocUpdate) return;

    const extensions = this.config.extensions || [];
    const tocIndex = extensions.findIndex((ext) => ext.name === 'toc');
    
    if (tocIndex !== -1) {
      const tocExt = extensions[tocIndex];
      // 将用户的 onTocUpdate 回调注入到 TOC 扩展配置中
      if (typeof tocExt.configure === 'function') {
        extensions[tocIndex] = tocExt.configure({
          onTocUpdate: events.onTocUpdate,
        });
      }
    }
  }

  initTiptapEditor() {
    const extensions = this.extensionManager.getTiptapExtensions();

    const editorOption = this.config.editorOption || {};
    const events = this.config.events || {};

    return new TiptapEditor({
      extensions: extensions,
      xmRuntime: this.runtime,
      xmContentType: editorOption.contentType,
      content: this.initialContent,
      editable: editorOption.editable !== false,
      autofocus: editorOption.autofocus,
      onUpdate: ({ editor }) => {
        this.emitUpdate({
          editor,
          content: serializeContent(editor, editorOption.contentType),
          contentType: editorOption.contentType,
        });
      },
      onFocus: ({ editor, event }) => {
        events.onFocus?.({ editor, event });
      },
      onBlur: ({ editor, event }) => {
        events.onBlur?.({ editor, event });
      },
      onCreate: ({ editor }) => {
        if (editorOption.lineHeight && editor.view && editor.view.dom) {
          editor.view.dom.style.lineHeight = editorOption.lineHeight;
        }
        if (editorOption.fontFamily && editor.view && editor.view.dom) {
          editor.view.dom.style.fontFamily = editorOption.fontFamily;
        }
        events.onInit?.({ editor });
      },
      onDestroy: () => {
        events.onDestroy?.();
      },
    });
  }

  // 挂载 Vue 编辑器组件
  mountUI() {
    if (!this.element) {
      console.warn("No element provided to mount editor UI");
      return null;
    }

    const mountEl = document.createElement('div');
    mountEl.dataset.xmEditorMount = this.runtime.id;
    this.runtime.trackNode(mountEl, { label: 'editor-mount' });
    this.element.appendChild(mountEl);

    const app = createApp(XmEditorView, {
      editor: this.tiptapEditor,
      extensionManager: this.extensionManager, // Pass manager to UI
      config: this.config,
    });
    const vm = app.mount(mountEl);
    this.vueApp = app;
    this.mountEl = mountEl;
    this.runtime.setVueApp(app);
    return vm;
  }

  destroy() {
    return this.runtime.destroy('api');
  }

  getRuntimeState() {
    return this.runtime.getState();
  }
}
