<template>
  <NodeViewWrapper class="image-container" contenteditable="false">
    <img
      ref="image"
      :src="node.attrs.src"
      :style="{ width: node.attrs.width, height: node.attrs.height }"
    />
    <div class="resize-handle" @mousedown="startResize"></div>
  </NodeViewWrapper>
</template>

<script setup>
import { ref } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(['editor', 'node', 'updateAttributes'])

const image = ref(null)
let startX = 0
let startWidth = 0

const startResize = (e) => {
  e.preventDefault()
  startX = e.clientX
  startWidth = image.value.offsetWidth

  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}

const onResize = (e) => {
  const newWidth = startWidth + (e.clientX - startX)
  props.updateAttributes({ width: `${newWidth}px` })
}

const stopResize = () => {
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}
img {
  max-width: 100%;
  display: block;
}
.resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  background: gray;
  cursor: se-resize;
}
</style>
