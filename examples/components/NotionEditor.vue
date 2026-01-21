<template>
  <div class="xm-editor-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { XmEditor, Extensions, Presets } from '../../src/index'
import '@/styles/editor-notion.css'

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
    config: Presets.NotionLike.configure({
      extensions: commonExtensions,
      editorOption: {
        placeholder: "输入 '/' 唤起命令菜单...",
        autofocus: true,
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
