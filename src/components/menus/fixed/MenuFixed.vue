<template>
  <div class="menu-fixed">
    <div class="menu-item" v-for="item in fixedItems" :key="item.id">
      <icon-item 
        :icon="item.iconCom" 
        :active="activeStates[item.id]" 
        :stroke-width="fixMenuIconConfig.strokeWidth"
        :size="fixMenuIconConfig.size" 
        @click="clickIcon(item.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import IconItem from "@/components/icon/IconItem.vue";
import IconManager from "@/components/icon/iconManager";
import { useMenuActiveState } from "@/composables/useEditorMenu";

const props = defineProps({
  editor: Object,
  extensions: Array,
});

// 存储所有固定菜单的 action 函数
let fixedAction = {}

// 生成固定菜单列表（随 props.editor / props.extensions 变更而更新）
const fixedItems = computed(() => {
  fixedAction = {}
  let items = [];
  props.extensions.forEach(extension => {
    // 检查 extension 是否有 fixed 配置
    if (extension.options?.fixed) {
      let item = extension.options.fixed;
      // 如果没有 id，使用 extension.name 作为 id
      if (!item.id) item.id = extension.name;
      // 获取图标组件
      item.iconCom = IconManager.getIconComponent(item.icon);
      // 存储 action
      fixedAction[item.id] = item.action;
      items.push(item);
    }
    // 兼容旧的 button 配置 (可选，如果不再使用 button 可以移除)
    // else if (extension.options?.button) { ... } 
    // 目前只参考 MenuBubble 逻辑，所以只处理 extension.options.fixed
  })
  // 按优先级排序
  items.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  console.log(items);
  return items;
});

const activeStates = useMenuActiveState(props.editor, fixedItems);

const clickIcon = (id) => {
  fixedAction[id]?.(props.editor);
}

const fixMenuIconConfig = {
  strokeWidth: 2,
  size: 20,
}
</script>

<style scoped>
.menu-fixed {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 5px;
  background-color: #fff;
  border-bottom: 1px solid #d1d5da;
  grid-gap: 5px;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
