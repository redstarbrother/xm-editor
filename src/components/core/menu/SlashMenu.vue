<template>
  <div
    v-if="items.length"
    class="bg-white border shadow-lg rounded-md p-2 w-48"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="p-2 rounded cursor-pointer hover:bg-gray-100"
      :class="{ 'bg-gray-200': index === selectedIndex }"
      @click="selectItem(index)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  items: Array,
  command: Function,
  editor: Object,
  range: Object,
  clientRect: Function,
});

const selectedIndex = ref(0);

// 选择菜单项
const selectItem = (index) => {
  const item = props.items[index];
  if (item) {
    props.command(item);
  }
};

// 键盘事件：上下键/回车
const handleKeyDown = (event) => {
  if (event.key === "ArrowDown") {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
    event.preventDefault();
  } else if (event.key === "ArrowUp") {
    selectedIndex.value =
      (selectedIndex.value - 1 + props.items.length) % props.items.length;
    event.preventDefault();
  } else if (event.key === "Enter") {
    selectItem(selectedIndex.value);
    event.preventDefault();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>
