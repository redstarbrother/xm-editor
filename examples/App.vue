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
    config: Presets.getPreset(Presets.Basic, {
      extensions: [
        Extensions.Image.configure({
          uploadHandler: (file) => {
            const formData = new FormData();
            formData.append("type", file.type);
            formData.append("file", file);
            console.log("123");
            
            let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNzY0MTI5ODM5MjAxOTc2MzIiLCJ1c2VybmFtZSI6ImpoeCIsInBob25lIjoiMTMyMjA4MzkwNjEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc2NDg1NzIwNywiZXhwIjoxNzY0OTQzNjA3fQ.1BLGHemnCab4rRlahg3HAUX5_YWaI6peAX7lAaMCWD8"
            return fetch("http://127.0.0.1:9527/doc/uploadImg", {
              headers: {
                "Authorization": "Bearer " + token
              },
              method: "POST",
              body: formData,
            })
            .then(res => res.json())
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
        })
      ]
    }),
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
