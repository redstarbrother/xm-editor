export { default as Heading } from "../../extensions/Heading/index";
export { default as List } from "../../extensions/List/index";
export { default as Blockquote } from "../../extensions/Blockquote/index";
export { default as HorizontalRule } from "../../extensions/HorizontalRule/index";
export { default as CodeBlock } from "../../extensions/CodeBlock/index";
export { default as Image } from "../../extensions/Image/index";
export { default as Table } from "../../extensions/Table/index";
export { default as Segmentation } from "../../extensions/Segmentation/index";
// export { default as Emoji } from "./nodes/emoji/emoji"; // 尚未迁移
export { default as Bold } from "../../extensions/Bold/index";
export { default as Italic } from "../../extensions/Italic/index";
export { default as Strike } from "../../extensions/Strike/index";
export { default as Underline } from "../../extensions/Underline/index";
export { default as Highlight } from "../../extensions/Highlight/index";
export { default as TextAlign } from "../../extensions/TextAlign/index";

export { default as FixedMenu } from "../../extensions/FixedMenu/index";
export { default as BubbleMenu } from "../../extensions/BubbleMenu/index";

// default dependencies
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import HardBreak from '@tiptap/extension-hard-break'
import { Placeholder, Dropcursor, Gapcursor, TrailingNode, UndoRedo } from '@tiptap/extensions'

// 全局快捷键（优先级要求，需要放在最前面引入）
import GlobalTab from './functionality/shortcutKeys/globalTab'


const NecessaryExtensions = [GlobalTab, Document, Paragraph, Text, HardBreak, Dropcursor, Gapcursor, TrailingNode, UndoRedo, Placeholder];

export { NecessaryExtensions };
