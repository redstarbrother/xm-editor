<template>
  <div class="container">
    <div class="editor-area">
      <!-- <XmEditor
      :extensions="extensions"
      :showToolbar="false"
      :backgroundColorOnFocus="'#ffffff'"
      :showBorder="false"
    /> -->
      <!-- <XmEditor v-bind="editorProps" v-model:content="content"/> -->
      <div id="xm-editor" style="height: 100%"></div>
      <button @click="changeContent">change</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import XmEditor from "../src/index";
// import {
//   Heading,
//   Bold,
//   Italic,
//   Strike,
//   Underline,
//   List,
//   Blockquote,
//   HorizontalRule,
//   CodeBlock,
//   Image,
//   Table,
// } from "../src/index";
// import "../src/styles/base.css";
import { XmEditor, Extensions, Presets } from '../src/index'

const extensions = [
  Extensions.Heading,
  Extensions.Bold,
  Extensions.Italic,
  Extensions.Underline,
  Extensions.Strike,
  Extensions.List,
  Extensions.Blockquote,
  Extensions.HorizontalRule,
  Extensions.CodeBlock,
  Extensions.Image.configure({
    uploadHandler: (file) => {
      const formData = new FormData();
      formData.append("type", file.type);
      formData.append("file", file);
      for (let [k, v] of formData.entries()) {
        console.log(k, v);
      }
      return fetch("http://127.0.0.1:9527/doc/uploadImg", {
        headers: { "Content-Type": "multipart/form-data" },
        method: "POST",
        body: formData,
      })
        .then((res) => {
          console.log('res:', res);
          
          return {
            url: res.data.url,
          };
        })
        .catch((err) => {
          console.log("err:", err);
          return Promise.reject(err);
        });
    },
  }),
  Extensions.Table,
];

const onUpdate = () => {
  console.log("content:", editor.getHTML());
};

const onFocus = () => {
  console.log("onFocus");
}

const changeContent = () => {
  editor.setContent('123');
}

let editor
onMounted(() => {
  editor = new XmEditor({
    el: '#xm-editor',
    config: {
      ...Presets.NotionLike,
      showBorder: true,
      fixedMenuEnabled: true,
      onUpdate,
      onFocus,
    },
  })
})
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
