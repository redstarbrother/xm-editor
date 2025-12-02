<template>
  <div class="menu-bubble">
    <component
      :is="item.component"
      v-for="(item, index) in buttonCompontents"
      :key="`button-item-${index}`"
      v-bind="{ ...item.componentProps, iconConfig: bubbleMenuIconConfig }"
      v-on="item.componentEvents || {}"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { generateButtonCompontents } from "@/utils/buttonUtil";
import { bubbleMenuIconConfig } from "@/config/IconConfig";

const props = defineProps({
  editor: Object,
  extensions: Array,
});

// 生成button组件（随 props.editor / props.extensions 变更而更新）
const buttonCompontents = computed(() =>
  generateButtonCompontents(props.editor, props.extensions)
);
</script>

<style lang="scss" scoped>
.menu-bubble {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 6px;
  gap: 4px;
//   position: absolute;
  z-index: 100;
}

.menu-bubble-item {
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
</style>
