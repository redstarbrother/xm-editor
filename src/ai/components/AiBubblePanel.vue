<template>
  <div class="xm-ai-bubble-panel" v-if="visible">
    <!-- AI 操作网格 -->
    <div class="xm-ai-bubble-grid">
      <button
        v-for="action in actionList"
        :key="action.name"
        class="xm-ai-bubble-item"
        @click="handleAction(action)"
        :disabled="isLoading"
      >
        <span class="xm-ai-bubble-item-icon">{{ action.icon }}</span>
        <span class="xm-ai-bubble-item-text">{{ action.label }}</span>
      </button>
    </div>

    <!-- 分隔线 -->
    <div class="xm-ai-bubble-divider"></div>

    <!-- 自由输入 -->
    <div class="xm-ai-bubble-free">
      <span class="xm-ai-bubble-free-icon">🤖</span>
      <input
        ref="freeInputRef"
        v-model="freeText"
        class="xm-ai-bubble-free-input"
        placeholder="向 AI 提问..."
        @keydown.enter.prevent="handleFreePrompt"
        :disabled="isLoading"
      />
    </div>

    <!-- 流式输出 -->
    <div v-if="streamContent || isLoading || error" class="xm-ai-bubble-stream">
      <AiStreamView
        :content="streamContent"
        :is-loading="isLoading"
        :error="error"
        @retry="handleRetry"
      />
      <AiActionBar
        v-if="streamContent && !isLoading"
        @accept="handleAccept"
        @discard="handleDiscard"
        @retry="handleRetry"
        @continue="handleContinue"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AiStreamView from './AiStreamView.vue'
import AiActionBar from './AiActionBar.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  editor: {
    type: Object,
    default: null,
  },
  aiEngine: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'accept', 'discard'])

const freeInputRef = ref(null)
const freeText = ref('')
const streamContent = ref('')
const isLoading = ref(false)
const error = ref(null)
let lastActionName = ''
let lastParams = {}

const actionList = computed(() => [
  { name: 'rewrite', label: '改写', icon: '✏️' },
  { name: 'expand', label: '扩写', icon: '📖' },
  { name: 'shorten', label: '缩写', icon: '📄' },
  { name: 'fixGrammar', label: '修正语法', icon: '🎯' },
  { name: 'translate', label: '翻译', icon: '🌐' },
  { name: 'changeTone', label: '改变语气', icon: '🎨' },
])

async function executeAction(actionName, params = {}) {
  if (!props.aiEngine) return

  isLoading.value = true
  error.value = null
  streamContent.value = ''
  lastActionName = actionName
  lastParams = params

  try {
    const onChunk = (data) => {
      streamContent.value = data.fullContent
    }
    props.aiEngine.on('chunk', onChunk)

    const result = await props.aiEngine.executeAction(actionName, params)

    props.aiEngine.off('chunk', onChunk)

    if (result) {
      streamContent.value = result
    }
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

function handleAction(action) {
  executeAction(action.name)
}

function handleFreePrompt() {
  if (!freeText.value.trim()) return
  executeAction('freePrompt', { instruction: freeText.value.trim() })
}

function handleAccept() {
  if (!streamContent.value || !props.editor) return

  const { from, to, empty } = props.editor.state.selection
  if (!empty) {
    props.editor.chain().focus().deleteRange({ from, to }).insertContent(streamContent.value).run()
  } else {
    props.editor.commands.insertContent(streamContent.value)
  }

  emit('accept', streamContent.value)
  resetState()
}

function handleDiscard() {
  resetState()
  emit('discard')
}

function handleRetry() {
  executeAction(lastActionName, lastParams)
}

function handleContinue() {
  if (streamContent.value && props.editor) {
    handleAccept()
    executeAction('continueWriting')
  }
}

function resetState() {
  streamContent.value = ''
  isLoading.value = false
  error.value = null
  freeText.value = ''
}
</script>

<style scoped>
.xm-ai-bubble-panel {
  min-width: 280px;
  max-width: 380px;
  background: var(--xm-ai-surface, #ffffff);
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(31, 35, 41, 0.12);
  border: 1px solid var(--xm-ai-border, #dee0e3);
  padding: 8px;
  animation: xm-ai-scale-in 0.15s ease-out;
}

@keyframes xm-ai-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.xm-ai-bubble-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.xm-ai-bubble-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  color: var(--xm-ai-text-primary, #1f2329);
  transition: background 0.15s ease;
  text-align: left;
}

.xm-ai-bubble-item:hover:not(:disabled) {
  background: var(--xm-ai-surface-hover, #f5f7fa);
}

.xm-ai-bubble-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.xm-ai-bubble-item-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.xm-ai-bubble-divider {
  height: 1px;
  background: var(--xm-ai-border, #dee0e3);
  margin: 6px 4px;
}

.xm-ai-bubble-free {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
}

.xm-ai-bubble-free-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.xm-ai-bubble-free-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: var(--xm-ai-text-primary, #1f2329);
  background: transparent;
}

.xm-ai-bubble-free-input::placeholder {
  color: var(--xm-ai-text-ghost, #b0b7c3);
}

.xm-ai-bubble-stream {
  margin-top: 4px;
  border-top: 1px solid var(--xm-ai-border, #dee0e3);
  padding-top: 8px;
}
</style>
