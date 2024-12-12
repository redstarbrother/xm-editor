<template>
  <div v-if="editor" class="xm-editor-root">
    <header>
      <MenuFixed :editor="editor" :extensions="props.options.extensions" />
    </header>
    <editor-content :editor="editor" />
    <footer />
  </div>
</template>

<script setup >
import { StarterKit } from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { onUnmounted } from 'vue'
import MenuFixed from '@/components/menu/MenuFixed.vue'
import { DependencieExtensions } from '@/components/extensions'

const props = defineProps({
  options: {
    extensions: Array,
    width: string | number,
    height: string | number
  }
})

const placeholder = '<p>I’m running Tiptap with Vue.js. 🎉</p> '

// const extensions: any[] = [
// ]
console.log('run xmEditor')

const editor = useEditor({
  content: placeholder,
  extensions: [StarterKit, ...DependencieExtensions].concat(
    props.options.extensions,
  ),
})

console.log('xmEditor: ' + editor)

// provide('editor', editor)

onUnmounted(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.xm-editor-root {
  border: 1px solid #d1d5da;
  border-radius: 5px;
  overflow: hidden;
}
</style>
