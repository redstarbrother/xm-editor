import { NecessaryExtensions } from "@/components/extensions";
import SlashCommand from "@/components/extensions/commands/slash/SlashCommand";
import { createSuggestion } from "@/components/menus/suggestion/suggestionFactory";

const getEditorExtensions = (props) => {
  const extensions = props.extensions;
  const suggestionExtensions = [];

  // 生成suggestionExtensions
  props.extensions.forEach((ext) => {
    if (ext.__suggestions) {
      ext.__suggestions.forEach((config) => {
        suggestionExtensions.push(createSuggestion(config));
      });
    }
  });

  // 判断是否开启slash menu
  if (props.slashMenuEnabled) {
    const slashItems = collectSlashItems(extensions);
    console.log("slashItems:", slashItems);

    extensions.push(
      // 配置slash menu
      SlashCommand.configure({
        items: slashItems,
      })
    );
  }
  console.log("extensions:", extensions);
  
  console.log("suggestionExtensions:", suggestionExtensions);
  // 添加必要扩展
  return [...NecessaryExtensions, ...extensions, ...suggestionExtensions];
};

const getBubbleMenuExtensions = (extensions) => {
  return extensions.filter((extension) => {
    if (extension.type === "mark") {
      return true;
    }
  });
};

const getFixedMenuExtensions = (extensions) => {
  return extensions;
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

export { getEditorExtensions, getBubbleMenuExtensions, getFixedMenuExtensions };
