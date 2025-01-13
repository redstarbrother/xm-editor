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
    onUpdated: {
        required: false,
        type: Function,
        default: () => { },
    },
})

// 拓展依赖集合
const extensions = computed(() => DependencieExtensions.concat(props.extensions))

const editor = useEditor({
    content: props.placeholder,
    extensions: extensions.value,
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

/* 设置滚动条宽度 */
::-webkit-scrollbar {
  width: 10px;  /* 垂直滚动条宽度 */
  height: 10px; /* 水平滚动条高度 */
}

/* 设置滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background-color: #e4e3e3; /* 滑块颜色，柔和灰色 */
  border-radius: 10px;     /* 滑块圆角 */
  border: 2px solid #fff;  /* 滑块边框，增加一些对比度 */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); /* 轻微的阴影效果 */
}

/* 设置滚动条轨道的样式 */
::-webkit-scrollbar-track {
    background-color: rgb(250, 251, 252);
}

/* 设置滚动条按钮的样式（通常用于上下箭头） */
::-webkit-scrollbar-button {
  display: none; /* 隐藏滚动条按钮 */
}

</style>