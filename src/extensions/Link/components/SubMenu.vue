<template>
    <div class="sub-menu">
        <div class="link-container">
            <div class="section-title">添加链接</div>

            <div class="input-group">
                <label class="input-label">链接地址</label>
                <input type="text" v-model="url" placeholder="输入链接地址..." class="url-input" @input="onUrlChange" />
            </div>

            <div class="input-group">
                <label class="input-label">链接文本</label>
                <input type="text" v-model="text" placeholder="输入链接文本..." class="text-input" :disabled="hasSelection" />
            </div>

            <button class="confirm-btn" @click="confirm" :disabled="!url">
                确定
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close']);
const props = defineProps({
    editor: Object,
})

const url = ref('')
const text = ref('')
const hasSelection = ref(false)

onMounted(() => {
    const { selection } = props.editor.state
    const { empty } = selection

    if (!empty) {
        hasSelection.value = true
        // Get selected text
        const selectedText = props.editor.state.doc.textBetween(selection.from, selection.to, ' ')
        text.value = selectedText

        // If it's already a link, get the href
        if (props.editor.isActive('link')) {
            const attrs = props.editor.getAttributes('link')
            url.value = attrs.href || ''
        }
    } else {
        hasSelection.value = false
    }
})

const onUrlChange = () => {
    // If no selection, keep text in sync with url
    if (!hasSelection.value) {
        text.value = url.value
    }
}

const confirm = () => {
    if (!url.value) return
    let href = url.value
    // Check if protocol exists, if not prepend https://
    // Allows http://, https://, mailto:, tel:, or relative paths starting with / or #
    if (!/^(https?:\/\/|mailto:|tel:|\/|#)/.test(href)) {
        href = 'http://' + href
    }

    if (hasSelection.value) {
        // Apply link to selection (using the fixed href)
        if (props.editor.isActive('link')) {
            props.editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
        } else {
            props.editor.chain().focus().setLink({ href }).run()
        }
    } else {
        // Insert text with link
        const linkText = text.value || url.value
        props.editor.chain().focus().insertContent({
            type: 'text',
            text: linkText,
            marks: [
                {
                    type: 'link',
                    attrs: {
                        href // Use fixed href
                    }
                }
            ]
        }).run()
    }
    emit('close')   
}
</script>

<style lang="scss" scoped>
.sub-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    margin-top: 4px;
    background: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 12px;
    min-width: 240px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);

    .link-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .section-title {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin-bottom: 4px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .input-label {
        font-size: 12px;
        color: #666;
    }

    input {
        width: 100%;
        padding: 8px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;

        &:focus {
            border-color: #3b82f6;
        }

        &:disabled {
            background-color: #f3f4f6;
            cursor: not-allowed;
            color: #9ca3af;
        }
    }

    .confirm-btn {
        margin-top: 4px;
        padding: 8px;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover:not(:disabled) {
            background-color: #2563eb;
        }

        &:disabled {
            background-color: #93c5fd;
            cursor: not-allowed;
        }
    }
}
</style>
