<template>
  <div ref="editorContainer"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { XmEditor, Extensions, Presets } from '../../src/index'
import '../../src/styles/editor.css'

const editorContainer = ref(null)
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
  if (!editorContainer.value) return

  editor = new XmEditor({
    el: editorContainer.value,
    config: Presets.Basic.configure({
      extensions: commonExtensions,
      style: {
        theme: 'dark',
        height: '300px',
      },
      editorOption: {
        placeholder: "这是一个自定义配置的编辑器...",
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
