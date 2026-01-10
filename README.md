# 西木编辑器 (Xm Editor)

> 一个基于 Vue 3 + Tiptap 的高度可扩展富文本编辑器，旨在为开发者提供类似 Notion / 飞书的现代化编辑体验。

## 1. 项目介绍

**Xm Editor** 是一个专为 Vue 3 生态设计的富文本编辑器解决方案。它不是简单的 Tiptap 包装器，而是一套完整的**编辑器构建套件**。

它解决了以下痛点：
- **从零构建难**：Tiptap 虽然强大但仅提供原子能力，构建一个功能完备的编辑器（含菜单、快捷键、交互）需要大量开发工作。
- **UI 适配繁琐**：内置了精心设计的 Slash 菜单（命令菜单）、气泡菜单（Bubble Menu）和侧边栏菜单。
- **扩展性与易用性的平衡**：既提供了开箱即用的 Preset（预设），又保留了对底层 Tiptap 扩展的完全控制能力。

**核心差异：**
与传统的富文本编辑器相比，Xm Editor 更强调**“块”**（Block）的概念，提供现代化的交互体验（如 `/` 指令），并且完全解耦了 UI 与逻辑，适合构建复杂的文档系统或笔记应用。

## 2. 特性亮点 (Features)

- 🧱 **块级编辑体验**：支持类似 Notion 的块级操作，结构化内容管理。
- 🧩 **模块化扩展体系**：基于 Extension 的设计，功能按需加载（加粗、斜体、代码块、表格等均为独立扩展）。
- ⚡ **Slash 命令菜单**：内置 `/` 唤起命令菜单，快速插入内容。
- 🎈 **智能气泡菜单**：选中文字时自动浮现格式化工具栏。
- 📦 **多场景预设 (Presets)**：内置 `NotionLike`（笔记）、`Basic`（基础）、`Comment`（评论）等多种配置预设。
- 🎨 **高度可定制 UI**：样式与逻辑分离，支持自定义主题和 CSS 注入。
- ⌨️ **丰富的快捷键**：支持 Markdown 语法快捷输入及常用编辑快捷键。
- 🖼️ **增强的媒体支持**：图片上传钩子、代码块高亮等开箱即用。

## 3. 技术栈

本项目基于现代前端技术栈构建，确保高性能与良好的开发体验：

- **核心驱动**：[Tiptap](https://tiptap.dev/) (基于 Prosemirror)
- **UI 框架**：[Vue 3](https://vuejs.org/) (Composition API)
- **构建工具**：[Vite](https://vitejs.dev/)
- **设计理念**：
  - **Extension-First**：一切功能皆扩展。
  - **Headless UI**：核心逻辑不绑定特定 UI 库，但提供默认的高质量 UI 实现。

## 4. 安装方式

推荐使用包管理器进行安装：

```bash
# npm
npm install @putanut/xm-editor

# pnpm
pnpm add @putanut/xm-editor

# yarn
yarn add @putanut/xm-editor
```

## 5. 快速开始

以下是一个最小的可运行示例，展示如何创建一个类 Notion 风格的编辑器。

```vue
<template>
  <!-- 编辑器挂载容器 -->
  <div class="xm-editor-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { XmEditor, Extensions, Presets } from '@putanut/xm-editor'

// 引入基础样式（必须）
import '@putanut/xm-editor/xm-editor.css'

let editor = null

onMounted(() => {
  // 初始化编辑器
  editor = new XmEditor({
    // 指定挂载点
    el: document.querySelector('.xm-editor-container'),
    
    // 使用 Notion 风格预设
    config: Presets.NotionLike.configure({
      // 可以在这里覆盖默认扩展配置
      extensions: [
        // 例如：自定义图片上传逻辑
        Extensions.Image.configure({
          uploadHandler: async (file) => {
            // 模拟上传，返回图片 URL
            return URL.createObjectURL(file)
          }
        })
      ],
      // 编辑器核心选项
      editorOption: {
        placeholder: "输入 '/' 唤起命令菜单...",
        autofocus: true,
      }
    })
  })
})

onBeforeUnmount(() => {
  // 销毁编辑器实例
  if (editor) {
    editor.destroy()
    editor = null
  }
})
</script>

<style>
/* 容器样式 */
.xm-editor-container {
  min-height: 500px;
  padding: 20px;
}
</style>
```

## 6. 编辑器扩展机制说明

Xm Editor 采用 **Extension（扩展）** 驱动的架构。所有的功能，包括段落、标题、加粗、图片等，都是通过扩展实现的。

### 扩展的设计思路
每个扩展（Extension）通常包含：
- **Schema 定义**：定义节点或标记的数据结构。
- **命令（Commands）**：对外暴露的操作接口。
- **快捷键（Keyboard Shortcuts）**：绑定的按键操作。
- **菜单配置**：定义该扩展在 Slash 菜单或气泡菜单中的展现形式。

### 启用与配置
你可以通过 `Presets` 快速启用一组扩展，也可以手动组合：

```javascript
import { Extensions } from '@putanut/xm-editor'

const myExtensions = [
  Extensions.Bold, // 使用默认配置
  Extensions.CodeBlock.configure({ // 自定义配置
    languageClassPrefix: 'language-',
  }),
]
```

### 扩展职责
- **Base Extension**：提供文档基础结构（Doc, Paragraph, Text）。
- **Mark Extensions**：行内样式（Bold, Italic, Link）。
- **Node Extensions**：块级节点（Heading, CodeBlock, Image）。
- **Functional Extensions**：功能增强（History, Placeholder, Dropcursor）。

## 7. UI / 样式定制说明

项目坚持 **"样式与逻辑解耦"** 的原则。

### 样式层级
1.  **基础样式** (`xm-editor.css`)：包含编辑器运行必须的布局和基础排版。
2.  **主题样式**：可以通过 CSS 变量或覆盖类名来定制。
3.  **代码高亮**：支持多种代码高亮主题（位于 `public/code-themes`）。

### 定制方式
在配置中通过 `style.customClass` 注入自定义类名，从而实现样式隔离：

```javascript
Presets.NotionLike.configure({
  style: {
    customClass: 'my-custom-editor-theme', // 将添加到编辑器根节点
  }
})
```

```css
/* 自定义业务样式 */
.my-custom-editor-theme .ProseMirror {
  font-family: 'Inter', sans-serif;
  color: #333;
}
```

## 8. 适合的使用场景

- 📝 **个人/团队笔记应用**：打造类似 Notion、Obsidian 的知识库体验。
- 📄 **文档管理系统**：用于编写技术文档、需求文档，支持复杂的格式和代码块。
- ✍️ **博客编辑器**：提供沉浸式的写作体验。
- 💬 **评论系统**：使用 `Presets.Comment` 快速构建支持表情、提及的富文本评论框。
- 🏢 **企业内部系统**：作为表单的一部分，提供比原生 `textarea` 更强大的输入能力。

## 9. 项目状态与规划

当前版本：`v0.0.7`

项目目前处于 **早期活跃开发阶段**。核心架构已稳定，基础功能完备。

**欢迎参与共建的方向：**
- 更多实用的 Extensions（如：协同编辑、拖拽排序优化）。
- 单元测试与 E2E 测试的完善。
- 更多样板代码（Examples）和文档补充。
- 国际化支持（i18n）。

## 10. License

*(待补充)*
