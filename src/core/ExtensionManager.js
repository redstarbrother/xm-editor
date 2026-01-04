import { Extension } from '@tiptap/core'

export class ExtensionManager {
  constructor(extensions = [], editorConfig = {}) {
    this.rawExtensions = extensions
    this.editorConfig = editorConfig
    this.extensions = []
    this.manifests = []
    this.menuItems = []
    
    this.init()
  }

  init() {
    this.rawExtensions.forEach(item => {
      // Handle both new structure (export default { extension, manifest }) 
      // and legacy/simple structure (export default Extension)
      let extension = null
      let manifest = null

      if (item && typeof item === 'object' && 'extension' in item) {
        // Wrapper structure
        extension = item.extension
        manifest = item.manifest || {}
      } else {
        // Direct extension structure
        extension = item
        manifest = {}
      }

      // Allow user config to override extension config
      // Key: manifest.name or extension.name
      const name = manifest.name || (extension ? extension.name : null)
      
      if (name && this.editorConfig[name] && extension) {
        if (typeof extension.configure === 'function') {
          extension = extension.configure(this.editorConfig[name])
        }
      }

      this.extensions.push(extension)
      
      // Enhance manifest with defaults if needed
      this.manifests.push({
        name: name,
        ...manifest,
      })
    })
  }

  getTiptapExtensions() {
    return this.extensions.filter(ext => ext !== null) // Filter out null extensions (UI-only)
  }

  getComponent(name) {
    const manifest = this.manifests.find(m => m.name === name)
    return manifest ? manifest.component : null
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
