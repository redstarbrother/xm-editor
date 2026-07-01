<template>
  <div class="ai-editor-demo">
    <!-- AI 配置面板 -->
    <div class="ai-config-panel">
      <div class="ai-config-header">
        <span class="ai-config-icon">🤖</span>
        <span class="ai-config-title">AI 配置</span>
      </div>
      <div class="ai-config-body">
        <div class="ai-config-field">
          <label>API Key</label>
          <input
            v-model="apiKey"
            type="password"
            placeholder="输入 DeepSeek API Key"
            class="ai-config-input"
          />
        </div>
        <div class="ai-config-field">
          <label>模型</label>
          <select v-model="model" class="ai-config-input">
            <option value="deepseek-chat">deepseek-v4-flash</option>
            <option value="deepseek-chat">deepseek-v4-pro</option>
            <option value="deepseek-chat">deepseek-chat</option>
            <option value="deepseek-reasoner">deepseek-reasoner</option>
          </select>
        </div>
        <div class="ai-config-field">
          <label>自动补全</label>
          <label class="ai-config-switch">
            <input type="checkbox" v-model="completionEnabled" />
            <span class="ai-config-switch-slider"></span>
          </label>
        </div>
        <button class="ai-config-apply" @click="applyConfig">
          应用配置并创建编辑器
        </button>
      </div>
      <div class="ai-config-hints">
        <p><strong>快捷键：</strong></p>
        <ul>
          <li><kbd>Cmd/Ctrl + J</kbd> 唤起 AI 输入框</li>
          <li><kbd>Cmd/Ctrl + Shift + J</kbd> AI 续写</li>
          <li><kbd>Tab</kbd> 采纳自动补全</li>
          <li><kbd>Esc</kbd> 取消补全/关闭 AI</li>
        </ul>
        <p><strong>SlashMenu：</strong>输入 <kbd>/</kbd> 可看到 AI 命令</p>
      </div>
    </div>

    <!-- 编辑器区域 -->
    <div class="ai-editor-container">
      <div id="ai-editor" ref="editorEl"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { XmEditor, Presets } from '@/index'
import '@/styles/xm-editor-ai.css'

const editorEl = ref(null)
const apiKey = ref('')
const model = ref('deepseek-chat')
const completionEnabled = ref(true)
let editorInstance = null

function applyConfig() {
  // 销毁旧编辑器
  if (editorInstance) {
    editorInstance.destroy()
    editorInstance = null
  }
  // 清空容器
  const el = editorEl.value
  if (el) {
    el.innerHTML = ''
  }

  // 创建新编辑器
  const config = {
    ai: {
      apiKey: apiKey.value,
      model: model.value,
      completion: {
        enabled: completionEnabled.value,
        debounce: 600,
      },
    },
    editorOption: {
      placeholder: '开始输入内容，或按 Cmd+J 唤起 AI...',
      content: '<h2>🤖 AI 编辑器演示</h2><p>这是一个集成了 AI 功能的编辑器示例。</p><p>试试以下功能：</p><ul><li>输入 <code>/</code> 打开斜杠菜单，选择 AI 命令</li><li>选中文本后在气泡菜单中点击 ✨ AI 按钮</li><li>按 <code>Cmd+J</code> 唤起 AI 输入框</li><li>正常输入文字，等待自动补全出现</li></ul><p></p>',
    },
  }

  editorInstance = new XmEditor({
    el: '#ai-editor',
    config: Presets.Basic.configure(config),
  })
}

onMounted(() => {
  // 默认不创建编辑器，等用户配置 API Key 后再创建
  // 如果没有 API Key，也可以创建不带 AI 的编辑器
  editorInstance = new XmEditor({
    el: '#ai-editor',
    config: Presets.Basic.configure({
      editorOption: {
        placeholder: '请先在左侧配置 API Key，然后点击"应用配置"...',
        content: '<h2>🤖 AI 编辑器演示</h2><p>请在左侧面板输入 DeepSeek API Key，然后点击"应用配置并创建编辑器"以启用 AI 功能。</p><p></p>',
      },
    }),
  })
})

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy()
    editorInstance = null
  }
})
</script>

<style scoped>
.ai-editor-demo {
  display: flex;
  gap: 20px;
  height: 100%;
  min-height: 600px;
}

.ai-config-panel {
  width: 280px;
  flex-shrink: 0;
  background: #f8f9fb;
  border-radius: 12px;
  border: 1px solid #e1e4e8;
  overflow: hidden;
}

.ai-config-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #3370ff 0%, #7b61ff 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
}

.ai-config-icon {
  font-size: 20px;
}

.ai-config-body {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ai-config-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ai-config-field label {
  font-size: 13px;
  font-weight: 500;
  color: #646a73;
}

.ai-config-input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #dee0e3;
  font-size: 13px;
  outline: none;
  transition: border-color 0.15s;
  background: #ffffff;
}

.ai-config-input:focus {
  border-color: #3370ff;
  box-shadow: 0 0 0 2px rgba(51, 112, 255, 0.1);
}

.ai-config-switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
  cursor: pointer;
}

.ai-config-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.ai-config-switch-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #c4c9d1;
  border-radius: 24px;
  transition: 0.2s;
}

.ai-config-switch-slider::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  left: 3px;
  bottom: 3px;
  background: #ffffff;
  border-radius: 50%;
  transition: 0.2s;
}

.ai-config-switch input:checked + .ai-config-switch-slider {
  background: #3370ff;
}

.ai-config-switch input:checked + .ai-config-switch-slider::before {
  transform: translateX(18px);
}

.ai-config-apply {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #3370ff 0%, #7b61ff 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;
}

.ai-config-apply:hover {
  box-shadow: 0 4px 12px rgba(51, 112, 255, 0.3);
  transform: translateY(-1px);
}

.ai-config-hints {
  padding: 12px 20px 16px;
  border-top: 1px solid #e1e4e8;
  font-size: 12px;
  color: #8b919a;
  line-height: 1.6;
}

.ai-config-hints p {
  margin: 4px 0;
}

.ai-config-hints ul {
  margin: 4px 0;
  padding-left: 18px;
}

.ai-config-hints kbd {
  display: inline-block;
  padding: 1px 5px;
  border-radius: 3px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  font-size: 11px;
  font-family: inherit;
  box-shadow: 0 1px 1px rgba(0,0,0,0.06);
}

.ai-editor-container {
  flex: 1;
  min-width: 0;
}

#ai-editor {
  height: 100%;
}
</style>
