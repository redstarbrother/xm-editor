// 根据扩展列表收集slash菜单项
const collectSlashItems = (extensions) => {
  console.log("extensions length:", extensions.length);
  
  return extensions
    .map((ext) => {
      console.log("Processing extension:", ext.name);
      console.log("Extension options:", JSON.stringify(ext.options, null, 2));
      
      const slash = ext.options?.slash?.();
      console.log("Slash items for extension:", JSON.stringify(slash, null, 2));
      
      const items = Array.isArray(slash) ? slash : slash ? [slash] : [];
      console.log("Processed items:", JSON.stringify(items, null, 2));
      
      return items;
    })
    .flat();
};

export { collectSlashItems };