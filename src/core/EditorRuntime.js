let runtimeSequence = 0

/**
 * Owns all resources created for one editor instance.
 * Runtime deliberately has no Vue dependency so it can also be used in tests.
 */
export default class EditorRuntime {
  constructor({ host = null } = {}) {
    this.id = `xm-runtime-${++runtimeSequence}`
    this.host = host
    this.state = 'created'
    this.vueApp = null
    this.tiptapEditor = null
    this.mountEl = null
    this.cleanups = {
      'before-vue': [],
      'after-editor': [],
    }
    this.nodes = new Set()
  }

  isAlive() {
    return this.state !== 'destroying' && this.state !== 'destroyed'
  }

  registerCleanup(cleanup, { phase = 'before-vue', label = 'anonymous' } = {}) {
    if (typeof cleanup !== 'function') return () => {}
    const bucket = this.cleanups[phase] || this.cleanups['before-vue']
    const entry = { cleanup, label, active: true }
    bucket.push(entry)
    return () => {
      entry.active = false
    }
  }

  trackNode(node, options = {}) {
    if (!node) return () => {}
    this.nodes.add(node)
    return this.registerCleanup(() => {
      node.remove?.()
      this.nodes.delete(node)
    }, { phase: options.phase || 'after-editor', label: options.label || 'dom-node' })
  }

  setVueApp(app) {
    this.vueApp = app
  }

  setTiptapEditor(editor) {
    this.tiptapEditor = editor
  }

  markMounted() {
    if (this.state === 'created') this.state = 'mounted'
  }

  getState() {
    return this.state
  }

  destroy(reason = 'manual') {
    if (this.state === 'destroying' || this.state === 'destroyed') return false
    this.state = 'destroying'
    this.destroyReason = reason

    const run = (bucket) => {
      for (let index = bucket.length - 1; index >= 0; index -= 1) {
        const entry = bucket[index]
        if (!entry.active) continue
        entry.active = false
        try {
          entry.cleanup()
        } catch (error) {
          // A failed cleanup must not prevent the remaining resources from being released.
          if (typeof console !== 'undefined' && console.error) {
            console.error(`[XmEditor] cleanup failed: ${entry.label}`, error)
          }
        }
      }
    }

    run(this.cleanups['before-vue'])

    try {
      this.vueApp?.unmount?.()
    } catch (error) {
      console.error?.('[XmEditor] Vue app unmount failed', error)
    }

    try {
      this.tiptapEditor?.destroy?.()
    } catch (error) {
      console.error?.('[XmEditor] Tiptap editor destroy failed', error)
    }

    run(this.cleanups['after-editor'])
    this.nodes.clear()
    this.vueApp = null
    this.tiptapEditor = null
    this.mountEl = null
    this.host = null
    this.state = 'destroyed'
    return true
  }
}
