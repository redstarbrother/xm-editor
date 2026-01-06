<template>
  <div class="xm-suggestion-menu">
    <div v-for="(item, index) in props.items" :key="index" :class="['item', { active: index === selectedIndex }]"
      @mousedown.prevent="selectItem(item)">
      <component v-if="item.iconType === 'svg'" :is="item.icon" :stroke-width="iconConfigSlashMenu.strokeWidth"
        :size="iconConfigSlashMenu.size" :class="['icon', index === selectedIndex ? 'icon-active' : '']" />
      <span v-else class="item-icon">{{ item.icon }}</span>
      <span class="item-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineExpose } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
});

const selectedIndex = ref(0);

const iconConfigSlashMenu = {
  strokeWidth: 2,
  size: 20,
}

watch(
  () => props.items,
  () => {
    selectedIndex.value = 0;
  }
);

const selectItem = (item) => {
  props.command(item);
};

const onKeyDown = (event) => {
  const { key } = event;
  const length = props.items.length;

  if (!length) return false;

  if (key === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % length;
    return true; // 消费事件
  }

  if (key === 'ArrowUp') {
    selectedIndex.value = (selectedIndex.value - 1 + length) % length;
    return true; // 消费事件
  }

  if (key === 'Enter') {
    selectItem(props.items[selectedIndex.value]);
    return true; // 消费事件
  }

  return false; // 不消费事件
};

defineExpose({
  onKeyDown,
});
</script>

<style scoped>
.xm-suggestion-menu {
  background: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 4px;
  min-width: 180px;
  max-height: calc(48px * 5);
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
}

.xm-suggestion-menu::-webkit-scrollbar {
  width: 6px;
}

.xm-suggestion-menu::-webkit-scrollbar-thumb {
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