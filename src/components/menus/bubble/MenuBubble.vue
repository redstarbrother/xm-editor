<template>
  <div class="menu-bubble">
    <div class="menu-item" v-for="item in bubbleItems" :key="item.id">
      <div v-if="item.type === 'separator'" class="menu-separator"></div>
      <icon-item v-else-if="item.type === 'mark' || item.type === 'node'" :icon="item.iconCom" :active="activeStates[item.id]"
        :stroke-width="bubbleMenuIconConfig.strokeWidth" :size="bubbleMenuIconConfig.size"
        @click="clickIcon(item.id)"></icon-item>
    </div>
  </div>
</template>

<script setup>
import { computed, markRaw } from "vue";
import IconItem from "@/components/icon/IconItem.vue";
import IconManager from "@/components/icon/iconManager";
import { useMenuActiveState } from "@/composables/useEditorMenu";

const props = defineProps({
  editor: Object,
  extensions: Array,
});

// 气泡菜单图标配置
const bubbleMenuIconConfig = {
  strokeWidth: 2,
  size: 18,
}

// 存储所有气泡菜单的 action 函数
let bubbleAction = {}

// 生成气泡菜单列表（随 props.editor / props.extensions 变更而更新）
const bubbleItems = computed(() => {
  bubbleAction = {}
  let items = props.extensions.map(item => {
    const newItem = { ...item };
    if (!newItem.id) newItem.id = newItem.name;
    
    if (newItem.icon) {
      if (typeof newItem.icon === 'string') {
        newItem.iconCom = markRaw(IconManager.getIconComponent(newItem.icon));
      } else {
        newItem.iconCom = markRaw(newItem.icon);
      }
    }
    
    if (newItem.action) {
      bubbleAction[newItem.id] = newItem.action;
    }
    
    return newItem;
  });

  // 分隔符特殊处理
  items.forEach((item, index) => {
    if (item.type === 'separator') {
      // 第一个和最后一个分隔符特殊处理, 隐藏
      if (index === 0 || index === items.length - 1) {
        item.type = 'hidden';
        return;
      }
      // 两边不是mark或node时, 隐藏分隔符
      const prev = items[index - 1];
      const next = items[index + 1];
      if (
        (prev.type !== 'mark' && prev.type !== 'node') ||
        (next.type !== 'mark' && next.type !== 'node')
      ) {
        item.type = 'hidden';
      }
    }
  })
  return items.filter(item => item.type !== 'hidden');
});

const activeStates = useMenuActiveState(props.editor, bubbleItems);

const clickIcon = (id) => {
  bubbleAction[id]?.({ editor: props.editor });
}
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

.menu-separator {
  width: 1px;
  height: 16px;
  background-color: #e0e0e0;
  margin: 0 2px;
  align-self: center;
}

.is-active {
  background-color: #e0e0e0;
}
</style>
