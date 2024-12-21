<template>
  <div v-if="editor" class="xm-editor-root">
    <header>
      <MenuFixed v-if="editor" :editor="editor" :extensions="props.options.extensions" />
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
    width: [String, Number],
    height: [String, Number],
  }
})

const defaultWidth = props.width || '100%';
const defaultHeight = props.height || '300px';

const placeholder = '<p>I’m running Tiptap with Vue.js. 🎉</p> '

const editor = useEditor({
  content: placeholder,
  extensions: [StarterKit, ...DependencieExtensions].concat(
    props.options.extensions,
  ),
})

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
