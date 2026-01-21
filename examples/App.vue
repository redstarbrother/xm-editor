<template>
  <div class="app-container">
    <header class="app-header">
      <div class="logo-container">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </div>
        
        <h1 class="app-title">西木编辑器</h1>
        <div class="app-meta">
          <span>最后同步时间：2026年01月21日</span>
          <span class="divider">|</span>
          <div class="links">
            <a href="https://github.com/redstarbrother/xm-editor" target="_blank" class="link">GitHub</a>
            <span class="link-divider">/</span>
            <a href="https://gitee.com/jia_hongxing/xm-editor" target="_blank" class="link">Gitee</a>
          </div>
        </div>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px 40px;
  background: transparent;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-icon {
  width: 56px;
  height: 56px;
  background: #f43f5e;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(244, 63, 94, 0.3);
}

.logo-icon svg {
  width: 28px;
  height: 28px;
  stroke-width: 2.5;
}

.app-title {
  font-size: 32px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
}

.app-meta {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
}

.divider {
  color: #e2e8f0;
}

.links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.link {
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s;
}

.link:hover {
  color: #3b82f6;
}

.link-divider {
  color: #cbd5e1;
}

.main-content {
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 40px;
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
