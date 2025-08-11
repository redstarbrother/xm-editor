<template>
  <div
    class="xm-editor-root"
    :style="{
      height: props.height,
      border: props.showBorder ? '1px solid #d1d5da' : 'none',
      borderRadius: props.showBorder ? '5px' : 'none',
    }"
  >
    <MenuFixed
      v-if="props.showToolbar && isEditorReady"
      :editor="editor"
      :extensions="extensions"
    />
    <editor-content
      class="editor-content"
      :editor="editor"
      :style="{
        '--editor-focus-bg': props.backgroundColorOnFocus,
      }"
    />
  </div>
</template>

<script setup>
import {
  computed,
  defineProps,
  provide,
  onUnmounted,
  watchEffect,
  onMounted,
  watch
} from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { DependencieExtensions } from "./extensions";
import MenuFixed from "./menu/MenuFixed.vue";
import EditorProps from "@/components/setting/EditorProps";
import '@/styles/editor.css'



// const props = defineProps({
//     width: {
//         required: false,
//         type: String,
//         default: '100%',
//     },
//     height: {
//         required: false,
//         type: String,
//         default: '300px',
//     },
//     useMenuFixed: {
//         required: false,
//         type: Boolean,
//         default: true,
//     },
//     extensions: {
//         required: false,
//         type: Array,
//         default: () => [],
//     },
//     placeholder: {
//         required: false,
//         type: String,
//         default: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
//     },
//     // 更改事件
//     onChanged: {
//         required: false,
//         type: Function,
//         default: ({ editor }) => { },
//     },
//     // 聚焦事件
//     onFocus: {
//         required: false,
//         type: Function,
//         default: ({ editor, event }) => { },
//     },
//     // 失焦事件
//     onBlur: {
//         required: false,
//         type: Function,
//         default: ({ editor, event }) => { },
//     },
// })

const props = defineProps(EditorProps);

// 拓展依赖集合
const extensions = computed(() =>
  DependencieExtensions.concat(props.extensions)
);

const editor = useEditor({
  autofocus: props.autofocus,
  editable: props.editable,
  content: props.placeholder,
  extensions: extensions.value,
  onUpdate: props.onUpdate,
  onFocus: props.onFocus,
  onBlur: props.onBlur,
});

const isEditorReady = computed(() => !!editor.value);

onUnmounted(() => {
  if (editor.destroy) {
    editor.destroy();
  }
});

// 注入editor实例
provide("editor", editor);

// 监听placeholder的变化
watch(() => props.placeholder, (newContent) => {
  if (editor.value) {
    editor.value.commands.setContent(newContent);
  }
});
</script>

<style>
.xm-editor-root {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-content {
  flex: 1;
  overflow: hidden;
  line-height: 1.4;
}


</style>