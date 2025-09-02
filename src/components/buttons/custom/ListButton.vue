<template>
  <SvgIcon v-bind="props" @click="handleClick" ref="iconRef" />
  <Popover v-if="showPopover" :position="position" ref="menuRef">
    <div v-for="item in listItem" :key="item.label" class="popover-menu-item"
      @click="() => { item.execute(); showPopover = false; }">
      <component :is="item.icon" :stroke-width="iconConfig.strokeWidth" :size="iconConfig.size - 2" />
      <span>{{ item.label }}</span>
    </div>
  </Popover>
</template>

<script setup>
import { defineProps, ref } from "vue";
import SvgIcon from "../icon/SvgIcon.vue";
import { iconMap, iconConfig } from "@/components/setting/iconMap";
import Popover from "../popovers/Popover.vue";
import { onClickOutside } from "@vueuse/core";
import { getPostionByElement } from "@/utils/positionUtil.js";

const props = defineProps({
  icon: Function,
  isActive: Function,
  execute: Function,
  editor: Object,
  iconConfig: Object,
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

const showPopover = ref(false);
const menuRef = ref(null);
const iconRef = ref(null);
const position = ref({ x: 0, y: 0 });

const handleClick = () => {
  // 获取图标位置，气泡菜单向下偏移3个像素
  position.value = getPostionByElement(iconRef)
  position.value.y += 3
  if (showPopover.value == true) {
    showPopover.value = false;
  } else {
    showPopover.value = true;
  }
};

onClickOutside(menuRef, (event) => {
  // 检查点击事件是否来自图标元素，如果是则不关闭菜单
  if (iconRef.value && !iconRef.value.$el.contains(event.target)) {
    showPopover.value = false;
  }
});
</script>

<style scoped>
</style>