<div align="center">

<img src="https://github.com/redstarbrother/xm-editor/blob/develop/public/logo.png?raw=true" alt="XmEditor Logo" width="120" />

# XmEditor

**A pluggable and composable modern rich text editor**

Built on [Vue 3](https://vuejs.org/) + [Tiptap](https://tiptap.dev/), providing developers with a Notion / Feishu-like block-level editing experience.

[![npm version](https://img.shields.io/npm/v/@putanut/xm-editor?color=f43f5e&label=version)](https://www.npmjs.com/package/@putanut/xm-editor)
[![npm downloads](https://img.shields.io/npm/dm/@putanut/xm-editor?color=f97316)](https://www.npmjs.com/package/@putanut/xm-editor)
[![license](https://img.shields.io/github/license/redstarbrother/xm-editor?color=3b82f6)](./LICENSE)
[![vue](https://img.shields.io/badge/vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)

[📺 Online Demo](https://redstarbrother.github.io/xm-editor/) 

**English** · [简体中文](./README.md)

</div>

---

## ✨ Why XmEditor?

Tiptap provides powerful atomic capabilities, but building a fully-featured editor from scratch still requires a lot of work—menu systems, shortcut bindings, interaction logic, style adaptation...

**XmEditor solves this problem.** It's not just a simple Tiptap wrapper, but a complete **editor building suite**:

| Pain Point | XmEditor's Solution |
| ------------------- | --------------------------------------- |
| Huge workload from scratch | Provides 3 out-of-the-box **Presets** |
| Cumbersome menu/toolbar dev | Built-in Slash menu, Bubble menu, Fixed toolbar |
| Tight coupling between extensions | **Extension-First** architecture, functional on-demand assembly |
| Hard to adapt to different scenarios | From notes to comment boxes, one API for multiple forms |
| Difficult style customization | Logic and UI completely decoupled, CSS variables + class injection |

## 🧩 Core Features

- 🏗️ **Block-level Editing** — Notion-like block content management, structured document operations
- ⚡ **Slash Commands** — Type `/` to invoke the command menu, quickly insert headings, lists, code blocks, etc.
- 🎈 **Smart Bubble Menu** — Automatically pops up formatting toolbar when text is selected
- 📑 **Table of Contents** — Automatically generates document outline based on headings, supports scroll highlighting and click-to-jump
- 🖱️ **Drag Handle** — Provides Notion-like block menu and drag-and-drop sorting capabilities
- 📦 **Multi-scenario Presets** — `NotionLike` · `Basic` · `Comment`, out-of-the-box
- 🧱 **22+ Built-in Extensions** — Bold, Italic, Link, Table, Code Block, Image, Emoji, etc.
- 🎨 **Theme System** — 3 editor themes + 19 code highlight color schemes
- ⌨️ **Markdown Shortcuts** — Supports Markdown syntax shortcuts like `# ` `> ` `- `
- 🖼️ **Image Upload Hook** — Custom image upload logic, connects to any storage service
- 🔌 **Fully Extensible** — Retains full control over underlying Tiptap extensions

## 📦 Installation

```bash
# npm
npm install @putanut/xm-editor

# pnpm (recommended)
pnpm add @putanut/xm-editor

# yarn
yarn add @putanut/xm-editor
```

### Peer Dependencies

XmEditor requires Vue 3 as the host framework:

```bash
# If Vue 3 is not yet installed in the project
pnpm add vue
```

## 🚀 Quick Start

### Minimal Example

Create a Notion-style editor in three steps:

```javascript
<template>
  <div class="editor-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { XmEditor, Presets } from '@putanut/xm-editor'

// 1. Import styles
import '@putanut/xm-editor/xm-editor.css'

let editor = null

onMounted(() => {
  // 2. Create editor
  editor = new XmEditor({
    el: document.querySelector('.editor-container'),
    config: Presets.NotionLike.configure({
      editorOption: {
        placeholder: "Type '/' for commands...",
        autofocus: true,
      },
    }),
  })
})

onBeforeUnmount(() => {
  // 3. Destroy editor
  editor?.destroy()
})
</script>
```

### Get / Set Content

```js
// Get content
const html = editor.getHTML()
const json = editor.getJSON()
const text = editor.getText()

// Set content
editor.setContent('<p>Hello World</p>')
editor.setContent({ type: 'doc', content: [...] })

// Clear
editor.clear()
```

## 🎛️ Presets

XmEditor comes with 3 built-in presets covering different use cases:

### NotionLike — Full-featured Document Editing

Suitable for notes, knowledge bases, document management systems. Includes all extensions + Bubble Menu + Slash Commands.

```js
import { Presets } from "@putanut/xm-editor";
import "@putanut/xm-editor/xm-editor-notion.css";

Presets.NotionLike.configure({
  /* ... */
});
```

### Basic — Universal Rich Text Editing

Suitable for blog editors and CMS backends that need a fixed toolbar. Adds a fixed toolbar on top of NotionLike.

```js
Presets.Basic.configure({
  /* ... */
});
```

### Comment — Lightweight Comment Box

Suitable for comment systems and chat input boxes. Only retains basic formatting + emojis + images.

```js
Presets.Comment.configure({
  editorOption: {
    placeholder: "Say something...",
  },
});
```

---

## 🧱 Extension System

XmEditor adopts an **Extension-First** architecture—all features are independent extensions that can be freely combined.

### Built-in Extensions Overview

| Category     | Extensions                                                                 | Description                                  |
| ------------ | -------------------------------------------------------------------------- | -------------------------------------------- |
| **Base**     | `Base`                                                                     | Document skeleton (Doc, Paragraph, Text...)  |
| **Inline**   | `Bold` `Italic` `Strike` `Underline` `Code` `Highlight` `Link`             | Text styles                                  |
| **Blocks**   | `Heading` `Blockquote` `HorizontalRule` `CodeBlock` `Image` `Table` `List` | Content blocks                               |
| **Enhance**  | `Emoji` `TextAlign` `ShortcutKeys` `Placeholder` `DragHandle`              | Editing experience                           |
| **Menu**     | `SlashMenu` `BubbleMenu` `FixedMenu` `Toc`                                 | UI Menus and Document Navigation             |

### Custom Extension Combination

Assemble extensions manually without using presets:

```javascript
import { XmEditor, Extensions } from "@putanut/xm-editor";

new XmEditor({
  el: document.querySelector(".editor"),
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
      placeholder: "Start writing...",
    },
  },
});
```

### Configure Individual Extensions

Every extension can be customized via `.configure()`:

```javascript
import { Extensions } from "@putanut/xm-editor";

const customExtensions = [
  // Custom image upload
  Extensions.Image.configure({
    uploadHandler: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const { url } = await res.json();
      return { url };
    },
  }),

  // Custom code block
  Extensions.CodeBlock.configure({
    languageClassPrefix: "language-",
  }),
];
```

## 🎨 Styles and Themes

The project adheres to the principle of **"decoupling styles and logic"**.

### Built-in Themes

| Theme File               | Style         |
| ------------------------ | ------------- |
| `xm-editor.css`          | Basic Default |
| `xm-editor-notion.css`   | Notion Style  |
| `xm-editor-feishu.css`   | Feishu Style  |

```javascript
// Import one of them
import "@putanut/xm-editor/xm-editor.css";
// Or
import "@putanut/xm-editor/xm-editor-notion.css";
```

### Custom Themes

Inject class names via `customClass` to override styles from the outside:

```javascript
Presets.NotionLike.configure({
  style: {
    customClass: "my-editor-theme",
  },
});
```

```css
/* Your custom styles */
.my-editor-theme .ProseMirror {
  font-family: "Inter", sans-serif;
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

---

### Code Highlight Themes

Built-in 19 code highlight color schemes (based on Highlight.js), including:

`atom-one-dark` · `github` · `github-dark` · `monokai` · `nord` · `night-owl` · `vs` · `xcode`, etc.

## ⚙️ Full Configuration Reference

```javascript
new XmEditor({
  el: document.querySelector(".editor"),
  config: Presets.NotionLike.configure({
    // Editor options
    editorOption: {
      editable: true, // Whether it's editable
      content: "", // Initial content (HTML string or JSON)
      contentType: "json", // Content type: 'json' | 'html'
      placeholder: "Start writing...", // Placeholder text
      autofocus: true, // Autofocus
      debounce: 300, // Debounce interval for event triggers
    },

    // Extension overrides
    extensions: [Extensions.Image.configure({ uploadHandler: myUploader })],

    // Style configuration
    style: {
      customClass: "my-theme", // Inject custom CSS class name
    },

    // Lifecycle events
    events: {
      onInit: ({ editor }) => console.log("Editor ready"),
      onUpdate: ({ editor }) => console.log("Content updated", editor.getJSON()),
      onFocus: ({ editor }) => console.log("Focused"),
      onBlur: ({ editor }) => console.log("Blurred"),
      onDestroy: () => console.log("Editor destroyed"),
    },
  }),
});
```

## 📐 API Reference

### XmEditor Instance Methods

| Method                | Return Type    | Description                           |
| --------------------- | -------------- | ------------------------------------- |
| `getHTML()`           | `string`       | Get content in HTML format            |
| `getJSON()`           | `object`       | Get content in JSON format            |
| `getText()`           | `string`       | Get plain text content                |
| `setContent(content)` | —              | Set editor content                    |
| `clear()`             | —              | Clear editor                          |
| `focus()`             | —              | Focus editor                          |
| `blur()`              | —              | Blur editor                           |
| `destroy()`           | —              | Destroy editor instance               |
| `getCursor()`         | `Selection`    | Get current cursor position           |
| `instance`            | `TiptapEditor` | Get underlying Tiptap editor instance |

## 🛠️ Local Development

```bash
# Clone the project
git clone https://github.com/redstarbrother/xm-editor.git
cd xm-editor

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the library
pnpm build
```

After the development server is started, you can preview 4 editor forms through the built-in Demo page:

- **Regular Editor** — Basic preset + Fixed toolbar
- **Notion-like Style** — NotionLike preset + Slash commands
- **Comment Mode** — Streamlined Comment preset
- **Custom Configuration** — Modify config in real-time, mix and match extensions on demand

## 📁 Project Structure

```
xm-editor/
├── src/
│   ├── index.js              # Library entry
│   ├── core/                 # Editor core (XmEditor, ExtensionManager)
│   ├── extensions/           # 22+ Built-in extensions
│   ├── presets/              # Presets (NotionLike, Basic, Comment)
│   ├── hooks/                # Vue Composition Hooks
│   ├── ui/                   # UI components
│   ├── utils/                # Utility functions
│   └── styles/               # Theme styles
├── examples/                 # Development Demo
├── dist/                     # Build artifacts
└── public/                   # Static resources (Code highlight themes)
```

## 🗺️ Roadmap

- [ ] 📝 Collaborative editing support (based on Yjs)
- [x] 🖱️ Drag and drop sorting optimization
- [x] 📑 Document Outline Table of Contents
- [ ] 🌐 Internationalization support (i18n)
- [ ] 📋 More content block types (embeds, database views, etc.)
- [ ] 🧪 Unit tests & E2E tests
- [ ] 📚 Improve documentation site
- [ ] 🎨 More themes

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[MIT](./LICENSE)

---

<div align="center">

**If this project is helpful to you, please give it a ⭐ Star!**

[GitHub](https://github.com/redstarbrother/xm-editor) · [Gitee](https://gitee.com/jia_hongxing/xm-editor) · [NPM](https://www.npmjs.com/package/@putanut/xm-editor)

</div>
