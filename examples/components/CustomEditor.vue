<template>
  <div class="page-container">
    <!-- Collapsible Config Panel -->
    <div class="config-sidebar" :class="{ 'is-expanded': isExpanded }">
      <!-- Toggle Button -->
      <div class="sidebar-toggle" @click="toggleSidebar" :title="isExpanded ? 'Collapse Configuration' : 'Expand Configuration'">
        <ChevronsLeft v-if="isExpanded" :size="24" />
        <Settings v-else :size="24" />
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
import { Settings, Check, Copy, ChevronsLeft } from 'lucide-vue-next'
import { XmEditor, Extensions, Presets } from '../../src/index'

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
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(jsonStr).then(() => {
      alert('配置已复制到剪贴板')
    }).catch(err => {
      console.error('复制失败:', err)
      fallbackCopyConfig(jsonStr)
    })
  } else {
    fallbackCopyConfig(jsonStr)
  }
}

const fallbackCopyConfig = (text) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    alert('配置已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    alert('复制失败')
  }
  document.body.removeChild(textarea)
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

/* =============================
   Sidebar — Light Theme
   ============================= */
.config-sidebar {
  position: fixed;
  left: 0;
  top: 12vh;
  height: 76vh;
  width: 300px;
  background: #ffffff;
  box-shadow:
    4px 0 24px rgba(0, 0, 0, 0.07),
    inset -1px 0 0 #f1f5f9;
  z-index: 100;
  transform: translateX(-300px);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  border-radius: 0 16px 16px 0;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
}

.config-sidebar.is-expanded {
  transform: translateX(0);
}

/* =============================
   Toggle Button
   ============================= */
.sidebar-toggle {
  position: absolute;
  right: -44px;
  top: 12px;
  width: 44px;
  height: 44px;
  background: #ffffff;
  border-radius: 0 10px 10px 0;
  box-shadow: 4px 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #94a3b8;
  transition: color 0.2s, background 0.2s, transform 0.15s;
}

.sidebar-toggle:hover {
  color: #3b82f6;
  background: #f8faff;
  transform: scale(1.06);
}

.config-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.panel-header {
  padding: 20px 20px 14px;
  border-bottom: 1px solid #f1f5f9;
  background: #fafbfc;
}

.panel-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-header h3::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 14px;
  background: linear-gradient(180deg, #3b82f6, #6366f1);
  border-radius: 2px;
}

/* Scroll Area */
.scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 8px;
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 transparent;
}

.scroll-area::-webkit-scrollbar {
  width: 4px;
}
.scroll-area::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}

/* Section Title */
.section-title {
  font-size: 10px;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 700;
  margin: 20px 0 8px;
  letter-spacing: 0.12em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #f1f5f9;
}

.section-title:first-child {
  margin-top: 0;
}

/* Footer */
.panel-footer {
  padding: 14px 16px;
  border-top: 1px solid #f1f5f9;
  background: #fafbfc;
  display: flex;
  gap: 8px;
}

/* =============================
   Form Elements
   ============================= */
.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  letter-spacing: 0.01em;
}

.form-group label.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0;
  padding: 8px 10px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #334155;
  font-size: 13px;
  transition: background 0.15s, border-color 0.15s;
}

.form-group label.checkbox-label:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select {
  width: 100%;
  padding: 8px 11px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  color: #1e293b;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  box-sizing: border-box;
  font-family: inherit;
}

.form-group input[type="text"]::placeholder,
.form-group input[type="number"]::placeholder {
  color: #cbd5e1;
}

.form-group input[type="text"]:focus,
.form-group input[type="number"]:focus,
.form-group select:focus {
  outline: none;
  border-color: #93c5fd;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6,9 12,15 18,9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 30px;
  cursor: pointer;
}

/* Custom Checkbox */
.form-group input[type="checkbox"] {
  width: 15px;
  height: 15px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  accent-color: #3b82f6;
  flex-shrink: 0;
}

/* =============================
   Extensions Grid
   ============================= */
.extensions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.extension-item label {
  font-size: 12px;
  color: #64748b;
}

/* Override checkbox-label for extensions */
.extension-item label.checkbox-label {
  font-size: 12px;
  padding: 6px 8px;
}

/* =============================
   Buttons
   ============================= */
.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
  letter-spacing: 0.01em;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.25);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.35);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #334155;
  transform: translateY(-1px);
}

.btn-secondary:active {
  transform: translateY(0);
}

/* =============================
   Editor Wrapper
   ============================= */
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

