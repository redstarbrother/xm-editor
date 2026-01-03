<template>
    <div class="sub-menu">
        <div v-for="(item, index) in props.items" :key="index" :class="['item', { active: index === selectedIndex }]"
            @mousedown.prevent="selectItem(item)" @mouseenter="selectedIndex = index">
            <component v-if="item.icon" :is="item.icon" :stroke-width="iconConfig.strokeWidth"
                :size="iconConfig.size" :class="['icon', index === selectedIndex ? 'icon-active' : '']" />
            <span class="item-label">{{ item.label }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close']);
const props = defineProps({
    editor: Object,
    items: Array,
})

const iconConfig = {
    strokeWidth: 2,
    size: 20,
}

const selectedIndex = ref(-1)

const selectItem = (item) => {
    if (item.action) {
        item.action(props.editor)
    }
    emit('close');
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
    padding: 4px;
    min-width: 150px;
    // max-height: calc(48px * 5);
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);

    .item {
        display: flex;
        align-items: center;
        height: 28px;
        gap: 10px;
        padding: 8px 12px;
        margin-bottom: 4px;
        cursor: pointer;
        border-radius: 6px;
        transition: background-color 0.15s ease;

        &.active {
            background: #f3f4f6;
            color: #1a1a1a;
        }

        &:hover:not(.active) {
            background: #f7f8fa;
        }

        .item-label {
            flex-grow: 1;
            font-size: 14px;
            color: #333;
        }
    }
}
</style>
