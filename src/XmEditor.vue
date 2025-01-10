<template>
  <div class="xm-editor-root">
    <header>
      <MenuFixed v-if="editorStore.isInit()" :extensions="props.options.extensions" />
    </header>
    <div id="editor-container"></div>
    <footer />
  </div>
</template>

<script setup>
import { StarterKit } from '@tiptap/starter-kit'
import { onMounted, onUnmounted } from 'vue'
import MenuFixed from '@/components/menu/MenuFixed.vue'
import { DependencieExtensions } from '@/components/extensions'

import { useEditorStore } from './store/EditorStore'

const editorStore = useEditorStore()
const props = defineProps({
  options: {
    extensions: Array,
    width: [String, Number],
    height: [String, Number],
  }
})

const defaultWidth = props.width || '100%';
const defaultHeight = props.height || '300px';

const placeholder = '<p>I’m running Tiptap with Vue.js. 🎉</p> '

// 获取拓展集合
function getExtensions() {  
  return [StarterKit, ...DependencieExtensions].concat(props.options.extensions)
}


onMounted(() => {
  const editorContainer = document.querySelector('#editor-container')
  if (!editorStore.editor) {
    editorStore.initializeEditor(getExtensions(), placeholder);
    editorContainer.append(editorStore.editor.options.element);
    console.log('Editor initialized');
  } else {
    editorContainer.append(editorStore.editor.options.element);
    console.log('Editor already initialized');
  }
})

onUnmounted(() => {
  editorStore.destroy()
})
</script>

<style scoped>
.xm-editor-root {
  border: 1px solid #d1d5da;
  border-radius: 5px;
  overflow: hidden;
}
</style>
