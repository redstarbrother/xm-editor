<template>
  <div
    class="xm-editor-root"
    :style="{
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
        '--editor-height': props.height,
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
} from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { DependencieExtensions } from "@/components/extensions";
import MenuFixed from "@/components/menu/MenuFixed.vue";
import EditorProps from "@/config/EditorProps";

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
  onUpdate: props.onContentChange,
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
</script>

<style scoped>
.xm-editor-root {
  overflow: hidden;
}

.editor-content {
  /* overflow: auto; */
}

/* ✅ 使用 :deep() 让 scoped 样式生效 */
:deep(.ProseMirror) {
  overflow: auto;
  height: var(--editor-height);
  transition: background-color 0.1s ease-in-out;
}

:deep(.ProseMirror:focus) {
  transition: background-color 0.1s ease-in-out;
  background-color: var(--editor-focus-bg, #fff);
  outline: none;
}
</style>