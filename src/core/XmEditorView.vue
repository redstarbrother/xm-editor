<template>
  <div class="xm-editor-root" :class="[props.config.style?.customClass, { 'is-auto-height': props.config.editorOption?.autoHeight }]">
    <BubbleMenu v-if="bubbleReady" :editor="props.editor" :should-show="shouldShowBubbleMenu"
      :options="{ duration: 100, moveTransition: 'transform 0.2s ease-out' }">
      <component :is="MenuBubble" :editor="props.editor" :extensions="bubbleMenuExtensions" />
    </BubbleMenu>
    <component :is="MenuFixed" v-if="fixedReady" :editor="props.editor" :extensions="fixedMenuExtensions" />
    <!-- DragHandle 拖拽手柄 -->
    <component
      :is="DragHandleComponent"
      v-if="dragHandleReady"
      :editor="props.editor"
    />
    <div v-if="!props.editor">Editor prop is missing!</div>
    <!-- 编辑区 + 目录面板的 flex 容器 -->
    <div class="xm-editor-body" :class="{ 'xm-editor-body-toc-left': tocPosition === 'left' }">
      <!-- TOC 面板（左侧模式） -->
      <component
        :is="TocPanelComponent"
        v-if="tocReady && tocPosition === 'left'"
        :editor="props.editor"
        :options="tocOptions"
      />
      <!-- 编辑器内容区 -->
      <editor-content class="editor-content" :editor="props.editor" />
      <!-- TOC 面板（右侧模式，默认） -->
      <component
        :is="TocPanelComponent"
        v-if="tocReady && tocPosition === 'right'"
        :editor="props.editor"
        :options="tocOptions"
      />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  shallowRef,
  ref,
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

// TOC 相关
const TocPanelComponent = shallowRef(null);
const tocOptions = ref({});
const tocPosition = ref('right');

// DragHandle 相关
const DragHandleComponent = shallowRef(null);

const isEditorReady = computed(() => !!props.editor);

// 监听bubble菜单就绪状态
const bubbleReady = computed(() => {
  return isEditorReady.value && MenuBubble.value;
})

// 监听fixed菜单就绪状态
const fixedReady = computed(() => {
  return isEditorReady.value && MenuFixed.value;
})

// 监听toc面板就绪状态
const tocReady = computed(() => {
  return isEditorReady.value && TocPanelComponent.value;
})

// 监听dragHandle就绪状态
const dragHandleReady = computed(() => {
  return isEditorReady.value && DragHandleComponent.value;
})

// 初始化菜单extension
onMounted(() => {
  if (props.extensionManager) {
    bubbleMenuExtensions.value = props.extensionManager.getBubbleMenuItems();
    fixedMenuExtensions.value = props.extensionManager.getFixedMenuItems();

    // 动态加载菜单组件
    MenuFixed.value = props.extensionManager.getComponent('fixed-menu');
    MenuBubble.value = props.extensionManager.getComponent('bubble-menu');

    // 动态加载 TOC 面板
    const tocConfig = props.extensionManager.getTocConfig();
    if (tocConfig && tocConfig.component) {
      TocPanelComponent.value = tocConfig.component;
      tocOptions.value = tocConfig.options || {};
      tocPosition.value = tocConfig.options?.position || 'right';
    }

    // 动态加载 DragHandle 组件
    const dragHandleConfig = props.extensionManager.getDragHandleConfig();
    if (dragHandleConfig && dragHandleConfig.component) {
      DragHandleComponent.value = dragHandleConfig.component;
    }
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

.xm-editor-body {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.xm-editor-body-toc-left {
}

.xm-editor-body-toc-left .xm-toc-panel {
  border-left: none;
  border-right: 1px solid #e1e4e8;
}

.editor-content {
  min-width: 300px;
  flex: 1;
  overflow: auto;
  line-height: 1.4;
}

/* 自适应高度模式 */
.xm-editor-root.is-auto-height {
  height: auto;
  overflow: visible;

  .xm-editor-body {
    height: auto;
    overflow: visible;
  }

  .editor-content {
    overflow: visible;
  }
}
</style>
