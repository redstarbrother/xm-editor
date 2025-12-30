export { default as Heading } from "./nodes/heading/heading";
export { default as List } from "./nodes/list/list";
export { default as Blockquote } from "./nodes/blockquote/blockquote";
export { default as HorizontalRule } from "./nodes/horizontalRule/horizontalRule";
export { default as CodeBlock } from "./nodes/codeBlock/codeBlock";
export { default as Image } from "./nodes/image/image";
export { default as Table } from "./nodes/table/table";
export { default as Segmentation } from "./functionality/segmentation/segmentation";
export { default as Emoji } from "./nodes/emoji/emoji";
export { default as Bold } from "./marks/bold/bold";
export { default as Italic } from "./marks/italic/italic";
export { default as Strike } from "./marks/strike/strike";
export { default as Underline } from "./marks/underline/underline";
export { default as Highlight } from "./marks/highlight/highlight";
export { default as TextAlign } from "./marks/textAlign/textAlign";

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
