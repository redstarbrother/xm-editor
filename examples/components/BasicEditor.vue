<template>
  <div class="xm-editor-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { XmEditor, Extensions, Presets } from '../../src/index'

let editor = null

const commonExtensions = [
  Extensions.Image.configure({
    uploadHandler: (file) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            url: URL.createObjectURL(file)
          })
        }, 1000)
      })
    }
  }),
  Extensions.Toc,
]

onMounted(() => {
  editor = new XmEditor({
    el: document.querySelector('.xm-editor-container'),
    config: Presets.Basic.configure({
      extensions: commonExtensions,
      editorOption: {
        placeholder: "请输入内容...",
        autofocus: true,
        codeTheme: 'xcode',
      },
      style: {
        customClass: 'xm-editor-basic',
      },
    })
  })
  window.editor = editor
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
    window.editor = null
  }
})
</script>

<style>
.xm-editor-basic {
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  max-height: 500px;
}
</style>
