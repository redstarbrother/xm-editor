import { Extension } from '@tiptap/core'

export class ExtensionManager {
  constructor(extensions = [], editorConfig = {}) {
    this.rawExtensions = extensions
    this.editorConfig = editorConfig
    this.extensions = []
    this.manifests = []
    
    this.init()
  }

  init() {
    this.rawExtensions.forEach(item => {
      // Handle both new structure (export default { extension, manifest }) 
      // and legacy/simple structure (export default Extension)
      let extension = null
      let manifest = null

      if (item.extension) {
        // 自定义扩展
        extension = item.extension
        manifest = item.manifest || {}
      } else if (item instanceof Extension || (item.name && item.type)) {
        // 原生 Tiptap 扩展实例或类
        extension = item
        manifest = {}

        // Try to extract legacy options from extension instance
        if (extension.options) {
          if (extension.options.fixed) {
            manifest.fixedMenu = extension.options.fixed
          }
          if (extension.options.bubble) {
            manifest.bubbleMenu = extension.options.bubble
          }
        }
      } else {
        console.warn('Invalid extension format:', item)
        return
      }

      // Allow user config to override extension config
      // Key: manifest.name or extension.name
      const name = manifest.name || extension.name
      if (name && this.editorConfig[name]) {
        if (typeof extension.configure === 'function') {
          extension = extension.configure(this.editorConfig[name])
        }
      }

      this.extensions.push(extension)
      
      // Enhance manifest with defaults if needed
      this.manifests.push({
        name: name,
        ...manifest,
        // Store reference to extension if needed?
      })
    })
  }

  getTiptapExtensions() {
    return this.extensions
  }

  getFixedMenuItems() {
    return this.manifests
      .filter(m => m.fixedMenu)
      .map(m => ({
        ...m.fixedMenu,
        name: m.name, // Ensure name is available
        title: m.title // Ensure title is available
      }))
      .sort((a, b) => (a.order || 999) - (b.order || 999))
  }

  getBubbleMenuItems() {
    return this.manifests
      .filter(m => m.bubbleMenu)
      .map(m => ({
        ...m.bubbleMenu,
        name: m.name
      }))
      .sort((a, b) => (a.order || 999) - (b.order || 999))
  }

  getSlashMenuItems() {
    return this.manifests
      .filter(m => m.slashMenu)
      .map(m => ({
        ...m.slashMenu,
        name: m.name
      }))
      // Slash menu often grouped or just flat list. 
      // Sorting might be relevant.
  }
  
  // Helper to find specific extension config/manifest
  getExtension(name) {
    return this.extensions.find(ext => ext.name === name)
  }
}
