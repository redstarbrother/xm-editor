<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="display" class="dialog-mask" @click.self="close">
        <div class="dialog-container">
          <div class="dialog-title">上传图片</div>

          <div class="upload-section">
            <label class="section-label">通过图片 URL 上传</label>
            <div class="url-upload">
              <input
                type="text"
                v-model="imageUrl"
                placeholder="请输入图片 URL"
              />
              <button @click="uploadByUrl">上传</button>
            </div>
          </div>

          <div class="upload-section">
            <label class="section-label">本地图片上传</label>
            <div
              class="dropzone"
              @dragover.prevent
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
            >
              <p>点击或拖拽图片到此上传</p>
              <input
                type="file"
                accept="image/*"
                ref="fileInput"
                class="file-input"
                @change="handleFileChange"
              />
            </div>
          </div>

          <div class="dialog-footer">
            <button @click="close">关闭</button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const display = defineModel()
function close() {
  display.value = false
}

const emit = defineEmits(["upload"])

const imageUrl = ref("");
const fileInput = ref(null);

function uploadByUrl() {
  if (imageUrl.value.trim()) {
    emit("upload", { type: "url", url: imageUrl.value });
    imageUrl.value = "";
    close();
  } else {
    alert("请输入有效的图片地址");
  }
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    emit("upload", { type: "file", file });
    close();
  }
}

function handleDrop(event) {
  const file = event.dataTransfer.files[0];
  if (file) {
    emit("upload", { type: "file", file });
    close();
  }
}

function triggerFileInput() {
  fileInput.value?.click();
}
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.dialog-container {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
}
.dialog-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}
.upload-section {
  margin-bottom: 20px;
}
.section-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}
.url-upload {
  display: flex;
  gap: 10px;
}
.url-upload input {
  flex: 1;
  padding: 6px;
}
.url-upload button {
  padding: 6px 12px;
}
.dropzone {
  border: 2px dashed #ccc;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.dropzone:hover {
  border-color: #007bff;
}
.file-input {
  display: none;
}
.dialog-footer {
  text-align: right;
  margin-top: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>