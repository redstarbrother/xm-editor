<template>
  <div class="xm-ai-stream-view" :class="{ 'is-loading': isLoading }">
    <!-- 加载中 -->
    <div v-if="isLoading && !content" class="xm-ai-stream-loading">
      <AiLoadingDots />
      <span class="xm-ai-stream-loading-text">AI 正在思考...</span>
    </div>

    <!-- 流式内容 -->
    <div v-if="content" class="xm-ai-stream-content">
      <div class="xm-ai-generating" v-html="renderedContent"></div>
      <span v-if="isLoading" class="xm-ai-cursor"></span>
    </div>

    <!-- 错误信息 -->
    <div v-if="error" class="xm-ai-stream-error">
      <span class="xm-ai-error-icon">⚠️</span>
      <span class="xm-ai-error-text">{{ error }}</span>
      <button class="xm-ai-error-retry" @click="$emit('retry')">重试</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AiLoadingDots from './AiLoadingDots.vue'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
})

defineEmits(['retry'])

// 简单的 Markdown → HTML 渲染（仅处理基本格式）
const renderedContent = computed(() => {
  if (!props.content) return ''

  let html = props.content
    // 转义 HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 斜体
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 换行
    .replace(/\n/g, '<br>')

  return html
})
</script>

<style scoped>
.xm-ai-stream-view {
  position: relative;
  margin: 4px 0;
}

.xm-ai-stream-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  color: var(--xm-ai-text-secondary, #646a73);
  font-size: 13px;
}

.xm-ai-stream-loading-text {
  animation: xm-ai-fade-pulse 2s ease-in-out infinite;
}

@keyframes xm-ai-fade-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.xm-ai-stream-content {
  padding: 4px 0;
  line-height: 1.7;
  color: var(--xm-ai-text-primary, #1f2329);
  font-size: 15px;
}

.xm-ai-generating {
  background: var(--xm-ai-primary-bg, #f0f5ff);
  border-radius: 4px;
  padding: 8px 12px;
  transition: background-color 0.3s ease;
}

/* AI 光标 — 蓝色闪烁 */
.xm-ai-cursor::after {
  content: '';
  display: inline-block;
  width: 2px;
  height: 1.15em;
  background: var(--xm-ai-primary, #3370ff);
  margin-left: 1px;
  vertical-align: text-bottom;
  animation: xm-ai-blink 0.8s ease-in-out infinite;
}

@keyframes xm-ai-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

.xm-ai-stream-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 6px;
  font-size: 13px;
  color: var(--xm-ai-danger, #ff3b30);
}

.xm-ai-error-retry {
  margin-left: auto;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid var(--xm-ai-danger, #ff3b30);
  background: transparent;
  color: var(--xm-ai-danger, #ff3b30);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.15s ease;
}

.xm-ai-error-retry:hover {
  background: var(--xm-ai-danger, #ff3b30);
  color: #ffffff;
}
</style>
