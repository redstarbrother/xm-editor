<template>
    <div class="xm-heading-menu">
        <div v-for="(item, index) in props.items" :key="index" :class="['item', { active: index === selectedIndex }]"
            @mousedown.prevent="selectItem(item)" @mouseenter="selectedIndex = index">
            <component v-if="item.iconType === 'svg'" :is="item.icon" :stroke-width="iconConfigSlashMenu.strokeWidth"
                :size="iconConfigSlashMenu.size" :class="['icon', index === selectedIndex ? 'icon-active' : '']" />
            <span v-else class="item-icon">{{ item.icon }}</span>
            <span class="item-label">{{ item.label }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { iconConfigSlashMenu } from '@/components/setting/iconMap'

const props = defineProps({
    editor: Object,
    items: {
        type: Array,
        default: () => []
    },
})

const selectedIndex = ref(-1)

const selectItem = (item) => {
    if (item.action) {
        item.action(props.editor)
    }
}
</script>

<style lang="scss" scoped>
.xm-heading-menu {
    background: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 4px;
    min-width: 180px;
    max-height: calc(48px * 5);
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
}

.xm-heading-menu::-webkit-scrollbar {
    width: 6px;
}

.xm-heading-menu::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
}

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
}

.item-icon {
    font-size: 18px;
}

.item-label {
    flex-grow: 1;
    font-size: 14px;
    color: #333;
}

.item.active {
    background: #f3f4f6;
    color: #1a1a1a;
}

.item:hover:not(.active) {
    background: #f7f8fa;
}
</style>