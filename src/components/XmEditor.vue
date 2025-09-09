<template>
  <div
    class="xm-editor-root"
    :style="{
      height: props.height,
      border: props.showBorder ? '1px solid #d1d5da' : 'none',
      borderRadius: props.showBorder ? '5px' : 'none',
    }"
  >
    <BubbleMenu v-if="props.bubbleMenuEnabled && isEditorReady" :editor="editor">
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
const emit = defineEmits(['update:content']);

const bubbleMenuList = ref([]);
const fixMenuList = ref([]);

onMounted(() => {
  bubbleMenuList.value = getBubbleMenuExtensions(props.extensions);
  fixMenuList.value = getFixedMenuExtensions(props.extensions);
})

const onUpdate = ({ editor }) => {
  let content;
  if (props.contentType === 'json') {
    content = editor.getJSON();
  } else {
    content = editor.getHTML();
  } 
  // 触发更新事件, 实现content双向绑定
  emit("update:content", content);
  // 调用外部更新方法
  props.onUpdate(content, editor);
}
console.log("props.content: ", typeof props.content);

const initContent = props.content instanceof String ? props.content : props.content.value ;
const editor = useEditor({
  autofocus: props.autofocus,
  editable: props.editable,
  content: initContent,
  extensions: getEditorExtensions(props),
  onUpdate: onUpdate,
  onFocus: props.onFocus,
  onBlur: props.onBlur,
});

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