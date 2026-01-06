<template>
  <div class="xm-editor-root" :style="{
    height: props.config.style?.height,
    border: props.config.style?.showBorder ? '1px solid #d1d5da' : 'none',
    borderRadius: props.config.style?.showBorder ? '5px' : 'none',
  }">
    <BubbleMenu v-if="bubbleReady" :editor="props.editor"
      :should-show="shouldShowBubbleMenu" :options="{ duration: 100, moveTransition: 'transform 0.2s ease-out' }">
      <component :is="MenuBubble" :editor="props.editor" :extensions="bubbleMenuExtensions" />
    </BubbleMenu>
    <component :is="MenuFixed" v-if="fixedReady" :editor="props.editor" :extensions="fixedMenuExtensions" />
    <div v-if="!props.editor">Editor prop is missing!</div>
    <editor-content class="editor-content" :editor="props.editor" :style="{
      '--editor-focus-bg': props.config.style?.backgroundColorOnFocus,
    }" />
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
import "@/styles/editor.css";
import "@/styles/base.css";

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

console.log('XmEditorComponent setup. Editor:', props.editor);

const bubbleMenuExtensions = shallowRef([]);
const fixedMenuExtensions = shallowRef([]);
const MenuFixed = shallowRef(null);
const MenuBubble = shallowRef(null);

const isEditorReady = computed(() => !!props.editor);

// 监听bubble菜单就绪状态
const bubbleReady = computed(() => {
  return props.config.editorOption?.bubbleMenuEnabled && isEditorReady.value && MenuBubble.value;
})

// 监听fixed菜单就绪状态
const fixedReady = computed(() => {
  return props.config.editorOption?.fixedMenuEnabled && isEditorReady.value && MenuFixed.value;
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

const codeTheme = [
  "atom-one-dark.min",
  "atom-one-light.min",
  "foundation.min",
  "github-dark-dimmed.min",
  "github-dark.min",
  "github.min",
  "googlecode.min",
  "grayscale.min",
  "hybrid.min",
  "idea.min",
  "monokai-sublime.min",
  "monokai.min",
  "night-owl.min",
  "nord.min",
  "pojoaque.min",
  "tomorrow-night-blue.min",
  "tomorrow-night-bright.min",
  "vs.min",
  "xcode.min"
]

loadCodeTheme(codeTheme[5])

</script>

<style lang="scss">
.xm-editor-root {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-content {
  flex: 1;
  overflow: auto;
  line-height: 1.4;
}
</style>
