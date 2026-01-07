<template>
  <div class="app-container">
    <header class="app-header">
      <div class="logo">
        <span class="icon">📝</span>
        <span class="title">西木编辑器</span>
      </div>
      <div class="header-right">
        <span class="update-time">更新于 2025年12月30日</span>
        <a href="https://github.com/simonwep/xm-editor" target="_blank" class="github-link">
          <svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true"
            class="octicon octicon-mark-github v-align-middle">
            <path
              d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z">
            </path>
          </svg>
        </a>
      </div>
    </header>

    <main class="main-content">
      <div class="tabs">
        <div v-for="tab in tabs" :key="tab.id" class="tab-item" :class="{ active: currentTab === tab.id }"
          @click="switchTab(tab.id)">
          {{ tab.label }}
        </div>
      </div>
      <div class="editor-wrapper">
        <component :is="currentEditorComponent" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BasicEditor from './components/BasicEditor.vue'
import NotionEditor from './components/NotionEditor.vue'
import CommentEditor from './components/CommentEditor.vue'
import CustomEditor from './components/CustomEditor.vue'

const tabs = [
  { id: 'basic', label: '常规编辑器' },
  { id: 'notion', label: '类 Notion 风格' },
  { id: 'comment', label: '评论框模式' },
  { id: 'custom', label: '自定义卡片' },
]

const currentTab = ref('basic')

const currentEditorComponent = computed(() => {
  switch (currentTab.value) {
    case 'basic': return BasicEditor
    case 'notion': return NotionEditor
    case 'comment': return CommentEditor
    case 'custom': return CustomEditor
    default: return BasicEditor
  }
})

const switchTab = (id) => {
  currentTab.value = id
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 64px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #3b82f6;
}

.logo .icon {
  margin-right: 8px;
  font-size: 24px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #999;
  font-size: 14px;
}

.github-link {
  color: #333;
  display: flex;
  align-items: center;
}

.main-content {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 30px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 999px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #f1f5f9;
}

.tab-item {
  padding: 8px 24px;
  cursor: pointer;
  border-radius: 999px;
  font-weight: 500;
  color: #64748b;
  transition: all 0.2s;
}

.tab-item:hover {
  color: #334155;
}

.tab-item.active {
  background: #fff;
  color: #0f172a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>
