import { Editor as TiptapEditor } from "@tiptap/core";
import { ExtensionManager } from "./ExtensionManager";
import { createEditorProxy } from "./proxyEditor";
import { createApp } from "vue";
import XmEditorView from "@/core/XmEditorView.vue";
import { AiEngine } from "@/ai";

export default class XmEditor {
  constructor(options = {}) {
    this.element = options.el;
    // 根据name判断是否需要调用configure方法
    if(options.config.name) {
      this.config = options.config.configure() || {};
    } else {
      this.config = options.config || {};
    }

    const editorOption = this.config.editorOption || {};
    // 获取初始内容
    this.initialContent = editorOption.content || "";

    // 注入 onTocUpdate 事件到 TOC 扩展（如果存在）
    this.injectTocEvent();

    // 1. 初始化扩展管理器
    this.extensionManager = new ExtensionManager(
      options.extensions || this.config.extensions || [],
      editorOption.placeholder || ""
    );

    // 2. 将 AI 配置注入到 AiCompletion 扩展（用于初始化 CompletionEngine）
    // 必须在 initTiptapEditor 之前执行，否则插件不会被挂载
    this.injectAiConfig();

    // 3. 初始化 Tiptap 编辑器
    this.tiptapEditor = this.initTiptapEditor();

    // 3.5 初始化 AI 引擎
    this.aiEngine = null;
    if (this.config.ai?.apiKey) {
      this.aiEngine = new AiEngine(this.tiptapEditor, this.config.ai);
      // 将 aiEngine 注入到 AI 扩展的 storage 中
      this.injectAiEngine();
    }

    // 4. 挂载 Vue UI (Menus, Bubble, etc.)
    // We pass the editor instance and the extension manager so UI can query menus
    this.vueApp = this.mountUI();

    // 5. 创建编辑器代理
    this.proxy = createEditorProxy(this.tiptapEditor, this.aiEngine);

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
      extensions[tocIndex] = tocExt.configure({
        onTocUpdate: events.onTocUpdate,
      });
    }
  }

  initTiptapEditor() {
    const extensions = this.extensionManager.getTiptapExtensions();

    const editorOption = this.config.editorOption || {};
    const events = this.config.events || {};

    return new TiptapEditor({
      extensions: extensions,
      content: this.initialContent,
      editable: editorOption.editable !== false,
      autofocus: editorOption.autofocus,
      onUpdate: ({ editor }) => {
        events.onUpdate?.({ editor });
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

    const app = createApp(XmEditorView, {
      editor: this.tiptapEditor,
      extensionManager: this.extensionManager, // Pass manager to UI
      config: this.config,
    });
    const vm = app.mount(this.element);
    return vm;
  }

  /**
   * 将 AiEngine 注入到 AI 扩展的 storage
   */
  injectAiEngine() {
    if (!this.aiEngine) return;

    // 注入到 ai-inline 扩展
    const aiInlineStorage = this.tiptapEditor.storage?.['ai-inline'];
    if (aiInlineStorage) {
      aiInlineStorage.aiEngine = this.aiEngine;
    }

    // 注入到 ai-bubble 扩展
    const aiBubbleStorage = this.tiptapEditor.storage?.['ai-bubble'];
    if (aiBubbleStorage) {
      aiBubbleStorage.aiEngine = this.aiEngine;
    }
  }

  /**
   * 将 AI 配置注入到 AiCompletion 扩展（用于初始化 CompletionEngine）
   */
  injectAiConfig() {
    const aiConfig = this.config.ai;
    if (!aiConfig?.apiKey) return;

    // 查找 AiCompletion 扩展并注入配置
    const extensions = this.extensionManager.extensions;
    const aiCompletionExtIndex = extensions.findIndex(ext => ext?.name === 'ai-completion');
    if (aiCompletionExtIndex !== -1) {
      // Tiptap extension 需要通过 configure 生成新实例来注入配置
      extensions[aiCompletionExtIndex] = extensions[aiCompletionExtIndex].configure({
        aiConfig: aiConfig
      });
    }
  }

  destroy() {
    this.aiEngine?.destroy();
    this.tiptapEditor.destroy();
    // Unmount Vue app if needed (mountVueEditor returns vm, usually handled by Vue)
  }
}

