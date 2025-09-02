export { default as Text } from "@tiptap/extension-text";

export { default as Heading } from "./nodes/heading/heading";
export { default as Bold } from "./marks/bold";
export { default as Italic } from "./marks/italic";
export { default as Strike } from "./marks/strike";
export { default as Underline } from "./marks/underline";
export { default as List } from "./nodes/list/list";
export { default as Blockquote } from "./nodes/blockquote";
export { default as HorizontalRule } from "./nodes/horizontalRule";
export { default as CodeBlock } from "./nodes/codeBlock/codeBlock";
export { default as Image } from "./nodes/image/image";
export { default as Table } from "./nodes/table/table";

// default dependencies
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import HardBreak from '@tiptap/extension-hard-break'
import { Dropcursor, Gapcursor, TrailingNode, UndoRedo } from '@tiptap/extensions'


const NecessaryExtensions = [Document, Paragraph, Text, HardBreak, Dropcursor, Gapcursor, TrailingNode, UndoRedo];

export { NecessaryExtensions };
