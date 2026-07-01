<template>
  <div class="xm-ai-loading-dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup>
// 纯 CSS 动画，无需逻辑
</script>

<style scoped>
.xm-ai-loading-dots {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 4px 0;
}

.xm-ai-loading-dots span {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--xm-ai-primary, #3370ff);
  animation: xm-ai-dot-wave 1.2s ease-in-out infinite;
}

.xm-ai-loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.xm-ai-loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes xm-ai-dot-wave {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  40% {
    transform: translateY(-8px);
    opacity: 1;
  }
}
</style>
