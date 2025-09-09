<template>
  <div class="container">
    <div class="editor-area">
      <!-- <XmEditor
      :extensions="extensions"
      :showToolbar="false"
      :backgroundColorOnFocus="'#ffffff'"
      :showBorder="false"
    /> -->
      <XmEditor v-bind="editorProps" v-model:content="content"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
    // uploadHandler: (file) => {
    //   return new Promise((resolve, reject) => {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     fetch('http://127.0.0.1:9527/doc/uploadImg', {
    //       method: 'POST',
    //       body: formData,
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         resolve({
    //           url: data.data.url,
    //         });
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // },
  }),
  Table,
];

const content = ref({});

const onUpdate = () => {
  console.log("content:", content.value);
};

// 使用EditorProps对象形式传入属性
const editorProps = {
  extensions,
  onUpdate,
  height: "100%",
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
