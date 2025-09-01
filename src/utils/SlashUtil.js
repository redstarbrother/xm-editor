// 根据扩展列表收集slash菜单项
const collectSlashItems = (extensions) => {

  return extensions
    .map((ext) => {
      const slash = ext.options?.slash?.();
      const items = Array.isArray(slash) ? slash : slash ? [slash] : [];
      return items;
    })
    .flat();
};

export { collectSlashItems };
