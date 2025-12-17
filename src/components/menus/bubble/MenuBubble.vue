<template>
  <div class="menu-bubble">
    <div class="menu-item" v-for="item in bubbleItems" :key="item.id">
      <component v-if="item.component" :is="item.component" :editor="editor" :item="item" />
      <button v-else @click="item.action(editor)" :class="{ 'is-active': item.isActive(editor) }" class="menu-item-btn"
        type="button" @mousedown.prevent>
        <i :class="item.icon" v-if="typeof item.icon === 'string'"></i>
        <component :is="item.icon" v-else />
        <span v-if="item.label" class="label">{{ item.label }}</span>
      </button>
    </div>


    <component :is="item.component" v-for="(item, index) in buttonCompontents" :key="`button-item-${index}`"
      v-bind="{ ...item.componentProps, iconConfig: bubbleMenuIconConfig }" v-on="item.componentEvents || {}" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { bubbleMenuIconConfig } from "@/config/IconConfig";

const props = defineProps({
  editor: Object,
  extensions: Array,
});


const bubbleItems = computed(() => {
  const { editor } = props;
  if (!editor) return [];

  // 1. 遍历所有扩展，提取 options.bubble 配置
  // Tiptap 的扩展实例存放在 editor.extensionManager.extensions 中
  return editor.extensionManager.extensions
    .map(ext => ext.options.bubble)
    .filter(config => {
      // 过滤：必须有配置，且满足 shouldShow 条件
      if (!config) return false;
      if (typeof config.shouldShow === 'function') {
        return config.shouldShow(editor);
      }
      return true;
    })
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
});

console.log("bubbleItems", bubbleItems.value);


// 生成button组件（随 props.editor / props.extensions 变更而更新）
const buttonCompontents = computed(() =>
  generateButtonCompontents(props.editor, props.extensions)
);

const generateButtonCompontents = (editor, extensions) => {
  return extensions?.reduce((arr, extension) => {
    const { button } = extension.options;

    if (button != undefined) {
      const buttonCompontent = button({
        editor: editor,
      });

      if (Array.isArray(buttonCompontent)) {
        return [...arr, ...buttonCompontent];
      }
      return [...arr, buttonCompontent];
    } else {
      return arr;
    }
  }, []);
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
</style>
