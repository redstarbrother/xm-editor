<template>
  <div class="container">
    <!-- <XmEditor
      :extensions="extensions"
      :showToolbar="false"
      :backgroundColorOnFocus="'#ffffff'"
      :showBorder="false"
    /> -->
    <XmEditor
      :extensions="extensions"
      :showToolbar="true"
      :onUpdate="onUpdate"
      :height="'100%'"
    />
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
  BulletList,
  OrderedList,
  TaskList,
  Blockquote,
  HorizontalRule,
  CodeBlock,
  Image,
} from "../src/index";
import "../src/styles/base.css";

const extensions = [
  Heading,
  Bold,
  Italic,
  Underline,
  Strike,
  BulletList,
  OrderedList,
  TaskList,
  Blockquote,
  HorizontalRule,
  CodeBlock,
  Image.configure({
    uploadUrl: 'http://127.0.0.1:9527/doc/uploadImg',
  }),
];

const onUpdate = ({ editor }) => {
  console.log(editor.getJSON());
};
</script>

<style scoped>
.container {
  height: 50vh;
}
</style>
