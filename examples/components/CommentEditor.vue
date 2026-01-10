<template>
    <div class="xm-editor-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { XmEditor, Extensions, Presets } from '../../src/index'
// import '@/styles/editor.css'

let editor = null

const commonExtensions = [
    Extensions.Image.configure({
        uploadHandler: (file) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        url: URL.createObjectURL(file)
                    })
                }, 1000)
            })
        }
    })
]

onMounted(() => {
    editor = new XmEditor({
        el: document.querySelector('.xm-editor-container'),
        config: Presets.Comment.configure({
            extensions: commonExtensions,
            editorOption: {
                placeholder: "欢迎留下你的想法...",
                autofocus: true,
            },
            style: {
                customClass: 'xm-editor-comment',
            },
        })
    })
})

onBeforeUnmount(() => {
    if (editor) {
        editor.destroy()
        editor = null
    }
})
</script>

<style>
.xm-editor-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.xm-editor-comment {
    height: 300px;
    width: 600px;
}
</style>