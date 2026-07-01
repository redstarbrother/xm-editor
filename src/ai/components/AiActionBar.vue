<template>
  <div class="xm-ai-action-bar">
    <button
      class="xm-ai-btn xm-ai-btn-primary"
      @click="$emit('accept')"
      :disabled="disabled"
    >
      <span class="xm-ai-btn-icon">✓</span>
      采纳
    </button>
    <button
      class="xm-ai-btn xm-ai-btn-ghost"
      @click="$emit('discard')"
      :disabled="disabled"
    >
      <span class="xm-ai-btn-icon">✗</span>
      丢弃
    </button>
    <div class="xm-ai-action-divider"></div>
    <button
      class="xm-ai-btn xm-ai-btn-outline"
      @click="$emit('retry')"
      :disabled="disabled"
    >
      <span class="xm-ai-btn-icon">↻</span>
      重新生成
    </button>
    <button
      class="xm-ai-btn xm-ai-btn-outline"
      @click="$emit('continue')"
      :disabled="disabled"
    >
      <span class="xm-ai-btn-icon">✎</span>
      继续
    </button>
  </div>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['accept', 'discard', 'retry', 'continue'])
</script>

<style scoped>
.xm-ai-action-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--xm-ai-surface, #ffffff);
  border-radius: 8px;
  box-shadow: var(--xm-ai-shadow, 0 4px 16px rgba(31, 35, 41, 0.1));
  border: 1px solid var(--xm-ai-border, #dee0e3);
  margin: 8px 0;
  animation: xm-ai-slide-up 0.2s ease-out;
}

@keyframes xm-ai-slide-up {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.xm-ai-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.15s ease;
  white-space: nowrap;
  line-height: 1.4;
}

.xm-ai-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.xm-ai-btn-icon {
  font-size: 13px;
}

.xm-ai-btn-primary {
  background: var(--xm-ai-primary, #3370ff);
  color: #ffffff;
}

.xm-ai-btn-primary:hover:not(:disabled) {
  background: var(--xm-ai-primary-light, #5b8def);
  box-shadow: 0 2px 8px rgba(51, 112, 255, 0.3);
}

.xm-ai-btn-ghost {
  background: transparent;
  color: var(--xm-ai-text-secondary, #646a73);
}

.xm-ai-btn-ghost:hover:not(:disabled) {
  background: var(--xm-ai-surface-hover, #f5f7fa);
  color: var(--xm-ai-text-primary, #1f2329);
}

.xm-ai-btn-outline {
  background: transparent;
  color: var(--xm-ai-text-secondary, #646a73);
  border: 1px solid var(--xm-ai-border, #dee0e3);
}

.xm-ai-btn-outline:hover:not(:disabled) {
  background: var(--xm-ai-surface-hover, #f5f7fa);
  border-color: var(--xm-ai-primary, #3370ff);
  color: var(--xm-ai-primary, #3370ff);
}

.xm-ai-action-divider {
  width: 1px;
  height: 20px;
  background: var(--xm-ai-border, #dee0e3);
  margin: 0 2px;
}
</style>
