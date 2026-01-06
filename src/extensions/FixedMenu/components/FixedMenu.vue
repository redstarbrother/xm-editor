<template>
  <div class="menu-fixed" ref="containerRef">
    <div class="menu-item" v-for="item in fixedItems" :key="item.id">
      <div v-if="item.type === 'separator'" class="menu-separator"></div>
      <div v-else-if="item.iconCom" class="menu-item-wrapper">
        <icon-item :icon="item.iconCom" :active="activeStates[item.id] || activeMenuId === item.id"
          :stroke-width="fixMenuIconConfig.strokeWidth" :size="fixMenuIconConfig.size" @click="clickIcon(item)" />
        <transition name="fade">
          <component :is="item.component" v-if="activeMenuId === item.id" v-bind="item.componentProps" :editor="editor"
            @close="activeMenuId = null" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, markRaw } from "vue";
import { onClickOutside } from "@vueuse/core";
import IconItem from "@/ui/components/IconItem.vue";
import { useMenuActiveState } from "@/composables/useEditorMenu";

const props = defineProps({
  editor: Object,
  extensions: Array,
});

const activeMenuId = ref(null);
const containerRef = ref(null);

// 生成固定菜单列表（随 props.editor / props.extensions 变更而更新）
const fixedItems = computed(() => {
  return props.extensions
    .map((item) => {
      const newItem = { ...item };
      if (!newItem.id) newItem.id = newItem.name;

      if (newItem.icon) {
          newItem.iconCom = markRaw(newItem.icon);
      }
      return newItem;
    });
});

const activeStates = useMenuActiveState(props.editor, fixedItems);

// 点击图标时触发
const clickIcon = (item) => {
  if (activeMenuId.value === item.id) {
    // 点击已激活的图标，关闭菜单
    activeMenuId.value = null;
  } else {
    // 点击未激活的图标，激活菜单
    if (item.component) {
      activeMenuId.value = item.id;
    } else {
      // 点击非组件图标，执行操作后关闭菜单
      item.action?.({ editor: props.editor });
      activeMenuId.value = null;
    }
  }
}

onClickOutside(containerRef, (event) => {
  activeMenuId.value = null;
});

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

.menu-separator {
  width: 1px;
  height: 18px;
  background-color: #e0e0e0;
  margin: 0 4px;
}

.menu-separator {
  width: 1px;
  height: 18px;
  background-color: #e0e0e0;
  margin: 0 4px;
}

.menu-item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
