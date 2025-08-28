<template>
  <div v-if="items.length" class="menu-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="menu-item"
      :class="{ selected: index === selectedIndex }"
      @click="handleSelect(index)"
      @mouseenter="selectedIndex = index"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const props = defineProps({
  items: Array,
  command: Function,
  editor: Object,
  range: Object,
  clientRect: Function,
});

const selectedIndex = ref(0);

// 选择菜单项
const selectItem = () => {
  const item = props.items[selectedIndex.value];
  if (item) {
    props.command(item);
  }
};

const nextItem = () => {
  if (props.items.length) {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
  }
};

const prevItem = () => {
  if (props.items.length) {
    selectedIndex.value =
      (selectedIndex.value - 1 + props.items.length) % props.items.length;
  }
};

// 👇 暴露给外部调用
defineExpose({
  nextItem,
  prevItem,
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
  width: 12rem;
}

.menu-item {
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item.selected {
  background-color: #e5e7eb;
}
</style>
