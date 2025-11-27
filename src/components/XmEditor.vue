<template>
  <div class="xm-editor-root" :style="{
    height: props.height,
    border: props.showBorder ? '1px solid #d1d5da' : 'none',
    borderRadius: props.showBorder ? '5px' : 'none',
  }">
    <BubbleMenu v-if="props.bubbleMenuEnabled && isEditorReady" :editor="editor">
      <MenuBubble :editor="editor" :extensions="bubbleMenuList" />
    </BubbleMenu>
    <MenuFixed v-if="props.fixedMenuEnabled && isEditorReady" :editor="editor" :extensions="fixMenuList" />
    <editor-content class="editor-content" :editor="editor" :style="{
      '--editor-focus-bg': props.backgroundColorOnFocus,
    }" />
  </div>
</template>

<script setup>
import {
  computed,
  onUnmounted,
  onMounted,
  ref,
  watch
} from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import MenuFixed from "@/components/menus/fixed/MenuFixed.vue";
import MenuBubble from "@/components/menus/bubble/MenuBubble.vue";
import EditorProps from "@/components/setting/EditorProps";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import { getEditorExtensions, getBubbleMenuExtensions, getFixedMenuExtensions } from "@/utils/extentionUtil";
import { loadCodeTheme } from "@/utils/themeLoader";
import "@/styles/editor.css";

const props = defineProps(EditorProps);
const content = defineModel('content');

const bubbleMenuList = ref([]);
const fixMenuList = ref([]);

onMounted(() => {
  bubbleMenuList.value = getBubbleMenuExtensions(props.extensions);
  fixMenuList.value = getFixedMenuExtensions(props.extensions);
})

const onUpdate = ({ editor }) => {
  let newContent;
  if (props.contentType === 'json') {
    newContent = editor.getJSON();
  } else {
    newContent = editor.getHTML();
  }
  // 触发更新事件, 实现content双向绑定
  content.value = newContent;
  // 调用外部更新方法
  props.onUpdate(editor);
}

// 监听content变化, 同步到editor
watch(() => content.value, (newContent) => {
  if (!editor.value) return;

  const current =
    props.contentType === "json"
      ? editor.value.getJSON()
      : editor.value.getHTML();

  if (JSON.stringify(newContent) !== JSON.stringify(current)) {
    console.log("change editor content");
    
    if (props.contentType === 'json') {
      editor.value.commands.setContent(newContent);
    } else {
      editor.value.commands.setContent(newContent, false);
    }
  }
}, { deep: true })

const editor = useEditor({
  autofocus: props.autofocus,
  editable: props.editable,
  content: content.value,
  extensions: getEditorExtensions(props),
  onUpdate: onUpdate,
  onFocus: props.onFocus,
  onBlur: props.onBlur,
});
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

const isEditorReady = computed(() => !!editor.value);

onUnmounted(() => {
  if (editor.destroy) {
    editor.destroy();
  }
});
</script>

<style lang="scss">
.xm-editor-root {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-content {
  flex: 1;
  overflow: hidden;
  line-height: 1.4;
}
</style>
