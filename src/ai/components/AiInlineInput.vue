<template>
  <div class="xm-ai-inline-input" :class="{ 'is-visible': visible }">
    <div class="xm-ai-inline-card">
      <!-- 左侧渐变边框 -->
      <div class="xm-ai-inline-border"></div>

      <div class="xm-ai-inline-body">
        <!-- AI 图标 -->
        <span class="xm-ai-inline-icon">✨</span>

        <!-- 输入框 -->
        <input
          ref="inputRef"
          v-model="inputText"
          class="xm-ai-inline-field"
          placeholder="在这里输入 AI 指令..."
          @keydown.enter.prevent="handleSubmit"
          @keydown.esc.prevent="handleClose"
          :disabled="isLoading"
        />

        <!-- 加载中 -->
        <AiLoadingDots v-if="isLoading" />

        <!-- 发送按钮 -->
        <button
          v-else
          class="xm-ai-inline-submit"
          @click="handleSubmit"
          :disabled="!inputText.trim()"
        >
          ↵ 发送
        </button>
      </div>
    </div>

    <!-- 流式输出 -->
    <AiStreamView
      v-if="streamContent || isLoading || error"
      :content="streamContent"
      :is-loading="isLoading"
      :error="error"
      @retry="handleRetry"
    />

    <!-- 操作栏 -->
    <AiActionBar
      v-if="streamContent && !isLoading"
      @accept="handleAccept"
      @discard="handleDiscard"
      @retry="handleRetry"
      @continue="handleContinue"
    />
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import AiLoadingDots from './AiLoadingDots.vue'
import AiStreamView from './AiStreamView.vue'
import AiActionBar from './AiActionBar.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  aiEngine: {
    type: Object,
    default: null,
  },
  editor: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'accept', 'discard'])

const inputRef = ref(null)
const inputText = ref('')
const streamContent = ref('')
const isLoading = ref(false)
const error = ref(null)

// 保存插入位置
let insertPos = null
let lastInstruction = ''

// visible 变化时聚焦输入框
watch(() => props.visible, async (val) => {
  if (val) {
    await nextTick()
    inputRef.value?.focus()
    // 记录当前光标位置
    if (props.editor) {
      insertPos = props.editor.state.selection.from
    }
  } else {
    resetState()
  }
})

function resetState() {
  inputText.value = ''
  streamContent.value = ''
  isLoading.value = false
  error.value = null
  insertPos = null
}

async function handleSubmit() {
  if (!inputText.value.trim() || !props.aiEngine) return

  isLoading.value = true
  error.value = null
  streamContent.value = ''
  lastInstruction = inputText.value.trim()

  try {
    // 监听流式输出
    const onChunk = (data) => {
      streamContent.value = data.fullContent
    }
    props.aiEngine.on('chunk', onChunk)

    const result = await props.aiEngine.executeAction('freePrompt', {
      instruction: lastInstruction,
    })

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

function handleAccept() {
  if (!streamContent.value || !props.editor) return

  // 在编辑器中插入内容
  props.editor.commands.insertContent(streamContent.value)
  emit('accept', streamContent.value)
  handleClose()
}

function handleDiscard() {
  emit('discard')
  handleClose()
}

function handleRetry() {
  if (lastInstruction) {
    inputText.value = lastInstruction
    handleSubmit()
  }
}

function handleContinue() {
  if (streamContent.value && props.aiEngine) {
    // 先采纳当前内容
    props.editor.commands.insertContent(streamContent.value)
    streamContent.value = ''
    // 然后继续生成
    inputText.value = '继续'
    handleSubmit()
  }
}

function handleClose() {
  resetState()
  emit('close')
}
</script>

<style scoped>
.xm-ai-inline-input {
  display: none;
  margin: 8px 0;
  animation: xm-ai-slide-up 0.25s ease-out;
}

.xm-ai-inline-input.is-visible {
  display: block;
}

@keyframes xm-ai-slide-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.xm-ai-inline-card {
  display: flex;
  border-radius: 8px;
  background: var(--xm-ai-surface, #ffffff);
  box-shadow: var(--xm-ai-shadow, 0 4px 16px rgba(31, 35, 41, 0.1));
  border: 1px solid var(--xm-ai-border, #dee0e3);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.xm-ai-inline-card:focus-within {
  box-shadow: var(--xm-ai-glow, 0 0 20px rgba(51, 112, 255, 0.15));
  border-color: var(--xm-ai-primary, #3370ff);
}

/* 左侧渐变边框 */
.xm-ai-inline-border {
  width: 3px;
  flex-shrink: 0;
  background: var(--xm-ai-gradient, linear-gradient(135deg, #3370ff 0%, #7b61ff 100%));
}

.xm-ai-inline-body {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px 14px;
  gap: 8px;
}

.xm-ai-inline-icon {
  font-size: 18px;
  flex-shrink: 0;
  animation: xm-ai-sparkle 2s ease-in-out infinite;
}

@keyframes xm-ai-sparkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.xm-ai-inline-field {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: var(--xm-ai-text-primary, #1f2329);
  background: transparent;
  line-height: 1.5;
}

.xm-ai-inline-field::placeholder {
  color: var(--xm-ai-text-ghost, #b0b7c3);
}

.xm-ai-inline-submit {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 14px;
  border-radius: 6px;
  border: none;
  background: var(--xm-ai-primary, #3370ff);
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.xm-ai-inline-submit:hover:not(:disabled) {
  background: var(--xm-ai-primary-light, #5b8def);
  box-shadow: 0 2px 8px rgba(51, 112, 255, 0.3);
}

.xm-ai-inline-submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
