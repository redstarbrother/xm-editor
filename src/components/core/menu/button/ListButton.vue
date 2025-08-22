<template>
  <SvgIcon v-bind="props" @click="handleClick" ref="iconRef" />
  <BubbleMenu
    v-if="showBubble"
    ref="menuRef"
    :menuList="listItem"
    :position="position"
    @close="showBubble = false"
  />
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import SvgIcon from "./SvgIcon.vue";
import { iconMap } from "@/components/setting/iconMap";
import BubbleMenu from "./BubbleMenu.vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  icon: [Object, Function],
  isActive: Function,
  execute: Function,
  editor: Object,
});

const listItem = [
  {
    icon: iconMap["bulletList"],
    label: "无序列表",
    execute: () => {
      props.editor.chain().focus().toggleBulletList().run();
    },
  },
  {
    icon: iconMap["orderedList"],
    label: "有序列表",
    execute: () => {
      props.editor.chain().focus().toggleOrderedList().run();
    },
  },
  {
    icon: iconMap["taskList"],
    label: "任务列表",
    execute: () => {
      props.editor.chain().focus().toggleTaskList().run();
    },
  },
];

const showBubble = ref(false);
const menuRef = ref(null);
const iconRef = ref(null);
const position = ref({ x: 0, y: 0 });

const handleClick = () => {
  // 获取图标元素的位置
  if (iconRef.value) {
    const rect = iconRef.value.$el.getBoundingClientRect();
    position.value = {
      x: rect.left,
      y: rect.bottom, // 在图标下方5px处显示菜单
    };
  }
  if (showBubble.value == true) {
    showBubble.value = false;
  } else {
    showBubble.value = true;
  }
};

onClickOutside(menuRef, (event) => {
  // 检查点击事件是否来自图标元素，如果是则不关闭菜单
  if (iconRef.value && !iconRef.value.$el.contains(event.target)) {
    showBubble.value = false;
  }
});
</script>

<style scoped>
</style>