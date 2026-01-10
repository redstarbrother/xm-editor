<template>
  <div class="page-container">
    <!-- Collapsible Config Panel -->
    <div class="config-sidebar" :class="{ 'is-expanded': isExpanded }">
      <!-- Toggle Button -->
      <div class="sidebar-toggle" @click="toggleSidebar" title="Toggle Configuration">
        <Settings :size="24" />
      </div>

      <!-- Panel Content -->
      <div class="config-content">
        <div class="panel-header">
          <h3>Configuration</h3>
        </div>
        
        <div class="scroll-area">
          <div class="section-title">Editor Options</div>
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="config.editorOption.editable">
              Editable
            </label>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="config.editorOption.autofocus">
              Autofocus
            </label>
          </div>

          <div class="form-group">
            <label>Placeholder</label>
            <input type="text" v-model="config.editorOption.placeholder">
          </div>

          <div class="form-group">
            <label>Debounce (ms)</label>
            <input type="number" v-model.number="config.editorOption.debounce">
          </div>

          <div class="form-group">
            <label>Content Type</label>
            <select v-model="config.editorOption.contentType">
              <option value="json">JSON</option>
              <option value="html">HTML</option>
            </select>
          </div>

          <div class="section-title">Style</div>
          <div class="form-group">
            <label>Theme</label>
            <select v-model="config.style.theme">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div class="form-group">
            <label>Height</label>
            <input type="text" v-model="config.style.height">
          </div>

          <div class="form-group">
            <label>Custom Class</label>
            <input type="text" v-model="config.style.customClass">
          </div>

          <div class="section-title">Extensions</div>
          <div class="extensions-grid">
            <div v-for="(ext, name) in availableExtensions" :key="name" class="extension-item">
              <label class="checkbox-label">
                <input type="checkbox" :value="name" v-model="selectedExtensionNames">
                {{ name }}
              </label>
            </div>
          </div>
        </div>

        <div class="panel-footer">
          <button class="btn btn-primary" @click="applyConfig">
            <Check :size="16" /> 确定
          </button>
          <button class="btn btn-secondary" @click="copyConfig">
            <Copy :size="16" /> 复制配置
          </button>
        </div>
      </div>
    </div>

    <!-- Main Editor Area -->
    <div class="editor-wrapper">
      <div ref="editorContainer" :style="{ height: config.style.height }"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import { Settings, Check, Copy } from 'lucide-vue-next'
import { XmEditor, Extensions, Presets } from '../../src/index'
// import '../../src/styles/editor.css'

const editorContainer = ref(null)
let editor = null
const isExpanded = ref(true)

// Map of available extensions from the library
const availableExtensions = {
  Base: Extensions.Base,
  Blockquote: Extensions.Blockquote,
  Bold: Extensions.Bold,
  Code: Extensions.Code,
  CodeBlock: Extensions.CodeBlock,
  Emoji: Extensions.Emoji,
  Heading: Extensions.Heading,
  Highlight: Extensions.Highlight,
  HorizontalRule: Extensions.HorizontalRule,
  Image: Extensions.Image,
  Italic: Extensions.Italic,
  List: Extensions.List,
  Segmentation: Extensions.Segmentation,
  ShortcutKey: Extensions.ShortcutKey,
  Strike: Extensions.Strike,
  Table: Extensions.Table,
  TextAlign: Extensions.TextAlign,
  Underline: Extensions.Underline,
  Placeholder: Extensions.Placeholder,
  FixedMenu: Extensions.FixedMenu,
  BubbleMenu: Extensions.BubbleMenu,
  SlashMenu: Extensions.SlashMenu,
}

// Default selected extensions (similar to Basic preset)
const selectedExtensionNames = ref([
  'Base', 'Heading', 'Bold', 'Italic', 'Strike', 'Underline', 
  'List', 'Blockquote', 'HorizontalRule', 'Code', 'CodeBlock', 
  'Image', 'Table', 'Emoji', 'Highlight', 'TextAlign', 
  'ShortcutKey', 'Placeholder', 'FixedMenu', 'BubbleMenu', 'SlashMenu',
  'Segmentation'
])

