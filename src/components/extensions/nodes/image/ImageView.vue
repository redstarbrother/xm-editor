<template>
  <NodeViewWrapper class="image-view" :class="{ 'is-selected': selected, 'is-resizing': isResizing }">
    <div class="image-wrapper">
      <img
        ref="imageRef"
        :src="node.attrs.src"
        :style="{
          width: node.attrs.width,
          height: node.attrs.height,
        }"
        draggable="false"
      />
      
      <!-- Resize Handle -->
      <div 
        v-if="selected || isResizing" 
        class="resize-handle" 
        @mousedown.prevent="startResize"
      ></div>

      <!-- Size Tooltip -->
      <div v-if="isResizing" class="size-tooltip">
        {{ currentWidth }} px
      </div>
    </div>
  </NodeViewWrapper>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  updateAttributes: {
    type: Function,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  editor: {
    type: Object
  }
})

const imageRef = ref(null)
const isResizing = ref(false)
const startX = ref(0)
const startWidth = ref(0)
const currentWidth = ref(0)
let animationFrameId = null

const startResize = (e) => {
  // Prevent default to avoid text selection or drag issues
  e.preventDefault()
  
  if (!imageRef.value) return
  
  isResizing.value = true
  startX.value = e.clientX
  
  // Parse current width
  const rect = imageRef.value.getBoundingClientRect()
  startWidth.value = rect.width
  currentWidth.value = Math.round(rect.width)
  
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}

const onResize = (e) => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  
  animationFrameId = requestAnimationFrame(() => {
    const diff = e.clientX - startX.value
    const newWidth = Math.max(20, Math.round(startWidth.value + diff))
    
    currentWidth.value = newWidth
    props.updateAttributes({ width: `${newWidth}px` })
  })
}

const stopResize = () => {
  isResizing.value = false
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

onUnmounted(() => {
  stopResize()
})
</script>

<style lang="scss" scoped>
.image-view {
  display: inline-block;
  line-height: 0;
  position: relative;
  user-select: none;
  max-width: 100%;
  margin: 0 2px; // Small margin for inline flow

  &.is-selected {
    .image-wrapper {
      outline: 2px solid #3b82f6;
      border-radius: 3px;
    }
  }
}

.image-wrapper {
  position: relative;
  display: inline-block;
  
  img {
    display: block;
    max-width: 100%;
    border-radius: 3px;
    height: auto; // Maintain aspect ratio
  }
}

.resize-handle {
  position: absolute;
  right: -6px;
  bottom: -6px;
  width: 10px;
  height: 10px;
  background-color: #3b82f6;
  border: 2px solid white;
  border-radius: 50%;
  cursor: nwse-resize;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 0.1s;
  
  &:hover {
    transform: scale(1.2);
  }
}

.size-tooltip {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 2px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 8px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 20;
}
</style>
