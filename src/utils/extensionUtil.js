import { NecessaryExtensions } from "@/components/extensions";
import SlashCommand from "@/components/extensions/commands/slash/slashCommand";
import { createSuggestion } from "@/components/menus/suggestion/suggestionFactory";

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

const filterBubbleMenuExtensions = (extensions) => {
  return extensions.filter((extension) => {
    if (extension.options?.bubble) {
      return true;
    }
  });
};

const filterFixedMenuExtensions = (extensions) => {
  return extensions.filter((extension) => {
    if (extension.options?.fixed) {
      return true;
    }
  });
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

export default { resolveExtensions, filterBubbleMenuExtensions, filterFixedMenuExtensions };
