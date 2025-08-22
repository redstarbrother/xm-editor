<template>
  <div class="bubble-area" :style="positionStyle">
    <div
      class="bubble-menu-item"
      v-for="item in menuList"
      :key="item.id"
      @mousedown.prevent.stop="handleItemClick(item)"
    >
      <component
        :is="item.icon"
        :stroke-width="iconConfig.strokeWidth"
        :size="iconConfig.size - 2"
      />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { iconConfig } from "@/components/setting/iconMap";

const props = defineProps({
  menuList: Array,
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 }),
  },
});

const emit = defineEmits(['close']);

const positionStyle = computed(() => {
  return {
    left: `${props.position.x}px`,
    top: `${props.position.y + 3}px`,
  };
});

const handleItemClick = (item) => {
  // 执行菜单项的功能
  item.execute();
  // 通知父组件关闭菜单
  emit('close');
};
</script>

<style lang="scss" scoped>
.bubble-area {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 6px;
  gap: 4px;
  position: absolute;
  z-index: 100;

  .bubble-menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f5f5f5;
    }

    span {
      margin-left: 4px;
      font-size: 12px;
      color: #333;
    }
  }
}
</style>