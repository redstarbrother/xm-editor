<template>
  <div class="xm-editor-root" :class="props.config.style?.customClass">
    <BubbleMenu v-if="bubbleReady" :editor="props.editor" :should-show="shouldShowBubbleMenu"
      :options="{ duration: 100, moveTransition: 'transform 0.2s ease-out' }">
      <component :is="MenuBubble" :editor="props.editor" :extensions="bubbleMenuExtensions" />
    </BubbleMenu>
    <component :is="MenuFixed" v-if="fixedReady" :editor="props.editor" :extensions="fixedMenuExtensions" />
    <div v-if="!props.editor">Editor prop is missing!</div>
    <editor-content class="editor-content" :editor="props.editor" />
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  shallowRef,
} from "vue";
import { EditorContent } from "@tiptap/vue-3";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import { loadCodeTheme } from "@/utils/themeLoader";

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
  extensionManager: {
    type: Object,
    required: true,
  },
  config: {
    type: Object,
    default: () => ({}),
  },
});

const bubbleMenuExtensions = shallowRef([]);
const fixedMenuExtensions = shallowRef([]);
const MenuFixed = shallowRef(null);
const MenuBubble = shallowRef(null);

const isEditorReady = computed(() => !!props.editor);

// 监听bubble菜单就绪状态
const bubbleReady = computed(() => {
  return isEditorReady.value && MenuBubble.value;
})

// 监听fixed菜单就绪状态
const fixedReady = computed(() => {
  return isEditorReady.value && MenuFixed.value;
})

// 初始化菜单extension
onMounted(() => {
  if (props.extensionManager) {
    bubbleMenuExtensions.value = props.extensionManager.getBubbleMenuItems();
    fixedMenuExtensions.value = props.extensionManager.getFixedMenuItems();

    // 动态加载菜单组件
    MenuFixed.value = props.extensionManager.getComponent('fixed-menu');
    MenuBubble.value = props.extensionManager.getComponent('bubble-menu');
  }
})

const shouldShowBubbleMenu = ({ editor, state }) => {
  if (!state || !editor) return false;
  const { empty } = state.selection || {};
  if (empty) return false;
  return !editor.isActive('codeBlock') && !editor.isActive('image');
};

// 优先使用配置中的主题，否则默认使用 github.min
const themeToLoad = props.config.editorOption?.codeTheme || "github.min"
loadCodeTheme(themeToLoad)


</script>

<style lang="scss">
.xm-editor-root {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
}

.editor-content {
  min-width: 300px;
  flex: 1;
  overflow: auto;
  line-height: 1.4;
}
</style>
