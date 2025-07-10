<template>
  <div class="base-button" @click="onClick">
    <SvgIcon :name="props.name" />
  </div>
  <ImgUpload
    v-model="showDialog"
    :editor="props.editor"
  />
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import ImgUpload from "./ImgUpload.vue";
import SvgIcon from "../SvgIcon.vue";

const props = defineProps({
  name: String,
  execute: Function,
  editor: Object,
});

const showDialog = ref(false);
const imgUploadRef = ref(null);

const onClick = () => {
  showDialog.value = true;
};

</script>

<style scoped>
.base-button {
  padding: 2px;
  cursor: pointer;
}
</style>