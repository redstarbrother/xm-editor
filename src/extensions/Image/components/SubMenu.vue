<template>
    <div class="sub-menu">
        <div class="upload-container">
            <div class="section-title">上传图片</div>
            
            <div class="input-group">
                <input 
                    type="text" 
                    v-model="imageUrl" 
                    placeholder="输入图片链接..." 
                    @keydown.enter="insertUrl"
                    class="url-input"
                />
                <button class="confirm-btn" @click="insertUrl" :disabled="!imageUrl">
                    确定
                </button>
            </div>

            <div class="divider">
                <span>或</span>
            </div>

            <div 
                class="upload-area" 
                @click="triggerFileInput" 
                @dragover.prevent="isDragging = true" 
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
                :class="{ 'is-dragging': isDragging }"
            >
                <input 
                    type="file" 
                    ref="fileInput" 
                    accept="image/*" 
                    class="file-input" 
                    @change="handleFileChange" 
                />
                <div class="upload-placeholder">
                    <span class="icon">🖼️</span>
                    <span class="text">点击或拖拽上传</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close']);
const props = defineProps({
    editor: Object,
})

const imageUrl = ref('')
const fileInput = ref(null)
const isDragging = ref(false)

const insertUrl = () => {
    if (imageUrl.value.trim()) {
        props.editor.chain().focus().setImage({ src: imageUrl.value }).run()
        imageUrl.value = ''
        emit('close')
    }
}

const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        uploadFile(file)
    }
}

const handleDrop = (event) => {
    isDragging.value = false
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
        uploadFile(file)
    }
}

const uploadFile = async (file) => {
    // 兼容新旧 extensionManager 结构
    const extensions = props.editor.extensionManager.extensions || []
    const extension = extensions.find(e => e.name === 'image')
    const handler = extension?.options?.uploadHandler

    if (handler && typeof handler === 'function') {
        try {
            const res = await handler(file)
            if (res && res.url) {
                props.editor.chain().focus().setImage({ src: res.url }).run()
                emit('close')
            }
        } catch (error) {
            console.error('Image upload failed:', error)
            // Optionally show error to user
        }
    } else {
        console.warn('Image upload handler not found')
    }
}
</script>

<style lang="scss" scoped>
.sub-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    margin-top: 8px;
    background: #ffffff;
    border: none;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
    width: 280px;

    .section-title {
        font-size: 14px;
        font-weight: 500;
        color: #374151;
        margin-bottom: 12px;
    }

    .input-group {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;

        .url-input {
            flex: 1;
            padding: 8px 12px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 13px;
            outline: none;
            transition: border-color 0.2s;

            &:focus {
                border-color: #3b82f6;
            }
        }

        .confirm-btn {
            padding: 0 12px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 13px;
            cursor: pointer;
            transition: background 0.2s;

            &:disabled {
                background: #9ca3af;
                cursor: not-allowed;
            }

            &:hover:not(:disabled) {
                background: #2563eb;
            }
        }
    }

    .divider {
        display: flex;
        align-items: center;
        margin: 12px 0;
        
        &::before,
        &::after {
            content: '';
            flex: 1;
            height: 1px;
            background: #e5e7eb;
        }

        span {
            padding: 0 8px;
            font-size: 12px;
            color: #9ca3af;
        }
    }

    .upload-area {
        border: 2px dashed #e5e7eb;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;

        &:hover, &.is-dragging {
            border-color: #3b82f6;
            background: #eff6ff;
        }

        .file-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .upload-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;

            .icon {
                font-size: 24px;
            }

            .text {
                font-size: 13px;
                color: #6b7280;
            }
        }
    }
}
</style>
