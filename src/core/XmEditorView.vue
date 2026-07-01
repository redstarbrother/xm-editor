<template>
  <div class="xm-editor-root" :class="[props.config.style?.customClass, { 'is-auto-height': props.config.editorOption?.autoHeight }]">
    <BubbleMenu v-if="bubbleReady" :editor="props.editor" :should-show="shouldShowBubbleMenu"
      :options="{ duration: 100, moveTransition: 'transform 0.2s ease-out' }">
      <component :is="MenuBubble" :editor="props.editor" :extensions="bubbleMenuExtensions" />
    </BubbleMenu>
    <component :is="MenuFixed" v-if="fixedReady" :editor="props.editor" :extensions="fixedMenuExtensions" />
    <component
      :is="DragHandleComponent"
      v-if="dragHandleReady"
      :editor="props.editor"
    />
    <!-- Table 右键菜单 -->
    <component
      :is="TableContextMenuComponent"
      v-if="tableContextMenuReady"
      :editor="props.editor"
    />
    <!-- Table 浮动工具栏 -->
    <!-- <BubbleMenu
      v-if="tableToolbarReady"
      :editor="props.editor"
      :should-show="shouldShowTableToolbar"
      :options="{ duration: 100, placement: 'top', offset: [0, 8] }"
    >
      <component :is="TableToolbarComponent" :editor="props.editor" />
    </BubbleMenu> -->
    <!-- AI 气泡菜单面板 -->
    <BubbleMenu
      v-if="aiBubbleReady"
      :editor="props.editor"
      :should-show="() => aiBubbleVisible"
      :options="{ duration: 100, placement: 'bottom-start' }"
    >
      <AiBubblePanel
        :visible="aiBubbleVisible"
        :ai-engine="aiEngine"
        :editor="props.editor"
        @close="closeAiBubble"
        @accept="closeAiBubble"
        @discard="closeAiBubble"
      />
    </BubbleMenu>
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
      <!-- AI Inline 输入框 -->
      <AiInlineInput
        v-if="aiInlineReady"
        :visible="aiInlineVisible"
        :ai-engine="aiEngine"
        :editor="props.editor"
        @close="closeAiInline"
        @accept="closeAiInline"
        @discard="closeAiInline"
      />
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
  watch,
} from "vue";
import { EditorContent } from "@tiptap/vue-3";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import { loadCodeTheme } from "@/utils/themeLoader";
import AiInlineInput from "@/ai/components/AiInlineInput.vue";
import AiBubblePanel from "@/ai/components/AiBubblePanel.vue";

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

// Table 表格扩展相关
const TableContextMenuComponent = shallowRef(null);
const TableToolbarComponent = shallowRef(null);

const isEditorReady = computed(() => !!props.editor);

// AI Inline 相关
const aiEngine = ref(null)
const aiInlineVisible = ref(false)
const aiInlineReady = computed(() => isEditorReady.value && !!aiEngine.value)

function closeAiInline() {
  aiInlineVisible.value = false
  // 同步 storage
  if (props.editor?.storage?.['ai-inline']) {
    props.editor.storage['ai-inline'].visible = false
  }
}

// AI Bubble 相关
const aiBubbleVisible = ref(false)
const aiBubbleReady = computed(() => isEditorReady.value && !!aiEngine.value)

function closeAiBubble() {
  aiBubbleVisible.value = false
  // 同步 storage
  if (props.editor?.storage?.['ai-bubble']) {
    props.editor.storage['ai-bubble'].panelVisible = false
  }
}

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

// 监听表格右键菜单就绪状态
const tableContextMenuReady = computed(() => {
  return isEditorReady.value && TableContextMenuComponent.value;
})

// 监听表格浮动工具栏就绪状态
const tableToolbarReady = computed(() => {
  return isEditorReady.value && TableToolbarComponent.value;
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

    // 动态加载 Table 表格扩展组件
    const tableConfig = props.extensionManager.getTableConfig();
    if (tableConfig) {
      if (tableConfig.contextMenuComponent) {
        TableContextMenuComponent.value = tableConfig.contextMenuComponent;
      }
      if (tableConfig.tableToolbarComponent) {
        TableToolbarComponent.value = tableConfig.tableToolbarComponent;
      }
    }

    // 初始化 AI 引擎引用
    if (props.editor?.storage?.['ai-inline']?.aiEngine) {
      aiEngine.value = props.editor.storage['ai-inline'].aiEngine
    }
  }

  // 监听 AI Inline 和 AI Bubble 的 storage 变化
  if (props.editor) {
    // 初始同步
    aiInlineVisible.value = !!props.editor.storage?.['ai-inline']?.visible
    aiBubbleVisible.value = !!props.editor.storage?.['ai-bubble']?.panelVisible

    props.editor.on('transaction', () => {
      aiInlineVisible.value = !!props.editor.storage?.['ai-inline']?.visible
      aiBubbleVisible.value = !!props.editor.storage?.['ai-bubble']?.panelVisible
    })
  }
})

const shouldShowBubbleMenu = ({ editor, state }) => {
  if (!state || !editor) return false;
  const { empty } = state.selection || {};
  if (empty) return false;
  // 在表格中时仍然显示文本 BubbleMenu（加粗/斜体等）
  return !editor.isActive('codeBlock') && !editor.isActive('image');
};

// 表格浮动工具栏显示条件：光标在表格中且未选中文本时显示
const shouldShowTableToolbar = ({ editor, state }) => {
  if (!state || !editor) return false;
  if (!editor.isActive('table')) return false;
  // 当有文本选中时，显示普通 BubbleMenu而不是表格工具栏
  const { empty } = state.selection || {};
  return empty;
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
