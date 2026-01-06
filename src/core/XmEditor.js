import { Editor as TiptapEditor } from '@tiptap/core'
import { markRaw } from 'vue'
import { ExtensionManager } from './ExtensionManager'
import { mountVueEditor } from './mountVueEditor'
import { createEditorProxy } from './proxyEditor'

export default class XmEditor {
  constructor(options = {}) {
    this.options = options
    this.element = options.el
    this.config = options.config || {}
    
    // Get content from the new nested structure
    const editorOption = this.config.editorOption || {}
    this.initialContent = editorOption.content || ''
    
    // 1. Initialize Extension Manager
    // We expect options.extensions to be passed, or we default to empty/default list
    // In the new architecture, extensions might be imported and passed here
    this.extensionManager = new ExtensionManager(
      options.extensions || this.config.extensions || [], 
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
    console.log(extensions);
    
    const editorOption = this.config.editorOption || {}
    const events = this.config.events || {}

    return new TiptapEditor({
      extensions: extensions,
      content: this.initialContent,
      editable: editorOption.editable !== false,
      autofocus: editorOption.autofocus,
      onUpdate: ({ editor }) => {
        events.onUpdate?.({ editor })
      },
      onFocus: ({ editor, event }) => {
        events.onFocus?.({ editor, event })
      },
      onBlur: ({ editor, event }) => {
        events.onBlur?.({ editor, event })
      },
      onCreate: ({ editor }) => {
        events.onInit?.({ editor })
      },
      onDestroy: () => {
        events.onDestroy?.()
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
