<template>
  <div class="xm-suggestion-menu" ref="menuRef">
    <template v-for="(group, groupIndex) in groupedItems" :key="groupIndex">
      <div class="group-title">{{ group.category }}</div>
      <div v-for="item in group.items" :key="item.id"
        :class="['item', { active: item.flatIndex === selectedIndex }]"
        @mousedown.prevent="selectItem(item)"
        @mouseenter="selectedIndex = item.flatIndex">
        <div class="icon-wrapper" :class="item.categoryClass">
          <component v-if="item.icon" :is="item.icon" :stroke-width="iconConfigSlashMenu.strokeWidth"
            :size="iconConfigSlashMenu.size" class="icon" />
          <span v-else class="item-icon">{{ item.icon }}</span>
        </div>
        <div class="item-meta">
          <span class="item-label">{{ item.label }}</span>
          <span v-if="item.description" class="item-description">{{ item.description }}</span>
        </div>
      </div>
    </template>
    <div v-if="props.items.length === 0" class="no-result">无匹配结果</div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineExpose, nextTick, computed } from 'vue';

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
const menuRef = ref(null);

const iconConfigSlashMenu = {
  strokeWidth: 2.2,
  size: 15,
}

// 整理并分组 items，同时计算它们在渲染后的扁平索引 flatIndex
const groupedItems = computed(() => {
  const groups = {};
  props.items.forEach((item, index) => {
    const category = item.category || '其它';
    if (!groups[category]) {
      groups[category] = [];
    }
    
    let categoryClass = 'cat-default';
    if (category === '基础') categoryClass = 'cat-basic';
    else if (category === '列表') categoryClass = 'cat-list';
    else if (category === '高级') categoryClass = 'cat-advanced';

    groups[category].push({
      ...item,
      globalIndex: index,
      categoryClass
    });
  });

  const categoryOrder = ['基础', '列表', '高级', '其它'];
  const orderedGroups = [];

  categoryOrder.forEach(cat => {
    if (groups[cat] && groups[cat].length > 0) {
      orderedGroups.push({
        category: cat,
        items: groups[cat]
      });
    }
  });

  Object.keys(groups).forEach(cat => {
    if (!categoryOrder.includes(cat) && groups[cat].length > 0) {
      orderedGroups.push({
        category: cat,
        items: groups[cat]
      });
    }
  });

  // 重新计算在排序和分组后的扁平数组索引 flatIndex，以便于键盘顺畅上下导航
  let flatIdx = 0;
  orderedGroups.forEach(group => {
    group.items.forEach(item => {
      item.flatIndex = flatIdx;
      flatIdx++;
    });
  });

  return orderedGroups;
});

// 获取视觉上渲染后的扁平化命令列表
const flatGroupedItems = computed(() => {
  const list = [];
  groupedItems.value.forEach(group => {
    list.push(...group.items);
  });
  return list;
});

// 滚动到选中项
const scrollToSelected = () => {
  const menu = menuRef.value;
  if (!menu) return;

  const items = menu.querySelectorAll('.item');
  const element = items[selectedIndex.value];
  if (element) {
    element.scrollIntoView({ block: 'nearest' });
  }
};

watch(
  () => props.items,
  () => {
    selectedIndex.value = 0;
    nextTick(() => {
      scrollToSelected();
    });
  }
);

watch(selectedIndex, () => {
  nextTick(() => {
    scrollToSelected();
  });
});

const selectItem = (item) => {
  props.command(item);
};

// 处理键盘事件
const onKeyDown = (event) => {
  const { key } = event;
  const length = flatGroupedItems.value.length;

  if (!length) return false;

  if (key === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % length;
    return true;
  }

  if (key === 'ArrowUp') {
    selectedIndex.value = (selectedIndex.value - 1 + length) % length;
    return true;
  }

  if (key === 'Enter') {
    selectItem(flatGroupedItems.value[selectedIndex.value]);
    return true;
  }

  return false;
};

defineExpose({
  onKeyDown,
});
</script>

<style scoped>
.xm-suggestion-menu {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 6px;
  min-width: 240px;
  max-height: 320px;
  overflow-y: auto;
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.08), 
    0 8px 16px -6px rgba(0, 0, 0, 0.04), 
    0 0 1px 0 rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.xm-suggestion-menu::-webkit-scrollbar {
  width: 5px;
}

.xm-suggestion-menu::-webkit-scrollbar-track {
  background: transparent;
}

.xm-suggestion-menu::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.xm-suggestion-menu::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.group-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  padding: 8px 12px 4px 12px;
  user-select: none;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  margin: 2px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.icon {
  stroke: currentColor;
}

.item-icon {
  font-size: 16px;
}

.cat-basic {
  background-color: #eff6ff;
  color: #3b82f6;
}

.cat-list {
  background-color: #faf5ff;
  color: #a855f7;
}

.cat-advanced {
  background-color: #f0fdf4;
  color: #22c55e;
}

.cat-default {
  background-color: #f3f4f6;
  color: #6b7280;
}

.item-meta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  overflow: hidden;
}

.item-label {
  font-size: 13.5px;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.4;
  transition: color 0.15s ease;
}

.item-description {
  font-size: 11px;
  color: #6b7280;
  line-height: 1.3;
  margin-top: 1px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.item.active {
  background: rgba(55, 65, 81, 0.06);
  transform: translateX(2px);
}

.item.active .item-label {
  color: #000000;
}

.item.active .icon-wrapper {
  transform: scale(1.05);
}

.no-result {
  padding: 12px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
}
</style>