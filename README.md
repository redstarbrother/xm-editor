<div align="center">
  <h1>XM Editor</h1>
  <p>基于 Vue 3 与 Tiptap 的富文本编辑器，提供可组合扩展与多种预设风格。</p>
</div>

## 特性

- 基于 Tiptap 3 的编辑内核，支持丰富文本能力
- 可插拔扩展机制，内置常用块/行内扩展与菜单系统
- 预设配置开箱即用：Basic / NotionLike / Comment
- 内置多套样式主题（默认、Notion 风格、飞书风格）
- 支持代码高亮主题动态加载

## 安装

```bash
pnpm add @putanut/xm-editor
```

## 快速开始

引入样式文件并创建编辑器实例即可使用。推荐从预设开始，按需覆盖配置。

```js
import { XmEditor, Presets } from "@putanut/xm-editor";
import "@putanut/xm-editor/xm-editor.css";

new XmEditor({
  el: document.querySelector("#app"),
  config: Presets.Basic.configure(),
});
```

## 预设

预设为不同使用场景提供默认扩展组合与交互配置，适合快速接入。

可用预设：

- Presets.Basic
- Presets.NotionLike
- Presets.Comment

## 扩展

扩展是编辑器能力的核心组成，可自由组合以适配不同场景。内置扩展覆盖：

- 标题、加粗/斜体/下划线/删除线
- 列表、引用、水平分割线
- 行内代码与代码块、表格、图片
- 表情、文本对齐、快捷键
- 固定菜单、气泡菜单与 Slash 菜单

## 配置

配置由三部分组成：

- editorOption：内容与编辑行为（可编辑、占位符、自动聚焦、更新节流、代码主题等）
- extensions：扩展列表，决定功能与菜单项
- style：外观定制（自定义类名）
- events：生命周期与内容更新回调（初始化、销毁、聚焦、失焦、更新）

## API

XmEditor 默认返回简化代理对象，常用方法包括：

- getHTML / getJSON / getText 获取内容
- setContent / clear 修改内容
- focus / blur 控制焦点
- destroy 销毁实例

## 主题与样式

内置样式文件：

- @putanut/xm-editor/xm-editor.css
- @putanut/xm-editor/xm-editor-notion.css
- @putanut/xm-editor/xm-editor-feishu.css

代码块主题通过 CDN 动态加载，可通过 editorOption.codeTheme 指定主题名称，例如 github.min 或 github-dark.min。

## 开发

```bash
pnpm install
pnpm dev
```

构建与预览：

```bash
pnpm build
pnpm preview
```
