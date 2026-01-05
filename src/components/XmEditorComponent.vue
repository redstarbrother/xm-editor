<template>
  <div class="xm-editor-root" :style="{
    height: props.config.height,
    border: props.config.showBorder ? '1px solid #d1d5da' : 'none',
    borderRadius: props.config.showBorder ? '5px' : 'none',
  }">
    <BubbleMenu v-if="bubbleReady" :editor="props.editor"
      :should-show="shouldShowBubbleMenu" :options="{ duration: 100, moveTransition: 'transform 0.2s ease-out' }">
      <component :is="MenuBubble" :editor="props.editor" :extensions="bubbleMenuExtensions" />
    </BubbleMenu>
    <component :is="MenuFixed" v-if="fixedReady" :editor="props.editor" :extensions="fixedMenuExtensions" />
    <editor-content class="editor-content" :editor="props.editor" :style="{
      '--editor-focus-bg': props.config.backgroundColorOnFocus,
    }" />
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  triggerRef,
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

const bubbleMenuExtensions = ref([]);
const fixedMenuExtensions = ref([]);
const MenuFixed = shallowRef(null);
const MenuBubble = shallowRef(null);

// Create a shallowRef for the editor to handle reactivity
const editorRef = shallowRef(props.editor);

// 监听编辑器事件，触发更新
const handleUpdate = () => {
  triggerRef(editorRef);
};


const bubbleReady = computed(() => {
  return props.config.bubbleMenuEnabled && isEditorReady && MenuBubble.value;
})

const fixedReady = computed(() => {
  return props.config.fixedMenuEnabled && isEditorReady && MenuFixed.value;
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

// 监听编辑器事件
onMounted(() => {
  props.editor.on('transaction', handleUpdate);
  props.editor.on('selectionUpdate', handleUpdate);
  props.editor.on('focus', handleUpdate);
  props.editor.on('blur', handleUpdate);
})

// 组件卸载时，移除事件监听
onUnmounted(() => {
  if (props.editor) {
    props.editor.off('transaction', handleUpdate);
    props.editor.off('selectionUpdate', handleUpdate);
    props.editor.off('focus', handleUpdate);
    props.editor.off('blur', handleUpdate);
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

const isEditorReady = computed(() => !!props.editor);

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
