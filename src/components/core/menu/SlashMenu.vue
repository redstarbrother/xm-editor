<template>
  <div v-if="items" class="menu-container" :style="positionStyle">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="menu-item"
      :class="{ selected: index === selectedIndex }"
      @click="handleSelect(index)"
      @mouseenter="selectedIndex = index"
    >
      <component
        :is="item.icon"
        :stroke-width="iconConfigSlashMenu.strokeWidth"
        :size="iconConfigSlashMenu.size"
        :class="['icon', active ? 'icon-active' : '']"
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
const selectItem = () => {
  const item = props.items[selectedIndex.value];
  if (item) {
    console.log("props: ", props);
    item.command({ editor: props.editor, range: props.range });
    // props.command(item);
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
    selectItem();
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
