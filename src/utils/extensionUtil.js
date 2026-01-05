import BaseExtension from "@/extensions/Base/BaseExtension";
import SlashCommandExtension from "@/extensions/Slash/SlashExtension";
import { createSuggestion } from "@/extensions/Suggestion";

const NecessaryExtensions = [BaseExtension];

const resolveExtensions = (menuConfig, extensions) => {
  const finalExtensions = [];
  const suggestionExtensions = [];

  // 判断是否开启slash menu
  if (menuConfig.slashMenuEnabled) {
    const slashItems = collectSlashItems(extensions);
    // 这里需要找到 SlashCommandExtension 并配置它，
    // 但 SlashCommandExtension 可能已经在 extensions 列表中了（作为 wrapper 或 extension）
    // 为了简单起见，我们假设 extensions 包含所有需要的 wrapper。
    // 我们需要遍历 extensions 来处理它们。
  }

  extensions.forEach((item) => {
    let ext = item;
    let manifest = {};

    // 1. 处理 Wrapper 对象 ({ extension, manifest })
    if (item && typeof item === "object" && item.extension) {
      ext = item.extension;
      manifest = item.manifest || {};
    }

    // 2. 如果开启了 slash menu，配置 SlashCommandExtension
    // 注意：这里我们假设 slash-command 扩展在 extensions 列表中
    if (menuConfig.slashMenuEnabled && ext.name === "slash-command") {
       const slashItems = collectSlashItems(extensions);
       ext = ext.configure({ items: slashItems });
    }

    // 3. 处理 Suggestion 配置 (来自 manifest)
    if (manifest.suggestion) {
      suggestionExtensions.push(createSuggestion(manifest.suggestion));
    }
    
    // 4. 处理 Legacy Suggestion 配置 (__suggestions)
    // 以防万一某些扩展还没有迁移
    if (ext.__suggestions) {
      ext.__suggestions.forEach((config) => {
        suggestionExtensions.push(createSuggestion(config));
      });
    }

    finalExtensions.push(ext);
  });

  return [...NecessaryExtensions, ...finalExtensions, ...suggestionExtensions];
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
    .map((item) => {
      // Handle Wrapper
      const manifest = item.manifest || {};
      
      // If manifest has slashMenu defined
      if (manifest.slashMenu) {
        const slash = manifest.slashMenu;
        return Array.isArray(slash) ? slash : [slash];
      }
      
      // Fallback for legacy Tiptap extensions (if any) that might have options.slash
      // But based on new architecture, we should rely on manifest
      if (item.extension && item.extension.options?.slash) {
          // This path is unlikely if we moved everything to manifest, but keeping for safety
          // Wait, item.extension is the class/instance. 
          // options are usually on the instance.
      }
      
      return [];
    })
    .flat();
};

export default { resolveExtensions, filterBubbleMenuExtensions, filterFixedMenuExtensions };
