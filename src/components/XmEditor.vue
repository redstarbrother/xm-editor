<template>
  <div
    class="xm-editor-root"
    :style="{
      height: props.height,
      border: props.showBorder ? '1px solid #d1d5da' : 'none',
      borderRadius: props.showBorder ? '5px' : 'none',
    }"
  >
    <BubbleMenu :editor="editor" v-if="editor">
      <MenuBubble :editor="editor" :extensions="bubbleMenuList" />
    </BubbleMenu>
    <MenuFixed
      v-if="props.fixedMenuEnabled && isEditorReady"
      :editor="editor"
      :extensions="fixMenuList"
    />
    <editor-content
      class="editor-content"
      :editor="editor"
      :style="{
        '--editor-focus-bg': props.backgroundColorOnFocus,
      }"
    />
  </div>
</template>

<script setup>
import {
  computed,
  defineProps,
  provide,
  onUnmounted,
  watchEffect,
  onMounted,
  watch,
  ref,
} from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import MenuFixed from "@/components/menus/fixed/MenuFixed.vue";
import MenuBubble from "@/components/menus/bubble/MenuBubble.vue";
import EditorProps from "@/components/setting/EditorProps";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import { getEditorExtensions, getBubbleMenuExtensions, getFixedMenuExtensions } from "@/utils/extentionUtil";
import "@/styles/editor.css";

const props = defineProps(EditorProps);

const bubbleMenuList = ref([]);
const fixMenuList = ref([]);

onMounted(() => {
  bubbleMenuList.value = getBubbleMenuExtensions(props.extensions);
  fixMenuList.value = getFixedMenuExtensions(props.extensions);
})

const editor = useEditor({
  autofocus: props.autofocus,
  editable: props.editable,
  content: props.placeholder,
  extensions: getEditorExtensions(props),
  onUpdate: props.onUpdate,
  onFocus: props.onFocus,
  onBlur: props.onBlur,
});

const isEditorReady = computed(() => !!editor.value);

onUnmounted(() => {
  if (editor.destroy) {
    editor.destroy();
  }
});

// 注入editor实例
provide("editor", editor);

// 监听placeholder的变化
watch(
  () => props.placeholder,
  (newContent) => {
    if (editor.value) {
      editor.value.commands.setContent(newContent);
    }
  }
);
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