// Configuration State
const config = reactive({
  editorOption: {
    editable: true,
    contentType: 'json',
    content: '', 
    placeholder: "这是一个自定义配置的编辑器...",
    autofocus: false,
    debounce: 300,
  },
  style: {
    theme: 'dark',
    height: '300px',
    customClass: '',
  }
})

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
}

const initEditor = () => {
  if (editor) {
    editor.destroy()
    editor = null
  }

  if (!editorContainer.value) return

  // Construct extensions list based on selection
  const activeExtensions = selectedExtensionNames.value
    .map(name => {
      const ext = availableExtensions[name]
      // Special configuration for Image extension
      if (name === 'Image') {
        return ext.configure({
          uploadHandler: (file) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  url: URL.createObjectURL(file)
                })
              }, 1000)
            })
          }
        })
      }
      return ext
    })
    .filter(Boolean)

  editor = new XmEditor({
    el: editorContainer.value,
    config: {
      extensions: activeExtensions,
      style: {
        theme: config.style.theme,
        height: config.style.height,
        customClass: config.style.customClass,
      },
      editorOption: {
        editable: config.editorOption.editable,
        placeholder: config.editorOption.placeholder,
        content: "",
        autofocus: config.editorOption.autofocus,
        contentType: config.editorOption.contentType,
        debounce: config.editorOption.debounce,
      },
      events: {
        onUpdate: ({ editor: e }) => {
          if (config.editorOption.contentType === 'html') {
             config.editorOption.content = e.getHTML()
          } else {
             config.editorOption.content = e.getJSON()
          }
        }
      }
    }
  })
}

const applyConfig = () => {
  if (editor) {
    if (config.editorOption.contentType === 'html') {
       config.editorOption.content = editor.getHTML()
    } else {
       config.editorOption.content = editor.getJSON()
    }
  }
  initEditor()
}

const copyConfig = () => {
  const configToCopy = {
    editorOption: { ...config.editorOption },
    style: { ...config.style },
    extensions: selectedExtensionNames.value // Export list of extension names
  }
  configToCopy.editorOption.content = ""
  const jsonStr = JSON.stringify(configToCopy, null, 2)
  navigator.clipboard.writeText(jsonStr).then(() => {
    alert('配置已复制到剪贴板')
  }).catch(err => {
    console.error('复制失败:', err)
    alert('复制失败')
  })
}

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
})
</script>

<style scoped>
.page-container {
  display: flex;
  overflow: hidden;
  position: relative;
}

/* Sidebar Styling */
.config-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 340px; /* Slightly wider for extensions grid */
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
  transform: translateX(-340px);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
}

.config-sidebar.is-expanded {
  transform: translateX(0);
}

/* Toggle Button */
.sidebar-toggle {
  position: absolute;
  right: -48px;
  top: 20px;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 0 8px 8px 0;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4b5563;
  transition: color 0.2s;
}

.sidebar-toggle:hover {
  color: #2563eb;
}

/* Panel Content */
.config-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.panel-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.panel-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.section-title {
  font-size: 12px;
  text-transform: uppercase;
  color: #9ca3af;
  font-weight: 600;
  margin: 20px 0 10px;
  letter-spacing: 0.05em;
}

.section-title:first-child {
  margin-top: 0;
}

.panel-footer {
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  gap: 10px;
}

/* Form Elements */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-group label.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input[type="text"]:focus,
.form-group input[type="number"]:focus,
.form-group select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.form-group input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  cursor: pointer;
}

/* Extensions Grid */
.extensions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.extension-item label {
  font-size: 13px;
  color: #4b5563;
}

/* Buttons */
.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: white;
  border: 1px solid #d1d5db;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

/* Editor Wrapper */
.editor-wrapper {
  flex: 1;
  padding: 40px;
  margin-left: 0;
  transition: margin-left 0.3s;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
}
</style>
