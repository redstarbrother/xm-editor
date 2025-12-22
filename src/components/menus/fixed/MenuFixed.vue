<template>
  <div class="menu-fixed" ref="containerRef">
    <div class="menu-item" v-for="item in fixedItems" :key="item.id">
      <div v-if="item.component" class="menu-item-wrapper">
        <icon-item :icon="item.iconCom" :active="activeStates[item.id]" :stroke-width="fixMenuIconConfig.strokeWidth"
          :size="fixMenuIconConfig.size" @click="clickIcon(item)" />
        <transition name="fade">
          <component :is="item.component" v-if="activeMenuId === item.id" v-bind="item.componentProps" :editor="editor"
            @close="activeMenuId = null" />
        </transition>
      </div>
      <div v-else>
        <icon-item :icon="item.iconCom" :active="activeStates[item.id]" :stroke-width="fixMenuIconConfig.strokeWidth"
          :size="fixMenuIconConfig.size" @click="clickIcon(item)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import IconItem from "@/components/icon/IconItem.vue";
import IconManager from "@/components/icon/iconManager";
import { useMenuActiveState } from "@/composables/useEditorMenu";

const props = defineProps({
  editor: Object,
  extensions: Array,
});

const activeMenuId = ref(null);
const containerRef = ref(null);

// 生成固定菜单列表（随 props.editor / props.extensions 变更而更新）
const fixedItems = computed(() => {
  let items = [];
  props.extensions.forEach(extension => {
    // 检查 extension 是否有 fixed 配置
    if (extension.options?.fixed) {
      let item = extension.options.fixed;
      // 如果没有 id，使用 extension.name 作为 id
      if (!item.id) item.id = extension.name;
      // 获取图标组件
      item.iconCom = IconManager.getIconComponent(item.icon);
      items.push(item);
    }
  })
  // 按优先级排序
  items.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  console.log(items);
  return items;
});

const activeStates = useMenuActiveState(props.editor, fixedItems);

// 点击图标时触发
const clickIcon = (item) => {
  console.log("item: ", item);

  if (activeMenuId.value === item.id) {
    // 点击已激活的图标，关闭菜单
    activeMenuId.value = null;
  } else {
    // 点击未激活的图标，激活菜单
    if (item.component) {
      activeMenuId.value = item.id;
    } else {
      // 点击非组件图标，执行操作后关闭菜单
      item.action?.(props.editor);
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

.menu-item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
