<template>
    <div class="sub-menu">
        <!-- 1. 清除高亮 (最左侧) -->
        <div class="action-item" @mousedown.prevent="unsetHighlight" title="清除高亮">
            <Ban :size="16" />
        </div>

        <div class="divider"></div>

        <!-- 2. 预设颜色 (中间) -->
        <div class="color-group">
            <div v-for="color in defaultColors" :key="color" class="color-item"
                :style="{ backgroundColor: color, '--border-color': darkenColor(color, 10) }"
                :class="{ active: editor.isActive('highlight', { color }) }" @mousedown.prevent="setColor(color)">
            </div>
        </div>

        <div class="divider"></div>

        <!-- 3. 自定义颜色 (最右侧) -->
        <div class="action-item" @mousedown.prevent="triggerColorPicker" title="自定义颜色"
            :class="{ active: isCustomColor }">
            <Palette :size="16" />
            <!-- 隐藏的原生取色器 -->
            <input ref="colorInput" type="color" class="color-input" @input="handleCustomColor"
                @change="handleCustomColor" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Ban, Palette } from 'lucide-vue-next';

const props = defineProps({
    editor: Object,
    color: Array,
});

const emit = defineEmits(['close']);
const colorInput = ref(null);

const defaultColors = props.color || [
    '#acf2bd', // Green
    '#c4e4ff', // Blue
    '#fdd0e4', // Pink
    '#e9d9fd', // Purple
    '#fef3bd', // Yellow
];

// 判断当前是否是自定义颜色（既不是预设颜色，但又是高亮状态）
const isCustomColor = computed(() => {
    const currentColor = props.editor.getAttributes('highlight').color;
    const isHighlightActive = props.editor.isActive('highlight');
    return isHighlightActive && currentColor && !defaultColors.includes(currentColor);
});

const setColor = (color) => {
    console.log("color", color);

    props.editor.chain().focus().toggleHighlight({ color }).run();
    // 选中预设颜色后关闭菜单
    emit('close');
};

const unsetHighlight = () => {
    props.editor.chain().focus().unsetHighlight().run();
    emit('close');
};

const triggerColorPicker = () => {
    colorInput.value?.click();
};

const handleCustomColor = (event) => {
    const color = event.target.value;
    if (color) {
        props.editor.chain().focus().setHighlight({ color }).run();
        // 自定义颜色选择通常不立即关闭，方便用户调整，或者根据需求关闭
        // 这里选择不立即关闭，因为调色板交互可能多次触发 input
    }
};

const darkenColor = (color, percent) => {
    let num = parseInt(color.replace('#', ''), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) - amt,
        B = ((num >> 8) & 0x00ff) - amt,
        G = (num & 0x0000ff) - amt;

    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
};
</script>

<style lang="scss" scoped>
.sub-menu {
    position: absolute;
    top: 100%;
    /* 中轴线对齐逻辑：左偏移 50%，再回退自身宽度的 50% */
    left: 50%;
    transform: translateX(-50%);

    z-index: 100;
    margin-top: 8px;
    /* 增加一点顶部间距 */
    background: #ffffff;
    border: none;
    border-radius: 30px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);

    .color-group {
        display: flex;
        gap: 8px;
    }

    .color-item {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        cursor: pointer;
        border: 1px solid var(--border-color, transparent);
        transition: all 0.2s ease;

        &:hover {
            transform: scale(1.1);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        &.active {
            border-color: #3b82f6;
            transform: scale(1.1);
        }
    }

    .divider {
        width: 1px;
        height: 20px;
        background-color: #e5e7eb;
    }

    .action-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        color: #4b5563;
        transition: all 0.2s ease;
        position: relative;

        &:hover {
            background-color: #f3f4f6;
            color: #1f2937;
        }

        &.active {
            background-color: #eff6ff;
            color: #3b82f6;
        }

        /* 隐藏 input */
        .color-input {
            position: absolute;
            width: 0;
            height: 0;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
    }
}
</style>
