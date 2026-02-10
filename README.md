# **西木编辑器 (XmEditor)**

> 一个基于 **Vue 3 + Tiptap** 的高度可扩展富文本编辑器，旨在为开发者提供类似 **Notion / 飞书** 的现代化编辑体验。
> 

---

## **1. 项目介绍**

**XmEditor** 是一个专为 Vue 3 生态设计的富文本编辑器解决方案。它不是简单的 Tiptap 包装器，而是一套完整的 **编辑器构建套件**。

它主要解决以下痛点：

- **从零构建难**：Tiptap 虽然强大，但仅提供原子能力，构建一个功能完备的编辑器（菜单、快捷键、交互）成本较高。
- **UI 适配繁琐**：内置精心设计的 Slash 菜单（命令菜单）、气泡菜单（Bubble Menu）和侧边栏菜单。
- **扩展性与易用性的平衡**：既提供开箱即用的 Preset（预设），又保留对底层 Tiptap 扩展的完全控制能力。

---

## **2. 特性亮点 (Features)**

- 🧩 **模块化扩展体系**：基于 Extension 的设计，功能按需加载
- ⚡ **Slash 命令菜单**：输入 `/` 唤起命令菜单，快速插入内容
- 🎈 **智能气泡菜单**：选中文字时自动浮现格式化工具栏
- 📦 **多场景预设 (Presets)**：
    - `NotionLike`（笔记）
    - `Basic`（基础编辑）
    - `Comment`（评论场景）
- 🎨 **高度可定制 UI**：样式与逻辑分离，支持主题与 CSS 注入
- ⌨️ **丰富快捷键**：支持 Markdown 风格快捷输入
- 🖼️ **增强媒体支持**：图片上传钩子、代码块高亮等开箱即用

---

## **3. 技术栈**

- **编辑器内核**：[Tiptap](https://tiptap.dev/)（基于 ProseMirror）
- **前端框架**：[Vue 3](https://vuejs.org/)（Composition API）
- **构建工具**：[Vite](https://vitejs.dev/)

**设计理念**：

- **Extension-First**：一切功能皆扩展
- **Headless UI**：核心逻辑不绑定具体 UI 框架，但提供高质量默认实现

---

## **4. 安装方式**

推荐使用包管理器安装：

```bash
# npm
npm install @putanut/xm-editor

# pnpm
pnpm add @putanut/xm-editor

# yarn
yarn add @putanut/xm-editor
```

---

## **5. 快速开始**

下面是一个最小可运行示例，创建一个 **Notion 风格** 的编辑器：

```jsx
<template>
    <div class="xm-editor-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { XmEditor, Presets } from '@putanut/xm-editor'

// 必须引入基础样式
import '@putanut/xm-editor/xm-editor-notion.css'

let editor = null

onMounted(() => {
    editor = new XmEditor({
        el: document.querySelector('.xm-editor-container'),
        config: Presets.NotionLike
    });
})

onBeforeUnmount(() => {
    editor?.destroy()
    editor = null
})
</script>

<style lang="scss" scoped></style>
```

---

## **6. 编辑器扩展机制**

XmEditor 采用 **Extension 驱动架构**，所有功能均通过扩展实现。

### **扩展包含的能力**

- **Schema**：节点 / 标记的数据结构
- **Commands**：对外暴露的编辑命令
- **Keyboard Shortcuts**：快捷键绑定
- **Menu Config**：Slash 菜单或气泡菜单配置

### **启用并自定义扩展**

```jsx
import { Extensions } from '@putanut/xm-editor'

const myExtensions = [
  Extensions.Bold,
  Extensions.Image.configure({
    uploadHandler: (file) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            url: URL.createObjectURL(file)
          })
        }, 1000)
      })
    }
  })
]
```

### 可选扩展列表

- Base ： 基础编辑器能力（包含文档模型、段落、文本、历史记录、光标控制等）
- Heading ： 标题（H1-H6）
- Bold ： 字体加粗
- Italic ： 斜体
- Strike ： 删除线
- Underline ： 下划线
- HorizontalRule ： 水平分割线
- Blockquote ： 引用块
- Link ： 超链接
- TextAlign ： 文本对齐（左、中、右、两端对齐）
- Highlight ： 文本背景高亮
- List ： 列表集合（无序列表、有序列表、任务列表）
- Emoji ： 表情符号插入
- Code ： 行内代码
- CodeBlock ： 代码块（支持多语言高亮）
- Image ： 图片插入与展示
- Table ： 表格
- Placeholder ： 空白内容占位提示
- Segmentation ： 内容分段
- FixedMenu ： 顶部固定菜单栏
- BubbleMenu ： 气泡菜单（选中文字时浮现的工具栏）
- SlashMenu ： 斜杠命令菜单（输入 / 唤起）
- ShortcutKey ： 快捷键增强（如 Tab 键缩进处理）

---

## **7. UI / 样式定制**

Xm Editor 坚持 **样式与逻辑解耦** 的原则。

### **样式层级**

1. **基础样式**：`xm-editor.css` 或 `xm-editor-notion.css`（必须引入其一）
2. **主题样式**：通过 `customClass` 注入自定义 CSS

### **自定义主题**

```jsx
Presets.NotionLike.configure({
	editorOption: {
		// 设置highlight.js高亮样式
    codeTheme: 'xcode',
  },
  style: {
    // 设置类名，实现自定义样式
    customClass: 'my-custom-editor-theme',
  },
})

.my-custom-editor-theme {
  border: 0;
}
```

---

## **8. 使用场景**

- 📝 个人 / 团队笔记系统
- 📄 文档与知识库系统
- ✍️ 博客写作编辑器
- 💬 富文本评论系统
- 🏢 企业内部业务系统

---

## **9. 项目状态与规划**

- 当前版本：**v0.0.11**
- 阶段：**早期 · 活跃开发中**

**规划方向**：

- [ ]  实现撤销/重做 (Undo/Redo)
- [ ]  开发目录大纲 (Table of Contents)
- [ ]  开发块拖拽手柄 (Drag Handle)
- [ ]  开发查找与替换 (Search & Replace)
- [ ]  优化链接预览 (Link Card)
- [ ]  增强表格功能（Table）
- [ ]  国际化 (i18n) 支持
- [ ]  示例与文档完善

---

## **10. License**

> 待补充
>