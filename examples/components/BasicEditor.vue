<template>
  <div class="xm-editor-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { XmEditor, Extensions, Presets } from '../../src/index'
import '@/styles/xm-editor-notion.css'

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
  })
]

onMounted(() => {
  editor = new XmEditor({
    el: document.querySelector('.xm-editor-container'),
    config: Presets.Basic.configure({
      extensions: commonExtensions,
      editorOption: {
        placeholder: "请输入内容...",
        autofocus: true,
      },
      style: {
        customClass: 'xm-editor-basic',
      },
    })
  })
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
})
</script>

<style>
.xm-editor-basic {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
</style>
