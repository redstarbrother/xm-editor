<template>
  <div v-if="items" class="menu-container" :style="positionStyle">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="menu-item"
      :class="{ selected: index === selectedIndex }"
      @mousedown.prevent="selectItem(index)"
      @mouseenter="selectedIndex = index"
    >
      <component
        :is="item.icon"
        :stroke-width="iconConfigSlashMenu.strokeWidth"
        :size="iconConfigSlashMenu.size"
        :class="['icon', index === selectedIndex ? 'icon-active' : '']"
      />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { iconConfigSlashMenu } from "@/components/setting/iconMap";

const props = defineProps({
  items: Array,
  command: Function,
  editor: Object,
  range: Object,
  positionStyle: Object,
});

const selectedIndex = ref(0);

// 选择菜单项
const selectItem = (index) => {
  const item = props.items[index];
  if (item) {
    item.command({ editor: props.editor, range: props.range });
  }
};

const onKeyDown = ({ event }) => {
  if (event.key === "ArrowUp") {
    if (props.items.length) {
      selectedIndex.value =
        (selectedIndex.value - 1 + props.items.length) % props.items.length;
    }
    return true;
  }

  if (event.key === "ArrowDown") {
    if (props.items.length) {
      selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
    }
    return true;
  }

  if (event.key === "Enter") {
    selectItem(selectedIndex.value);
    return true;
  }

  return false;
};

defineExpose({
  onKeyDown,
  selectItem,
});
</script>

<style scoped>
.menu-container {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 0.5rem;
  width: 8rem;
  max-height: 10rem;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0.3rem;
  border-radius: 4px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item.selected {
  background-color: #e5e7eb;
}

.menu-item.selected span {
  color: #4285f4;
}

.icon-active {
  color: #4285f4;
}

/* 隐藏滚动条 */
.menu-container::-webkit-scrollbar {
  display: none;
}
</style>
