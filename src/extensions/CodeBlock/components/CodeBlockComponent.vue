<template>
  <node-view-wrapper class="code-block" :class="{ 'is-focused': props.selected }">
    <div class="code-block-content">
      <code class="hljs">
        <node-view-content />
      </code>
    </div>
    <div class="code-block-actions">
      <select class="code-block-language" v-model="selectedLanguage" contenteditable="false">
        <option :value="null">auto</option>
        <option v-for="(language, index) in languages" :key="index" :value="language">
          {{ language }}
        </option>
      </select>
      <button class="code-block-copy" @click="copyToClipboard">
        {{ buttonText }}
      </button>
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref, computed } from 'vue'

const props = defineProps({
  ...nodeViewProps,
})

const buttonText = ref('copy')

const languages = ref(
  props.extension.options.lowlight.listLanguages(),
)

// 复制代码到剪贴板
const copyToClipboard = () => {
  const codeContent = props.node.textContent
  navigator.clipboard
    .writeText(codeContent)
    .then(() => {
      console.log('Code copied to clipboard')
      buttonText.value = 'ok'
      setTimeout(() => {
        buttonText.value = 'copy'
      }, 3000)
    })
    .catch((err) => {
      console.error('Failed to copy code: ', err)
    })
}

// 监控代码类型变化
const selectedLanguage = computed({
  get() {
    return props.node.attrs.language
  },
  set(language) {
    props.updateAttributes({ language })
  },
})
</script>

<style scoped>
.code-block {
  position: relative;
  display: inline-block;
  width: 100%;
}

.tiptap .code-block .code-block-copy {
  width: 50px;
  height: 25px;
  color: #333;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.tiptap .hljs {
  display: block;
  min-height: 1.5em;
}

.code-block-content {
  white-space: pre-wrap;
  font-family: monospace;
  border-radius: 8px;
  padding: 0.5rem;
  overflow: auto;
}

.code-block-actions {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
}

.code-block-language {
    height: 25px;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    color: #333;
    font-size: 12px;
}
</style>
