// default dependencies
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import HardBreak from "@tiptap/extension-hard-break";
import {
  Dropcursor,
  Gapcursor,
  TrailingNode,
  UndoRedo,
} from "@tiptap/extensions";
// 全局快捷键（优先级要求，需要放在最前面引入）
import GlobalTab from "@/components/extensions/shortcutKeys/globalTab";
import SlashCommand from "@/components/extensions/commands/slash/slashCommand";
import { createSuggestion } from "@/components/menus/suggestion/suggestionFactory";

const NecessaryExtensions = [
  GlobalTab,
  Document,
  Paragraph,
  Text,
  HardBreak,
  Dropcursor,
  Gapcursor,
  TrailingNode,
  UndoRedo,
];

const resolveExtensions = (menuConfig, extensions) => {
  const suggestionExtensions = [];

  // 判断是否开启slash menu
  if (menuConfig.slashMenuEnabled) {
    const slashItems = collectSlashItems(extensions);
    extensions.push(SlashCommand.configure({ items: slashItems }));
  }

  // 生成suggestionExtensions
  extensions.forEach((ext) => {
    if (ext.__suggestions) {
      ext.__suggestions.forEach((config) => {
        console.log("suggestion config:", config);
        suggestionExtensions.push(createSuggestion(config));
      });
    }
  });

  console.log("extensions:", extensions);

  console.log("suggestionExtensions:", suggestionExtensions);
  // 添加必要扩展
  return [...NecessaryExtensions, ...extensions, ...suggestionExtensions];
};

const collectSlashItems = (extensions) => {
  return extensions
    .map((ext) => {
      const slash = ext.options?.slash?.();
      const items = Array.isArray(slash) ? slash : slash ? [slash] : [];
      return items;
    })
    .flat();
};

export default { resolveExtensions };
