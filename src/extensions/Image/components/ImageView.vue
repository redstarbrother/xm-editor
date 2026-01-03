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
  line-height: 0; // Fix extra space below image
  
  &.is-selected {
    .image-wrapper {
      outline: 2px solid #3b82f6;
    }
  }
}

.image-wrapper {
  position: relative;
  display: inline-block;
  
  img {
    display: block;
    max-width: 100%;
  }
}

.resize-handle {
  position: absolute;
  right: -4px;
  bottom: 50%;
  width: 8px;
  height: 32px;
  transform: translateY(50%);
  background-color: #3b82f6;
  border: 1px solid #fff;
  border-radius: 4px;
  cursor: ew-resize;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: opacity 0.2s;
}

.size-tooltip {
  position: absolute;
  bottom: 100%;
  right: 50%;
  transform: translateX(50%);
  margin-bottom: 8px;
  padding: 4px 8px;
  background-color: rgba(0,0,0,0.8);
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  pointer-events: none;
  white-space: nowrap;
}
</style>
