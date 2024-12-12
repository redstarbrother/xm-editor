<template>
  <node-view-wrapper class="code-block">
    <button class="code-block-copy" @click="copyToClipboard">
      {{ buttonText }}
    </button>
    <select v-model="selectedLanguage" contenteditable="false">
      <option :value="null">auto</option>
      <option
        v-for="(language, index) in languages"
        :key="index"
        :value="language"
      >
        {{ language }}
      </option>
    </select>
    <pre
      class="code-block-content"
    ><code class="hljs"><node-view-content /></code></pre>
  </node-view-wrapper>
</template>

<script setup >
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref, computed, defineProps } from 'vue'

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

<style>
.tiptap .code-block {
  position: relative;
}

.tiptap .code-block select {
  position: absolute;
  background-color: #fff;
  right: 0.5rem;
  top: 0.5rem;
}

.tiptap .code-block .code-block-copy {
  position: absolute;
  background-color: #fff;
  right: 8rem;
  top: 0.5rem;
  width: 50px;
  height: 25px;
}

.tiptap .hljs {
  font-size: 1.2em;
}

.code-block-content {
  border-radius: 10px;
  overflow: hidden;
}

/* .tiptap .hljs span {
  margin: 5px 5px;
} */
</style>
