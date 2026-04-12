<div align="center">

# 🖊️ Xm Editor

**一个插件化、可组装的现代富文本编辑器**

基于 [Vue 3](https://vuejs.org/) + [Tiptap](https://tiptap.dev/) 构建，为开发者提供类 Notion / 飞书的块级编辑体验。

[![npm version](https://img.shields.io/npm/v/@putanut/xm-editor?color=f43f5e&label=version)](https://www.npmjs.com/package/@putanut/xm-editor)
[![npm downloads](https://img.shields.io/npm/dm/@putanut/xm-editor?color=f97316)](https://www.npmjs.com/package/@putanut/xm-editor)
[![license](https://img.shields.io/github/license/redstarbrother/xm-editor?color=3b82f6)](./LICENSE)
[![vue](https://img.shields.io/badge/vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)

[English](./README-en.md) · **简体中文**

</div>

---

## ✨ 为什么选择 Xm Editor？

Tiptap 提供了强大的原子能力，但从零构建一个功能完备的编辑器仍然需要大量工作——菜单系统、快捷键绑定、交互逻辑、样式适配……

**Xm Editor 解决了这个问题。** 它不是简单的 Tiptap 封装，而是一套完整的 **编辑器构建套件**：

| 痛点 | Xm Editor 的方案 |
|------|------------------|
| 从零搭建工作量大 | 提供 3 套开箱即用的 **Preset 预设** |
| 菜单/工具栏开发繁琐 | 内置 Slash 菜单、气泡菜单、固定工具栏 |
| 扩展之间耦合严重 | **Extension-First** 架构，功能按需组装 |
| 难以适配不同场景 | 从笔记到评论框，一套 API 满足多种形态 |
| 样式定制困难 | 逻辑与 UI 完全解耦，CSS 变量 + 类名注入 |

## 🧩 核心特性

- 🏗️ **块级编辑** — 类似 Notion 的块级内容管理，结构化文档操作
- ⚡ **Slash 命令** — 输入 `/` 唤起命令菜单，快速插入标题、列表、代码块等
- 🎈 **智能气泡菜单** — 选中文字自动浮现格式化工具栏
- 📦 **多场景预设** — `NotionLike` · `Basic` · `Comment`，开箱即用
- 🧱 **20+ 内置扩展** — 加粗、斜体、链接、表格、代码块、图片、表情等
- 🎨 **主题系统** — 3 套编辑器主题 + 19 种代码高亮配色
- ⌨️ **Markdown 快捷键** — 支持 `# ` `> ` `- ` 等 Markdown 语法快捷输入
- 🖼️ **图片上传钩子** — 自定义图片上传逻辑，对接任意存储服务
- 🔌 **完全可扩展** — 保留对底层 Tiptap 扩展的完全控制能力

## 📦 安装

```bash
# npm
npm install @putanut/xm-editor

# pnpm (推荐)
pnpm add @putanut/xm-editor

# yarn
yarn add @putanut/xm-editor
```

### 前置依赖

Xm Editor 需要 Vue 3 作为宿主框架：

```bash
# 如果项目中尚未安装 Vue 3
pnpm add vue
```

## 🚀 快速开始

### 最小示例

三步创建一个类 Notion 风格的编辑器：

```vue
<template>
  <div class="editor-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { XmEditor, Presets } from '@putanut/xm-editor'

// 1. 引入样式
import '@putanut/xm-editor/xm-editor.css'

let editor = null

onMounted(() => {
  // 2. 创建编辑器
  editor = new XmEditor({
    el: document.querySelector('.editor-container'),
    config: Presets.NotionLike.configure({
      editorOption: {
        placeholder: "输入 '/' 唤起命令菜单...",
        autofocus: true,
      },
    }),
  })
})

onBeforeUnmount(() => {
  // 3. 销毁编辑器
  editor?.destroy()
})
</script>
```

### 获取 / 设置内容

```js
// 获取内容
const html = editor.getHTML()
const json = editor.getJSON()
const text = editor.getText()

// 设置内容
editor.setContent('<p>Hello World</p>')
editor.setContent({ type: 'doc', content: [...] })

// 清空
editor.clear()
```

## 🎛️ 预设方案

Xm Editor 内置 3 种预设，覆盖不同使用场景：

### NotionLike — 全功能文档编辑

适用于笔记、知识库、文档管理系统。包含所有扩展 + 气泡菜单 + Slash 命令。

```js
import { Presets } from '@putanut/xm-editor'
import '@putanut/xm-editor/xm-editor-notion.css'

Presets.NotionLike.configure({ /* ... */ })
```

### Basic — 通用富文本编辑

适用于需要固定工具栏的博客编辑器、CMS 后台。在 NotionLike 基础上增加固定工具栏。

```js
Presets.Basic.configure({ /* ... */ })
```

### Comment — 轻量评论框

适用于评论系统、聊天输入框。仅保留基础格式 + 表情 + 图片。

```js
Presets.Comment.configure({
  editorOption: {
    placeholder: '说点什么...',
  },
})
```

## 🧱 扩展系统

Xm Editor 采用 **Extension-First** 架构——所有功能都是独立扩展，可以自由组合。

### 内置扩展一览

| 分类 | 扩展 | 说明 |
|------|------|------|
| **基础** | `Base` | 文档骨架（Doc, Paragraph, Text, History...） |
| **行内格式** | `Bold` `Italic` `Strike` `Underline` `Code` `Highlight` `Link` | 文字样式 |
| **块级节点** | `Heading` `Blockquote` `HorizontalRule` `CodeBlock` `Image` `Table` `List` | 内容块 |
| **交互增强** | `Emoji` `TextAlign` `ShortcutKeys` `Placeholder` | 编辑体验 |
| **菜单系统** | `SlashMenu` `BubbleMenu` `FixedMenu` | UI 菜单 |

### 自定义扩展组合

不使用预设，手动组合扩展：

```js
import { XmEditor, Extensions } from '@putanut/xm-editor'

new XmEditor({
  el: document.querySelector('.editor'),
  config: {
    extensions: [
      Extensions.Base,
      Extensions.Bold,
      Extensions.Italic,
      Extensions.Heading,
      Extensions.List,
      Extensions.CodeBlock,
      Extensions.Placeholder,
      Extensions.BubbleMenu,
      Extensions.SlashMenu,
    ],
    editorOption: {
      placeholder: '开始写作...',
    },
  },
})
```

### 配置单个扩展

每个扩展都支持通过 `.configure()` 进行定制：

```js
import { Extensions } from '@putanut/xm-editor'

const customExtensions = [
  // 自定义图片上传
  Extensions.Image.configure({
    uploadHandler: async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const { url } = await res.json()
      return { url }
    },
  }),

  // 自定义代码块
  Extensions.CodeBlock.configure({
    languageClassPrefix: 'language-',
  }),
]
```

## 🎨 样式与主题

项目坚持 **"样式与逻辑解耦"** 的原则。

### 内置主题

| 主题文件 | 风格 |
|----------|------|
| `xm-editor.css` | 基础默认主题 |
| `xm-editor-notion.css` | Notion 风格 |
| `xm-editor-feishu.css` | 飞书风格 |

```js
// 选择一种导入
import '@putanut/xm-editor/xm-editor.css'
// 或
import '@putanut/xm-editor/xm-editor-notion.css'
```

### 自定义主题

通过 `customClass` 注入类名，从外部覆盖样式：

```js
Presets.NotionLike.configure({
  style: {
    customClass: 'my-editor-theme',
  },
})
```

```css
/* 你的自定义样式 */
.my-editor-theme .ProseMirror {
  font-family: 'Inter', sans-serif;
  max-width: 720px;
  margin: 0 auto;
  padding: 32px;
}

.my-editor-theme .ProseMirror h1 {
  font-size: 2em;
  font-weight: 700;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 0.3em;
}
```

### 代码高亮主题

内置 19 种代码高亮配色方案（基于 Highlight.js），包括：

`atom-one-dark` · `github` · `github-dark` · `monokai` · `nord` · `night-owl` · `vs` · `xcode` 等

## ⚙️ 完整配置参考

```js
new XmEditor({
  el: document.querySelector('.editor'),
  config: Presets.NotionLike.configure({
    // 编辑器选项
    editorOption: {
      editable: true,         // 是否可编辑
      content: '',             // 初始内容（HTML 字符串或 JSON）
      contentType: 'json',     // 内容类型：'json' | 'html'
      placeholder: '开始写作...', // 占位文字
      autofocus: true,         // 自动聚焦
      debounce: 300,           // 事件触发防抖间隔
    },

    // 扩展覆盖
    extensions: [
      Extensions.Image.configure({ uploadHandler: myUploader }),
    ],

    // 样式配置
    style: {
      customClass: 'my-theme', // 注入自定义 CSS 类名
    },

    // 生命周期事件
    events: {
      onInit: ({ editor }) => console.log('编辑器就绪'),
      onUpdate: ({ editor }) => console.log('内容更新', editor.getJSON()),
      onFocus: ({ editor }) => console.log('获得焦点'),
      onBlur: ({ editor }) => console.log('失去焦点'),
      onDestroy: () => console.log('编辑器已销毁'),
    },
  }),
})
```

## 📐 API 参考

### XmEditor 实例方法

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `getHTML()` | `string` | 获取 HTML 格式内容 |
| `getJSON()` | `object` | 获取 JSON 格式内容 |
| `getText()` | `string` | 获取纯文本内容 |
| `setContent(content)` | — | 设置编辑器内容 |
| `clear()` | — | 清空编辑器 |
| `focus()` | — | 聚焦编辑器 |
| `blur()` | — | 取消聚焦 |
| `destroy()` | — | 销毁编辑器实例 |
| `getCursor()` | `Selection` | 获取当前光标位置 |
| `instance` | `TiptapEditor` | 获取底层 Tiptap 编辑器实例 |

## 🛠️ 本地开发

```bash
# 克隆项目
git clone https://github.com/redstarbrother/xm-editor.git
cd xm-editor

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建库
pnpm build
```

开发服务器启动后，可以通过内置 Demo 页面预览 4 种编辑器形态：

- **常规编辑器** — Basic 预设 + 固定工具栏
- **类 Notion 风格** — NotionLike 预设 + Slash 命令
- **评论框模式** — Comment 预设精简版
- **自定义配置** — 实时修改配置、按需组合扩展

## 📁 项目结构

```
xm-editor/
├── src/
│   ├── index.js              # 库入口
│   ├── core/                 # 编辑器核心（XmEditor, ExtensionManager）
│   ├── extensions/           # 20+ 内置扩展
│   ├── presets/              # 预设方案（NotionLike, Basic, Comment）
│   ├── hooks/                # Vue Composition Hooks
│   ├── ui/                   # UI 组件
│   ├── utils/                # 工具函数
│   └── styles/               # 主题样式
├── examples/                 # 开发 Demo
├── dist/                     # 构建产物
└── public/                   # 静态资源（代码高亮主题）
```

## 🗺️ 路线图

- [ ] 📝 协同编辑支持（基于 Yjs）
- [ ] 🖱️ 拖拽排序优化
- [ ] 🌐 国际化支持（i18n）
- [ ] 📋 更多内容块类型（嵌入、数据库视图等）
- [ ] 🧪 单元测试 & E2E 测试
- [ ] 📚 完善文档站点
- [ ] 🎨 更多主题

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 发起 Pull Request

## 📄 License

[MIT](./LICENSE)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star 支持！**

[GitHub](https://github.com/redstarbrother/xm-editor) · [Gitee](https://gitee.com/jia_hongxing/xm-editor) · [NPM](https://www.npmjs.com/package/@putanut/xm-editor)

</div>
