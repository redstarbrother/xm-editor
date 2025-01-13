<template>
    <div class="xm-editor-root">
        <MenuFixed v-if="props.useMenuFixed && editor" :editor="editor" :extensions="extensions" />
        <editor-content class="editor-content" :editor="editor" />
    </div>
</template>

<script setup>
import { computed, defineProps, provide, onUnmounted } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { DependencieExtensions } from '@/components/extensions'
import MenuFixed from '@/components/menu/MenuFixed.vue'

const props = defineProps({
    width: {
        required: false,
        type: String,
        default: '100%',
    },
    height: {
        required: false,
        type: String,
        default: '300px',
    },
    useMenuFixed: {
        required: false,
        type: Boolean,
        default: true,
    },
    extensions: {
        required: false,
        type: Array,
        default: () => [],
    },
    placeholder: {
        required: false,
        type: String,
        default: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
    },
    // 更改事件
    onChanged: {
        required: false,
        type: Function,
        default: ({ editor }) => { },
    },
    // 聚焦事件
    onFocus: {
        required: false,
        type: Function,
        default: ({ editor, event }) => { },
    },
    // 失焦事件
    onBlur: {
        required: false,
        type: Function,
        default: ({ editor, event }) => { },
    },
})

// 拓展依赖集合
const extensions = computed(() => DependencieExtensions.concat(props.extensions))

const editor = useEditor({
    content: props.placeholder,
    extensions: extensions.value,
    onUpdate: props.onChanged,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
})

onUnmounted(() => {
    editor.destroy()
})

// 注入editor实例
provide('editor', editor)

</script>

<style scoped>
.xm-editor-root {
    border: 1px solid #d1d5da;
    border-radius: 5px;
    overflow: hidden;
}

.editor-content {
    max-height: 500px;
    overflow: auto;
}
</style>