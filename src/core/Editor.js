import { Editor as TiptapEditor } from '@tiptap/core'
import { ExtensionManager } from './ExtensionManager'
import { mountVueEditor } from './mountVueEditor'
import { createEditorProxy } from './proxyEditor'

export class Editor {
  constructor(options = {}) {
    this.options = options
    this.element = options.el
    this.config = options.config || {}
    this.initialContent = this.config.content || ''
    
    // 1. Initialize Extension Manager
    // We expect options.extensions to be passed, or we default to empty/default list
    // In the new architecture, extensions might be imported and passed here
    this.extensionManager = new ExtensionManager(
      options.extensions || [], 
      this.config
    )

    // 2. Initialize Tiptap Editor
    this.tiptapEditor = this.initTiptapEditor()

    // 3. Mount Vue UI (Menus, Bubble, etc.)
    // We pass the editor instance and the extension manager so UI can query menus
    this.vueApp = this.mountUI()

    // 4. Create Proxy (Optional, for backward compatibility or API simplification)
    this.proxy = createEditorProxy(this.tiptapEditor)

    return this.proxy
  }

  initTiptapEditor() {
    const extensions = this.extensionManager.getTiptapExtensions()
    
    // Handle placeholder specifically if it's a top-level config but needs to be in an extension
    // Or rely on ExtensionManager's generic config if passed correctly.
    // For now, we follow Tiptap's standard instantiation.

    return new TiptapEditor({
      element: null, // We might mount Tiptap inside the Vue component or handle it here. 
                     // Existing XmEditor mounted Vue which took 'editor' as prop.
                     // The Vue component likely renders <editor-content>.
                     // So we don't pass 'element' here directly if Vue handles the DOM.
                     // Wait, XmEditor passed 'el' to mountVueEditor.
      extensions: extensions,
      content: this.initialContent,
      editable: this.config.editable !== false,
      autofocus: this.config.autofocus,
      onUpdate: ({ editor }) => {
        this.config.onUpdate?.({ editor })
      },
      onFocus: ({ editor, event }) => {
        this.config.onFocus?.({ editor, event })
      },
      onBlur: ({ editor, event }) => {
        this.config.onBlur?.({ editor, event })
      },
      onCreate: ({ editor }) => {
        this.config.onInit?.({ editor })
      },
      onDestroy: () => {
        this.config.onDestroy?.()
      }
    })
  }

  mountUI() {
    if (!this.element) {
      console.warn('No element provided to mount editor UI')
      return null
    }

    return mountVueEditor({
      el: this.element,
      props: {
        editor: this.tiptapEditor,
        extensionManager: this.extensionManager, // Pass manager to UI
        config: this.config
      }
    })
  }

  destroy() {
    this.tiptapEditor.destroy()
    // Unmount Vue app if needed (mountVueEditor returns vm, usually handled by Vue)
  }
}
