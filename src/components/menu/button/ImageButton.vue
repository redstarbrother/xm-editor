<template>
  <div class="base-button" @click="onClick">
    <component :is="props.icon" />
  </div>
  <ImgUpload v-model="showDialog" :editor="props.editor" @upload="upload" />
</template>

<script setup>
import { defineProps, computed, ref, onMounted } from "vue";
import ImgUpload from "./ImgUpload.vue";
import SvgIcon from "../SvgIcon.vue";

const props = defineProps({
  icon: Object,
  execute: Function,
  editor: Object,
});

const uploadUrl = ref("");

onMounted(() => {
  // 从 editor 中获取 uploadUrl
  const imageExtension = props.editor.extensionManager.extensions.find(
    (ext) => ext.name === "image" // 扩展名要匹配你的自定义 Image 名字
  );

  const url = imageExtension?.options?.uploadUrl;
  uploadUrl.value = url;
});

const showDialog = ref(false);
const imgUploadRef = ref(null);

const onClick = () => {
  showDialog.value = true;
};

const upload = (data) => {
  console.log("data: " + JSON.stringify(data));
  if (data) {
    console.log("uploadUrl: " + uploadUrl.value);
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("file", data.file); 
    fetch(uploadUrl.value, {
      method: "POST",
      body: formData,
    }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        res.json().then((data) => {
          console.log(data);
          const src = data.data.url;
          props.editor.chain().focus().setImage({ src }).run();
        })
      }
    });
  }
};
</script>

<style scoped>
.base-button {
  padding: 2px;
  cursor: pointer;
}
</style>