import NotionLikePreset from "@/presets/notionLike";
import BasicPreset from "@/presets/basic";

const NotionLike = "NotionLike";
const Basic = "Basic";

const getPreset = (name, customConfig = {}) => {
  // 构建基础配置
  const base = name === NotionLike ? NotionLikePreset : BasicPreset;

  // 自定义配置为空时，返回基础配置
  if (!customConfig || Object.keys(customConfig).length === 0) {
    return { ...base };
  }

  let mergedExtensions = base.extensions;
  if (Array.isArray(customConfig.extensions)) {
    const customMap = new Map(customConfig.extensions.map((e) => [e?.name, e]));
    const baseNames = new Set((mergedExtensions || []).map((e) => e?.name));
    const replaced = (mergedExtensions || []).map(
      (e) => customMap.get(e?.name) ?? e
    );
    const additions = customConfig.extensions.filter(
      (e) => !baseNames.has(e?.name)
    );
    mergedExtensions = [...replaced, ...additions];
  }

  return {
    ...base,
    ...customConfig,
    extensions: mergedExtensions,
  };
};

export { NotionLike, Basic, getPreset };
