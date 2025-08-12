<template>
  <div class="container">
    <div class="editor-area">
      <!-- <XmEditor
      :extensions="extensions"
      :showToolbar="false"
      :backgroundColorOnFocus="'#ffffff'"
      :showBorder="false"
    /> -->
      <XmEditor v-bind="editorProps" />
    </div>
  </div>
</template>

<script setup>
import XmEditor from "../src/index";
import {
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  List,
  Blockquote,
  HorizontalRule,
  CodeBlock,
  Image,
  Table,

} from "../src/index";
import "../src/styles/base.css";

const extensions = [
  Heading,
  Bold,
  Italic,
  Underline,
  Strike,
  List,
  Blockquote,
  HorizontalRule,
  CodeBlock,
  Image.configure({
    uploadUrl: 'http://127.0.0.1:9527/doc/uploadImg',
  }),
  Table,
];

const onUpdate = ({ editor }) => {
  console.log(editor.getJSON());
};

// 使用EditorProps对象形式传入属性
const editorProps = {
  extensions,
  showToolbar: true,
  onUpdate,
  height: '100%'
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.editor-area {
  height: 500px;
  width: 1200px;
}
</style>
