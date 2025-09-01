<template>
  <SvgIcon v-bind="props" @click="handleClick" ref="iconRef" />
  <Popover v-if="showPopover" :position="position" ref="menuRef">
    <div v-for="item in headingList" :key="item.label" class="popover-menu-item"
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
  icon: [Object, Function],
  isActive: Function,
  execute: Function,
  editor: Object,
  iconConfig: Object,
});

const headingList = [
  {
    icon: iconMap["heading1"],
    label: "一级标题",
    execute: () => {
      props.editor.chain().focus().setHeading({ level: 1 }).run();
    },
  },
  {
    icon: iconMap["heading2"],
    label: "二级标题",
    execute: () => {
      props.editor.chain().focus().setHeading({ level: 2 }).run();
    },
  },
  {
    icon: iconMap["heading3"],
    label: "三级标题",
    execute: () => {
      props.editor.chain().focus().setHeading({ level: 3 }).run();
    },
  },
  // {
  //   icon: iconMap["heading4"],
  //   label: "四级标题",
  //   execute: () => {
  //     props.editor.chain().focus().setHeading({ level: 4 }).run();
  //   },
  // },
  // {
  //   icon: iconMap["heading5"],
  //   label: "五级标题",
  //   execute: () => {
  //     props.editor.chain().focus().setHeading({ level: 5 }).run();
  //   },
  // },
  // {
  //   icon: iconMap["heading6"],
  //   label: "六级标题",
  //   execute: () => {
  //     props.editor.chain().focus().setHeading({ level: 6 }).run();
  //   },
  // },
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

<style scoped></style>