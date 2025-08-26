export { default as Text } from "@tiptap/extension-text";

export { default as Document } from "./nodes/document";
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
import StarterKit from "@tiptap/starter-kit";
import SlashCommand from "./commands/slashCommand"

const DependencieExtensions = [StarterKit, SlashCommand];

export { DependencieExtensions };
